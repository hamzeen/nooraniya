var accordion = (function(){

  var $accordion = $('.js-accordion');
  var $accordion_header = $accordion.find('.js-accordion-header');
  var $accordion_item = $('.js-accordion-item');

  // default settings
  var settings = {
    // animation speed
    speed: 400,
    // close all other accordion items if true
    oneOpen: false
  };

  return {
    // pass configurable object literal
    init: function($settings) {
      $accordion_header.on('click', function() {
        accordion.toggle($(this));
      });

      $.extend(settings, $settings);

      // ensure only one accordion is active if oneOpen is true
      if(settings.oneOpen && $('.js-accordion-item.active').length > 1) {
        $('.js-accordion-item.active:not(:first)').removeClass('active');
      }

      // reveal the active accordion bodies
      $('.js-accordion-item.active').find('> .js-accordion-body').show();
    },
    toggle: function($this) {

      if(settings.oneOpen && $this[0] != $this.closest('.js-accordion').find('> .js-accordion-item.active > .js-accordion-header')[0]) {
        $this.closest('.js-accordion')
          .find('> .js-accordion-item')
          .removeClass('active')
          .find('.js-accordion-body')
          .slideUp()
      }

      // show/hide the clicked accordion item
      $this.closest('.js-accordion-item').toggleClass('active');
      $this.next().stop().slideToggle(settings.speed);
    }
  }
})();

$(document).ready(function(){
  accordion.init({ speed: 300, oneOpen: true });

  // Open / Close Overlay
  $('#search-button').click(function() {
    $('.litebox').toggleClass("opened");
    $('body').toggleClass("noscroll");
    /* console.log($("input.search"));
    $("input.search")[0].focus();*/
  });

  $('.litebox__close-btn').click(function() {
    $('.litebox').toggleClass("opened");
    $('body').toggleClass("noscroll");
  }); // hamburger end


  const search = document.querySelector('.search');
  const results = document.querySelector('#results-wrapper');
  search.addEventListener('keyup',display);

  const pages = [];
  var ary = $("h3.blog-titles");
  ary.map((item, value) => {
    pages.push(value.innerText + '.json');
  });

  function isExist(ary, match) {
    match = match.toString().toLowerCase();
    // console.log(ary);
    const result = ary.students.filter(obj => {
      return Object.keys(obj).find(key => {
        if (typeof obj[key] === 'number' || typeof obj[key] === 'string') {
          return obj[key].toString().toLowerCase().indexOf(match) !== -1;
        }
      });
    });
    return result.length > 0;
  }

  function display() {
    const userSearch = this.value;
    let searched = [];
    results.innerHTML = '';
    let parsedRes = [];

    if (this.value.length) {
      for (let i = 0; i < pages.length; i++) {
        $.ajax(getBaseUrl() + "/data/" + pages[i], {
          success: function(data) {
            // console.log('done');

            if(isExist(JSON.parse(data), userSearch)) {
              parsedRes.push(pages[i]);
            }

            if (i === (pages.length -1) && parsedRes.length > 0) {
              results.innerHTML = render(parsedRes);
            }
          },
          error: function() {
            console.log('failed to fetch data');
          }
        });
      } // FOR eof
    } // IF eof

  }

  function getBaseUrl() {
    var pathArray = location.href.split( '/' );
    var url = pathArray[0] + '//' + pathArray[2];
    return url;
  }

  function render(results) {
    let html = '';
    for (let i = 0; i < results.length; i++) {
      if (i === 0 || (i%2) === 0) {
        html += `<div class='row'>`;
      }
      html += `<div class='column'>${results[i]}</div>`;

      if(i === (results.length -1) || (i%2) === 1) {
        if (i%2 === 0 && i === (results.length -1)) {
          html += `<div class='column empty'></div>`;
        }
        html += `</div>`;
      }
    }
    return html;
  }

});
