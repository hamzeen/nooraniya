"use strict";

function PageRoute(context) {

    var fs = require('fs');
    var path = require('path');
    var marked = require('marked');

    this.res = context.res;
    this.req = context.req;
    this.isHome = false;

    this.route = function() {
        if(this.isHome) {

            this.res.statusCode = 200;
            this.res.setHeader('Content-Type', 'text/html');
            var that = this;
            fs.readFile('./index.html', function(err, data) {
                that.res.end(data);
                return;
            });
        } else {
            this.res.statusCode = 200;
            this.res.setHeader('Content-Type', 'text/html');
            var that = this;

            var parts = this.req.url.split('/');
            fs.readFile('./' + parts[1]+'.html', function(err, data) {
                if (err) {
                    that.onPageNotFound();
                    return;
                }

                that.res.end(data);
                return;
            });
        }
    }

    this.onPageNotFound = function() {
        this.res.statusCode = 200;
        this.res.setHeader('Content-Type', 'text/html');
        var that = this;

        fs.readFile('./view/404.html', function(err, data) {
            that.res.end(data);
            return;
        });
    }


    this.isValidRoute = function() {
        return this.isPageUrl();
    }

    this.isPageUrl = function() {
        var result = false;

        if(!this.req.url) {
            this.isHome = true;
            result = true;
        }

        // home page
        if (!result && (this.req.url.length === 1 && this.req.url.substr(-1) === '/')) {
            this.isHome = true;
            result = true;
        }

        if (!result && this.req.method === 'GET' && !this.isPostUrl() && !this.isResourceUrl()) {
            result = true;
        }
        return result;
    }

    this.isPostUrl = function() {
        return this.req.url.indexOf('/blog/') > -1;
    }

    this.isResourceUrl = function() {
        return this.req.url.indexOf('.') > -1;
    }
};

module.exports = PageRoute;
