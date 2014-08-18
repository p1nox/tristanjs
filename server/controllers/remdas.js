'use strict';

/**
 * Posts controller for serving user posts.
 */

var route = require('koa-route'),
    parse = require('co-body'),
    mongo = require('../config/mongo'),
    ws = require('../config/ws'),
    ObjectID = mongo.ObjectID;

// register koa routes
exports.init = function (app) {
  app.use(route.get('/api/remDas', listRemDas));
  app.use(route.post('/api/remDas', createRemDas));
};

/**
 * Lists last 15 posts with latest 15 comments in them.
 */
function *listRemDas() {
  var remDas = yield mongo.remDas.find(
      {},
      {},
      {sort: {_id: -1}} /* sorted by last updated */).toArray();

  remDas.forEach(function (remDa) {
    remDa.id = remDa._id;
    delete remDa._id;
  });

  this.body = remDas;
}

function *createRemDas() {
  var remDa = yield parse(this);
  remDa.url = remDa.url + '.json';
  remDa.from = this.user;
  remDa.userId = this.user.id
  remDa.endpoint = '/api/endpoints/' + this.user.id + remDa.url;
  remDa.createdTime = new Date();

  var results = yield mongo.remDas.insert(remDa);

  this.status = 201;
  this.body = results[0]._id.toString(); // we need .toString() here to return text/plain response

  // now notify everyone about this new remDa
  remDa.id = remDa._id;
  delete remDa._id;
  ws.notify('remDas.created', remDa);
}
