/*===================================
=            mobile activate menu            =
===================================*/

$('.menu__container__activate-menu').on('click', function() {
    $('.menu__container__navigation').slideToggle('normal');
});

/*=====  End of mobile activate menu  ======*/

/*=================================================================
=      fix collapsed menu after <767px => open menu => close close
=>     resize to large window
=================================================================*/

$(window).on('resize', function() {
    if (window.innerWidth > 767) $('.menu__container__navigation').show();
    if (window.innerWidth <= 767) $('.menu__container__navigation').hide();
});

/*=====  fix collapsed menu after <767px => open menu => close close
=>     resize to large window
==========================================================================*/



