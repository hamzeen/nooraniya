var fs = require('fs');
var path = require('path');
var marked = require('marked');

function mustache(text, data) {
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

function readTextFile(relativePath, fn) {
    var fullPath = path.join(__dirname, '../') + relativePath;

    fs.readFile(fullPath, 'utf-8', function fileRead(err, text) {
        fn(err, text);
    });
}

function getAccordionMarkup(students) {

  var accordion = "<div class='accordion js-accordion'>";
  /* class="ion-search" */

  for(var k in students) {
    accordion += "<div class=\"accordion__item js-accordion-item\">";

    accordion +=
    "<div style=\"display: flex\" class=\"accordion-header js-accordion-header\">" +
      "<div class=\"stud-name\" style=\"flex: 7;\">" + students[k].name+ "</div>" +
      "<div style=\"flex: 1;\">" + students[k].stuId + "</div>" +
    "</div>";

    accordion +=
    "<div class=\"accordion-body js-accordion-body\">\n" +
      "<div class=\"accordion-body__contents\">\n" +
      "Lorem ex vero, sunt veritatis esse. Nostrum voluptatum et repudiandae vel sed, explicabo in?\n" +
      "</div>" +
    "</div>";


    accordion += "</div>";
    console.log(k, students[k]);
  }

  accordion += "</div>";
  return accordion;
}


module.exports = {
    mustacheTemplate: mustache,
    readTextFile: readTextFile,
    marked: marked,
    getAccordionMarkup: getAccordionMarkup
};
