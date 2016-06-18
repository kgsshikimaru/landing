/*=====================================================
=            fixed dropable and select img            =
=====================================================*/
$.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false)
                 .on('mousedown', false);
    };

$(".maintain").disableSelection();


/*=====  End of fixed dropable and select img  ======*/



