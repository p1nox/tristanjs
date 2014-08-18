# Tristanjs

This is the place where you can put all your remote stuff.

Remote configuration files, stub data or even your [JSON resume data](https://github.com/JMPerez/linkedin-to-json-resume).

Why Tristan? [Tristan da Cunha](http://en.wikipedia.org/wiki/Tristan_da_Cunha) it is the most "remote" inhabited archipelago in the... Well you got it.

## Stack

[KOAN](http://koanjs.com) including:

* **Client**: AngularJS and Twitter Bootstrap with pure html partials (no server side rendering so it's fully static and CDN ready). Bower packages are located at `client\bower_packages`.
* **Server**: Koa for RESTful API on top of Node.js v0.11+ with the use of `--harmony` and generators.
* WebSockets along with JSON-RPC is used for real-time client-server communication and browser sync.
* Passport.js is used for social auth. Instead of auth cookies, we use JWT along with HTML5 *local storage*.
* Grunt tasks are used to facilitate development and testing.
* MongoDB for persistence. Possibly more to be added.

## Getting Started

Make sure that you have Node.js (v0.11 or above) and MongoDB (running on the default port 27017) installed on your computer. To get started with KOAN stack, do following:

```bash
git clone --depth 1 https://github.com/soygul/koan.git
cd koan
npm install
npm start
```

Your application should run on the 3000 port so in your browser just go to [http://localhost:3000](http://localhost:3000). If you want to run tests, simply type:

## Configuration

All configuration is specified in the [server/config](server/config/) folder, particularly the [config.js](server/config/config.js) file. Here you can hook up any social app keys if you want integration with Twitter, Facebook, or Google.

## Heroku Deployment

Before you start make sure you have <a href="https://toolbelt.heroku.com/">heroku toolbelt</a> installed.

```bash
git init
git add .
git commit -m "initial version"
heroku apps:create
heroku addons:add mongohq
heroku config:add NODE_ENV=production
git push heroku master
heroku open
```

## License

MIT
