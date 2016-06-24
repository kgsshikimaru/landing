export let header = () => {
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


    // navigation menu
$('.menu__container__navigation').on('click', 'a', scrollTo);
    function scrollTo() {
        let [$this, $TargetToScroll, $screen] = [$(this),null,$('html, body')];
        if ($this.attr('href') === '#monitor-tabs') {
            $TargetToScroll = $('.s2-out-wrapper').offset().top;
            $screen.animate({scrollTop: $TargetToScroll}, 900);
        }
        if ($this.attr('href') === '#3d-2d-responsive-slider') {
            $TargetToScroll = $('.s3-wrap-out').offset().top;
            $screen.animate({scrollTop: $TargetToScroll}, 2000);
        }
        if ($this.attr('href') === '#my-ability') {
            $TargetToScroll = $('.s3-wrap-out h1').offset().top;
            $screen.animate({scrollTop: $TargetToScroll}, 2200);
            setTimeout(() => {
                $('.login-wrapper__tabs-form__li-wrapper a[href="#tab-2"]').click()
            }, 2200)
        }
        if ($this.attr('href') === '#my-number') {
            $TargetToScroll = $('.s3-wrap-out h1').offset().top;
            $screen.animate({scrollTop: $TargetToScroll}, 2200);
            setTimeout(() => {
                $('.login-wrapper__tabs-form__li-wrapper a[href="#tab-3"]').click()
            }, 2200)
        }

        if ($this.attr('href') === '#ajax-button') {
            $TargetToScroll = $('.s5-wrapper').offset().top;
            $screen.animate({scrollTop: $TargetToScroll}, 2200);
        }

        return false;
    }


// show telephone
let block = false;
    $('.telephone-container__show-button a').on('click', (e) => {
        if (!block) {
            block = true;
            $(e.currentTarget).toggleClass('telephone-container__show-button_notactive telephone-container__show-button_active');
            let $container = $('.telephone-container__number-closer');
            $container.find('span').remove();
            $container.addClass('telephone-container__number-open').append('<span>8-903-xxx-xx-xx</span>');

        }
    })

};


