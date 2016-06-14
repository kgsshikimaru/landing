;
'use strict';


/*=================================================================
=            fix bootstrap collapsed on resized window            =
=================================================================*/

$(window).on('resize', function() {
    if (window.innerWidth > 767) $('#navbar').collapse('show');
    if (window.innerWidth <= 767) $('#navbar').collapse('hide');
});

/*=====  End of fix bootstrap collapsed on resized window  ======*/

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
