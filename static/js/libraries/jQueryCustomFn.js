$.fn.synchroHeight = function() {
//запишем значение jQuery выборки к которой будет применена
// эта функция в локальную переменную $blocks
    var $blocks = $(this),
//примем за максимальную высоту - высоту первого блока
// в выборке и запишем ее в переменную maxH
        maxH = $blocks.eq(0).outerHeight(true);
//делаем сравнение высоты каждого блока с максимальной
    $blocks.each(function() {
        maxH = ($(this).outerHeight(true) > maxH) ? $(this).outerHeight(true) : maxH;
    });
//устанавливаем найденное максимальное значение высоты для
// каждого блока jQuery выборки
    $blocks.outerHeight(maxH);
};


//Пример функции в элементам jQuery выборки - $('.nav')
/*

 $(window).on('load resize', function () {
 setTimeout(function() {
 $('.JQuerySynchro2').css('height', '').synchroHeight();
 }, 100);
 })


 // Без задержки обрезает высоту не полностью загрузившихся картинок.
 */

module.exports = $;
