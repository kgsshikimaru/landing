;'use strict';

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
                                                            ======*/

/*=========================================================================
=            add class to highlight active and remove siblings            =
=========================================================================*/

$(document).ready(function() {
    $('ul a').click(function() {
        var clickId = $(this).attr('href');
        $(clickId).parent().addClass('active').siblings().removeClass('active');
    });
});

$(document).ready(function() {
    $('ul a').click(function() {
        $('ul a').parent().removeClass('active');
        $(this).parent().addClass('active')
    })
});

/*=====  End of add class to highlight active and remove siblings  ======*/
