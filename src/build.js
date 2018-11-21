"use strict";


function Build() {

    var fs = require('fs');
    var path = require('path');
    var marked = require('marked');
    const Parser = require('./parser');

    // get posts path & num of posts to show from config
    var maxPosts = 2;
    var postPath = './blog/';
    this.rawContent = '';
    this.htmlContent = '';
    this.navigationContent = '';

    this.initialize = function() {
        // 1. read the posts from data folder
        var jsonFiles = this.getMarkdownFiles('./data/');

        for(var i = 0; i < jsonFiles.length; i++) {
          var jsonData = JSON.parse(jsonFiles[i].markdown);
          this.htmlContent += "<div class=\"content-sections\">" +
              "<h1>" + jsonData.name + "</h1>" +
              Parser.getAccordionMarkup(jsonData.students) + "</div>";

          this.navigationContent += "<figure class=\"blog-post\"><a href=\'blog/" +
            jsonFiles[i].fName + "\'>" + "<h3 class=\"ion-android-contacts blog-titles\">" + jsonFiles[i].fName +
            "</h3></a></figure>\n"
        }
        this.readTextFile('view/blogHome.html', this.renderHome.bind(this));

        // 2. transform each of them to markup
        // 3. augment this on index.html
        // 4. write a new index.html to the file system
    };

    // Step 1: read the posts in md format
    this.getMarkdownFiles = function(folderPath) {
        var list = [];

        if(fs.existsSync(folderPath)) {
            var files = fs.readdirSync(folderPath), i, stat, file, output, markdown;

            for(i = 0; i < files.length; i++) {
                file = path.resolve(folderPath, files[i]);
                stat = fs.statSync(file);

                if(stat.isFile() && files[i].substr(-5) === '.json') {
                    markdown = fs.readFileSync(file, 'utf8');
                    list.push({
                      markdown: markdown,
                      fName: files[i].substring(0, files[i].length-5)
                    });
                }
            }
        }
        return list;
    };


    // Step4: augment the md content and request to gen index.html
    this.renderHome = function renderPost(html) {
        var responseContent = this.mustache(html, { postContent: this.htmlContent });
        responseContent = this.mustache(responseContent, { navigation: this.navigationContent });
        this.writeToFile(responseContent);
    };

    // For Step 3
    this.mustache = function(text, data) {
        var result = text;
        for (var prop in data) {
            if (data.hasOwnProperty(prop)) {
                console.log(data);
                var regExp = new RegExp('{{' + prop + '}}', 'g');
                result = result.replace(regExp, data[prop]);
            }
        }
        return result;
    }

    // Reads a single File
    this.readTextFile = function(relativePath, fn) {
        var fullPath = path.join(__dirname, '../') + relativePath;
        fs.readFile(fullPath, 'utf-8', function fileRead(err, text) {
            fn(text);
        });
    }

    // Step 5: write a new index.html to the file system
    this.writeToFile = function(content) {
        var pathFolder = './';

        // create folder if not!
        if(!fs.existsSync(pathFolder)) {
            fs.mkdirSync(pathFolder);
        }

        var filePath = pathFolder + '/index.html';

        fs.exists(filePath, function(exists) {
            if(exists) {
                fs.unlinkSync(filePath);
            }
            fs.writeFile(filePath, content, 'utf-8');
        });
    };
};

module.exports = Build;

new Build().initialize();
