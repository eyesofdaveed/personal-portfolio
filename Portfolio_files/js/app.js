"use strict";

// check if touch device
function isTouchDevice() {
  var prefixes = " -webkit- -moz- -o- -ms- ".split(" ");

  var mq = function mq(query) {
    return window.matchMedia(query).matches;
  };

  if (
    "ontouchstart" in window ||
    (window.DocumentTouch && document instanceof DocumentTouch)
  ) {
    return true;
  }

  var query = ["(", prefixes.join("touch-enabled),("), "heartz", ")"].join("");
  return mq(query);
}

if (isTouchDevice()) {
  $("body").addClass("touch-device");
} // header

(function () {
  var header = $(".js-header"),
    burger = header.find(".js-header-burger"),
    wrapper = header.find(".js-header-wrapper"),
    html = $("html"),
    body = $("body");
  burger.on("click", function () {
    burger.toggleClass("active");
    wrapper.toggleClass("visible");
    html.toggleClass("no-scroll");
    body.toggleClass("no-scroll");
  });
})();

var navArrows = [
  '\n    <span>\n        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" fill="none" viewBox="0 0 8 14">\n            <path fill-rule="evenodd" d="M7.707.293a1 1 0 0 1 0 1.414L2.414 7l5.293 5.293a1 1 0 0 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 0 1 1.414 0z" fill="#9f9fa9"/>\n        </svg>\n    </span>',
  '<span>\n        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" fill="none" viewBox="0 0 8 14">\n            <path fill-rule="evenodd" d="M.293 13.707a1 1 0 0 1 0-1.414L5.586 7 .293 1.707A1 1 0 1 1 1.707.293l6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414 0z" fill="#9f9fa9"/>\n        </svg>\n    </span>\n',
]; // owl carousel

$(document).ready(function() {
 
  var form = $('#contact_form'),
      email = $('#user_email'),
      name = $('#name'),
      message = $('#user_text'),
      submit = $("#submit");
  
  form.on('input', '#email, #name, #message', function() {
    $(this).css('border-color', '');
    info.html('').slideUp();
  });
  
  submit.on('click', function(e) {
    info.html('Loading...').css('color', 'red').slideDown();
    e.preventDefault();
    if(validate()) {
      $.ajax({
        type: "POST",
        url: "mailer.php",
        data: form.serialize(),
        dataType: "json"
      }).done(function(data) {
        if(data.success) {
          email.val('');
          name.val('');
          message.val('');
          info.html('Message sent!').css('color', 'green').slideDown();
        } else {
          info.html('Could not send mail! Sorry!').css('color', 'red').slideDown();
        }
      });
    }
  });
  
  function validate() {
    var valid = true;
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    
    if(!regex.test(email.val())) {
      email.css('border-color', 'red');
      valid = false;
    }
    if($.trim(subject.val()) === "") {
      subject.css('border-color', 'red');
      valid = false;
    }
    if($.trim(message.val()) === "") {
      message.css('border-color', 'red');
      valid = false;
    }
    
    return valid;
  }
 
});

window.addEventListener('load', AOS.refresh);

AOS.init({
  startEvent: 'load'
}); // parallax effect

(function () {
  var parallax = $(".js-parallax");

  if (parallax.length) {
    parallax.each(function () {
      var _this = $(this),
        scale = _this.data("scale"),
        orientation = _this.data("orientation");

      new simpleParallax(_this[0], {
        scale: scale,
        orientation: orientation,
        delay: 0.5,
        overflow: true,
        transition: "cubic-bezier(0,0,0,1)",
      });
    });
  }
})(); // scroll to section

(function () {
  var btn = $(".js-scroll");
  btn.click(function () {
    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top + "px",
      },
      {
        duration: 1000,
      }
    );
    return false;
  });
})();

(function () {
  var btn = $(".js-scroll-top");
  btn.click(function () {
    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top + "px",
      },
      {
        duration: 3000,
      }
    );
    return false;
  });
})();
