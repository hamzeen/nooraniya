var fs = require('fs');
var path = require('path');

var BlogRoute = function BlogRoute(context) {
  this.res = context.res;
  this.req = context.req;
  this.message = context.Parser;
  this.rawContent = '';
  this.navigationContent = '';
};

BlogRoute.prototype.isValidRoute = function isValidRoute() {
  return this.req.method === 'GET' && this.req.url.indexOf('/blog/') >= 0;
};

BlogRoute.prototype.route = function route() {
  var url = this.req.url;
  var path = 'data/' + url.slice(6) + '.json';
  this.message.readTextFile(path, this.readPostHtmlView.bind(this));
};

BlogRoute.prototype.readPostHtmlView = function readPostHtmlView(err, rawContent) {
  if (err) {
    this.res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
    var that = this;
    fs.readFile('./view/404.html', function(err, data) {
      that.res.end(data);
    });

    return;
  }

  this.rawContent = rawContent;
  this.message.readTextFile('view/blogPost.html', this.renderPost.bind(this));
};

// Step 1: read the posts in md format
const temp = function(folderPath) {
  var list = [];

  if(fs.existsSync(folderPath)) {
    var files = fs.readdirSync(folderPath), i, stat, file, output, markdown;

    for(i = 0; i < files.length; i++) {
      file = path.resolve(folderPath, files[i]);
      stat = fs.statSync(file);

      if(stat.isFile() && files[i].substr(-5) === '.json') {
        markdown = fs.readFileSync(file, 'utf8');
        list.push(files[i].substring(0, files[i].length-5));
      }
    }
  }
  return list;
};

const fileNamesToHyperlinks = function(fileNames) {
  var hyperlinks = '';
  for(var i = 0; i < fileNames.length; i++) {
    hyperlinks += "<figure class=\"blog-post\"><a href=\'/blog/" + fileNames[i] + "\'>" +
      "<h3 class=\"ion-android-contacts blog-titles\">" + fileNames[i] + "</h3></a></figure>\n";
  }
  return hyperlinks;
}

BlogRoute.prototype.renderPost = function renderPost(err, html) {
  if (err) {
    this.res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    this.res.end('Internal error.');
    return;
  }

  var jsonData = JSON.parse(this.rawContent);
  const htmlContent = "<h1>" + jsonData.name + "</h1>" +
    this.message.getAccordionMarkup(jsonData.students);

  this.navigationContent = fileNamesToHyperlinks(temp('./data/'));
  var responseContent = this.message.mustacheTemplate(html, { postContent: htmlContent });
  responseContent = this.message.mustacheTemplate(responseContent, { navigation:  this.navigationContent});

  this.res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  this.res.end(responseContent);
};

module.exports = BlogRoute;
