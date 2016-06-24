export let section6 = () => {
    let block = false;
    let $button = $('.s6-contain_info__elem1 button');
    let $iframe;
    let [$bodyH, $height,$width] = [$('html, body'), $(window).height(), $(window).width()];
    $button.on('click', () => {
        if (!block) {
            $('.s6-contain_info__elem1 button').addClass('deactive');
            block = true;
            $('.s6-iframe-wrapper').append(`<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61119337.922215454!2d-23.76857255542306!3d20.773952021358912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x413543cb0078d95d%3A0xcc11644241877c48!2z0KfQtdGF0L7Qsiwg0JzQvtGB0LrQvtCy0YHQutCw0Y8g0L7QsdC7Lg!5e0!3m2!1sru!2sru!4v1466779378276" width="1920" height="${$height / 2}" frameborder="0" style="border:0" allowfullscreen></iframe>`);

            $bodyH.scrollTop($(document).height());
            $iframe = $('.s6-contain iframe')
        }
    });


};
