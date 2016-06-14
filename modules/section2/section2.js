/*========================================
=            tabs - jQuery UI            =
========================================*/

$( "#tabs" ).tabs();

/*=====  End of tabs - jQuery UI  ======*/

/*===================================================
=            tabs img in monitor display            =
===================================================*/

$(document).ready(function() {
    $('.s2-li-wrapper a').click(function() {
        var clickId = $(this).attr('href').replace('#','.img-');
        $(clickId).removeClass('none').siblings().addClass('none');
    });
});

/*=====  End of tabs img in monitor display  ======*/


