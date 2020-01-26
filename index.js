const config = require('./config');
const express = require('express');
const qs = require('qs');
const app = express();
const rp = require('request-promise');

app.get('/', function(req, res) {
  res.json({
    message: 'These are not the droids you are looking for.'
  });
});

function getCustomer({ customerName, deleteApiKey = true }) {
  return new Promise((resolve, reject) => {
    let foundCustomer = null;
    config.customers.forEach(customer => {
      if (customer.name === customerName) {
        foundCustomer = { ...customer };
        if (deleteApiKey) {
          // removed by default for security
          delete foundCustomer.apiKey;
        }
      }
    });

    if (foundCustomer) {
      return resolve(foundCustomer);
    }
    return reject({ error: `Customer ${customerName} not found` });
  });
}
function handleError(res, err) {
  res.status(404);
  return res.json(err);
}

app.get('/customer', function(req, res) {
  getCustomer({ ...req.query })
    .then(customer => {
      return res.json({ customer });
    })
    .catch(err => {
      handleError(res, err);
    });
});

function getLocations({ customer, long, lat }) {
  return new Promise((resolve, reject) => {
    customer.type = 'atm';

    let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?language=${
      config.languages[customer.language]
    }&location=${long},${lat}&radius=1500&key=${customer.apiKey}`;
    if (customer.type !== 'all') {
      url += `&type=${customer.type}`;
    }
    return rp(url)
      .then(result => {
        const locations = JSON.parse(result)
          .results.slice(0, customer.resultLimit)
          .map(location => {
            return { name: location.name, address: location.vicinity };
          });
        resolve(locations);
        resolve(JSON.parse(result));
      })
      .catch(err => {
        reject(err);
      });
  });
}

app.get('/location-search', function(req, res) {
  getCustomer({ customerName: req.query.customerName, deleteApiKey: false }) //we will be using the api key, but not returning it
    .then(customer => {
      return getLocations({ customer, ...req.query });
    })
    .then(locations => {
      return res.json({ locations });
    })
    .catch(err => handleError(res, err));
});

var server = app.listen(config.port, function() {
  var port = server.address().port;
  console.log('App listening at port %s', port);
});
module.exports = server;
