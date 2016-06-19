/*==============================
  =            slider            =
  ==============================*/

$(window).on('load', function() {
    $('.slider-of-responses').slick({
        accessibility: true,
        slidesToShow: 3,
        initialSlide: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 5000,
        infinite: true,
        prevArrow: $('.icon16'),
        nextArrow: $('.icon17'),
        responsive: [{
            breakpoint: 769,
            settings: {
                slidesToShow: 1,
            }
        }]
    });
});

/*====================================================
=            function for slider callback            =
====================================================*/

function finderDescription(event, slick, currentSlide, nextSlide) {
    var $target = $('.slider-of-responses .slick-active'); //выбрать активные слайды слайдера
    $target = $target.length === 3 ? $target.eq(1) : $target;
    var $attr = $target.find('img').attr('alt');
    var $bind = $('.slider-of-responses__description p.item__' + $attr); // выбрать что отображать

    $bind.removeClass('none').siblings().addClass('none');
};

/*=====  End of function for slider callback  ======*/

$('.slider-of-responses').on('afterChange', finderDescription );
$(window).on('load', finderDescription );

/*=====  End of slider  ======*/
