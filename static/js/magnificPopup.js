export let magnificPopup = () => {
    /*==============================
     =            lightbox -> cart            =
     ==============================*/
    $('.cart-description-wrapper__elem a').magnificPopup({
        type:'ajax'
    });




    $('.s6-contain_info__elem3').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
            verticalFit: true
        },
        gallery: {
            enabled: true
        },
        zoom: {
            duration: 300, // don't foget to change the duration also in CSS
            opener: function (element) {
                return element.find('img');
            }
        }
    });
    /*=====  End of lightbox -> cart  ======*/
};
