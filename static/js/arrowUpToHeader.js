export let arrowUpToHeader = () => {
    function toHead() {
        $('body').append('<i class="none arrowUpToHeader flaticon-pointing-up-arrow"></i>');
        let $arrow = $('.arrowUpToHeader');
        let $screen = $('html, body');
       // $arrow.addClass( "" );

        $arrow.on('click', () => {$screen.animate({scrollTop: 0}, 500);});

        $(window).on('scroll', () => {
            $(window).scrollTop() > $(window).height() ? $arrow.removeClass('none') : $arrow.addClass('none');
        })
    }
    toHead();
};
