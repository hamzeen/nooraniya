const http = require('http');
const fs   = require('fs');
const Parser = require('./src/parser');
const BlogRoute = require('./src/blogRoute');
const PageRoute = require('./src/pageRoute');

var port = process.env.PORT || 3000;

var app = http.createServer(function requestListener(req, res) {

  var resolved = false;
  var path = './'+ req.url;

  // render pages
  if(!resolved) {
      var pageRoute = new PageRoute({ req: req, res: res });
      if (pageRoute.isValidRoute()) {

          resolved = true;
          pageRoute.route();
          return;
      }
  }

  // render a blog post
  if (!resolved) {
      var blogRoute = new BlogRoute({ Parser: Parser, req: req, res: res });
      if (blogRoute.isValidRoute()) {
          resolved = true;

          blogRoute.route();
          return;
      }
  }

  // fetches a resource file, if not 404
  if (!resolved) {
      res.statusCode = 200;
      fs.readFile(path, function(err, data) {
          if (err) {
              onPageNotFound(res);
              return;
          }
          res.end(data);
      });
  }

});

function onPageNotFound(res) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
    fs.readFile('./view/404.html', function(err, data) {
        res.end(data);
    });
}

app.listen(port, function() {
    console.log('Listening on port:' + port);
});
