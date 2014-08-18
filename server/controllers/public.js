'use strict';

/**
 * Publicly accessible API endpoints. This is useful for special cases like user profile images, etc.
 */

var route = require('koa-route'),
    parse = require('co-body'),
    config = require('../config/config'),
    mongo = require('../config/mongo');

// register koa routes
exports.init = function (app) {
  app.use(route.get('/api/users/:id/picture', getPicture));
  app.use(route.get('/api/endpoints/:user_id/*.json', getRemDa));
};

/**
 * Serves user profile picture in jpeg format.
 * @param id - User ID.
 */
function *getPicture(id) {
  id = parseInt(id, 10);
  var user = yield mongo.users.findOne({_id: id}, {picture: 1});
  if (user) {
    var img = new Buffer(user.picture, 'base64');
    this.set('Content-Type', 'image/jpeg');
    if (config.app.cacheTime) {
      this.set('Cache-Control', 'max-age=' + (config.app.cacheTime / 1000));
    }
    this.body = img;
  }
}

function *getRemDa(user_id) {
  var userId = parseInt(user_id, 10),
  url = this.request.url;

  var posFirstCharEndpoint = url.indexOf('/', 15); // 15 == indexOf(userId)
  var userUrl = url.substring(posFirstCharEndpoint, url.length);

  var remDa = yield mongo.remDas.findOne({userId: userId, url: userUrl});

  if (remDa) {
    this.body = remDa;
  }
}
