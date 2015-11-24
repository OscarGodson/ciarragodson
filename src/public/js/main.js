//$(".slides").slidesjs({
//  width: 961,
//  height: 641,
//  pagination: {
//    active: false
//  },
//  navigation: {
//    active: false,
//  },
//  play: {
//    active: false,
//    auto: true,
//    interval: 3000,
//    effect: 'fade'
//  },
//  effect: {
//    fade: {
//      speed: 1000
//    }
//  }
//});

/**
 * If the device supports touch, use touchend otherwise return a click event
 */
var getClickEventName = function () {
  return 'ontouchend' in document.documentElement ? 'touchend' : 'click';
};


/**
 * This jumbled mess of jQuery makes it so when you tap on the gallery nav item
 * that shows up on mobile it shows the gallery nav items. When you go to the
 * gallery nav it adds a "< back" link. Clicking that will bring back the
 * original nav.
 */
(function () {
  var mobileNavHtmlCache = $('.mobile-nav .nav').html();
  var $mobileNav = $('.mobile-nav .nav');
  $('.mobile-nav').on(getClickEventName(), '.galleries-button', function () {
    $('.mobile-nav .nav').html('<li class="nav-item">\
        <a href="#" class="nav-item-back nav-item-link">&lt; Back</a>\
      </li>' + $('.nav-galleries').html());
    return false;
  }).on(getClickEventName(), '.nav-item-back', function () {
    $mobileNav.html(mobileNavHtmlCache);
  });
})();

(function () {
  var $grid = $('.photo-grid').masonry({
    // options
    itemSelector: '.photo-grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
    gutter: 10
  });

  // layout Masonry after each image loads
  $grid.imagesLoaded().progress( function() {
    $grid.masonry('layout');
  });
})();

(function () {
  lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true
  });
})();
