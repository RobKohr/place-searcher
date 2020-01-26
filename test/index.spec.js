const expect = require('chai').expect;
const request = require('request');
const config = require('../config');
const server = require('../index');
const baseUrl = `http://localhost:${config.port}`;

//setup test data
const customer = { ...config.customers[2] }; //create a shallow copy
delete customer.apiKey; // results should not have the api key in them
const long = 35.994034; // Durham, NC
const lat = -78.898621;
const locationsResult = {
  locations: [
    {
      name: 'BB&T',
      address: '505 South Duke Street, Durham'
    },
    {
      name: 'Cardtronics',
      address: '401 East Lakewood Avenue, Durham'
    },
    {
      name: 'ATM',
      address: '1007 West Main Street, Durham'
    },
    {
      name: 'The Bar',
      address: '711 Rigsbee Avenue, Durham'
    },
    {
      name: 'Square 1 Bank',
      address: '406 Blackwell Street #240, Durham'
    }
  ]
};

describe('test location search', function() {
  after(function() {
    server.close(); // runs after all tests in this block
  });
  it('responds to /', function testSlash(done) {
    request(`${baseUrl}`, function(err, res, body) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('tries to get a missing customer', function testBadCustomerParams(done) {
    request(`${baseUrl}/customer?customerName=bla`, function(err, res, body) {
      expect(body).to.equal('{"error":"Customer bla not found"}');
      done();
    });
  });

  it('gets a customer successfully', function testGoodCustomerParams(done) {
    const url = `${baseUrl}/customer?customerName=${customer.name}`;
    request(url, function(err, res, body) {
      expect(body).to.equal(JSON.stringify({ customer }));
      done();
    });
  });
  it('gets a list of locations from a customer name and long/lat', function getCustomerLocations(done) {
    request(`${baseUrl}/location-search?customerName=bla&long=${long}&lat=${lat}`, function(err, res, body) {
      expect(body).to.equal('{"error":"Customer bla not found"}');
      done();
    });
  });
  it('gets a list of locations from a customer name and long/lat', function getCustomerLocations(done) {
    request(`${baseUrl}/location-search?customerName=${customer.name}&long=${long}&lat=${lat}`, function(
      err,
      res,
      body
    ) {
      expect(body).to.equal(JSON.stringify(locationsResult));
      done();
    });
  });
});
