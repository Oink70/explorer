"use strict";
var request = require('request');

// so far, only latest price is used for display purposes
// see https://www.coingecko.com/api/documentations/v3
var base_url = 'https://api.coingecko.com/api/v3/simple/price';

function get_summary(coin, exchange, cb) {
  var req_url = base_url + '?ids='+coin+'&vs_currencies='+exchange;
  var summary = {};
  request({uri: req_url, json: true}, function (error, response, body) {
    if (error) {
      return cb(error, null);
    } else {
      if (!body[coin][exchange]) {
        return cb(error, null);
      } else {
        summary['last'] = parseFloat(body[coin][exchange]);
        return cb (null, summary);
      }
    }
  });
}

function get_trades(coin, exchange, cb) {
  return cb('', null);
}

function get_orders(coin, exchange, cb) {
  return cb('', null);
}

module.exports = {
  get_data: function(settings, cb) {
    var error = null;
    get_orders(settings.coin, settings.exchange, function(err, buys, sells) {
     if (err) { error = err; }
      get_trades(settings.coin, settings.exchange, function(err, trades) {
        if (err) { error = err; }
        get_summary(settings.coingecko_coin, settings.coingecko_exchange,  function(err, stats) {
          if (err) { error = err; }
          return cb(error, {buys: buys, sells: sells, chartdata: [], trades: trades, stats: stats});
        });
      });
    });
  }


};

