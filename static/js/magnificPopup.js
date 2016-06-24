export let magnificPopup = () => {
    /*==============================
     =            lightbox -> cart            =
     ==============================*/
    $('.cart-description-wrapper__elem a').magnificPopup({
        type:'ajax'
    });
    $('.s6-contain_info__elem1 a').magnificPopup({
        type:'ajax'
    });



//    $('.s6-contain_info__elem1').load('https://www.google.ru/');
    /*=====  End of lightbox -> cart  ======*/
};
