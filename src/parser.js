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

      "      <div class=\"flex-container\">\n" +
      "      <div class=\"flex-item\">\n" +
      "        <div>\n" +
      "          <h5 class=\"ion-android-phone-portrait\">&nbsp;Phone</h5>\n" +
      "          <p>"+ students[k].phone +"</p>\n" +
      "        </div>\n" +
      "        <div class=\"margin-top20\">\n" +
      "          <h5 class=\"ion-chatbubbles\">Email</h5>\n" +
      "          <p>" + students[k].email +"</p>\n" +
      "        </div>\n" +
      "      </div>\n" +
      "\n" +
      "      <div class=\"flex-item gravity\">\n" +
      "        <div>\n" +
      "          <h5 class=\"ion-university\">Graduate</h5>\n" +
      "          <p>"+ students[k].graduate+"</p>\n" +
      "        </div>\n" +
      "        <div class=\"margin-top20\">\n" +
      "          <h5 class=\"ion-paintbucket\">Donation (per month)</h5>\n" +
      "          <h2>"+ students[k].donation +"</h2>\n" +
      "        </div>\n" +
      "      </div>\n" +
      "\n" +
      "      <div class=\"flex-item\">\n" +
      "        <div>\n" +
      "          <h5 class=\"ion-android-mail\">Address</h5>\n" +
      "          <p>"+ students[k].address +"</p>\n" +
      "        </div>\n" +
      "        <div class=\"margin-top20\">\n" +
      "          <h5 class=\"ion-pricetags\">Gender</h5>\n" +
      "          <p>"+ students[k].gender +"</p>\n" +
      "        </div>\n" +
      "      </div>\n" +
      "    </div>"+
      "</div>" +
    "</div>";




    accordion += "</div>";
    console.log(k, students[k]);
  }

  accordion += "</div>";
  return accordion;
}

function getTitleMarkup(title) {
  return "<div class=\"content-sections\">" + "\n"
    + "<h1 class='post-title'>" + title + "</h1>";
}


module.exports = {
    mustacheTemplate: mustache,
    readTextFile: readTextFile,
    marked: marked,
    getAccordionMarkup: getAccordionMarkup,
    getTitleMarkup: getTitleMarkup
};
