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
}


//Пример функции в элементам jQuery выборки - $('.nav')
/*

$(window).on('load resize', function () {
setTimeout(function() {
 $('.JQuerySynchro2').css('height', '').synchroHeight();
    }, 100);
})


// Без задержки обрезает высоту не полностью загрузившихся картинок.
*/


//////////////////////////////////////////////////////////////////////////////////////////
function tabsGenerator(/*[anchor, tabs, tabsPrefixByClass]*/) {
    for (let i = 0; i < arguments.length; i++) {
        $(arguments[i][0]).on('click', (e) => {
            $(arguments[i][0]).parent().removeClass('active');
            $(e.currentTarget).parent().addClass('active');
            if (arguments.length === 1) return;
            $(arguments[i][1] + ' ' +
                $(e.currentTarget).attr('href').replace('#', arguments[i][2]))
                .removeClass('none').siblings().addClass('none');
        });
    }
}
/*=============================================
=            Section comment block            =
=============================================
*
    for work need JQuery
*
 #example: tabsGenerator([anchor, tabs, tabsPrefixByClass])
    anchor - tag <a> (bookmark list);
    tabs - show content;
    tabsPrefixByClass - creation originality css class
        view: tabsPrefixByClass(part1) + a[href=#(part2)];
*
 #example: ul>li>a[href=#login-tabs-1]  & tabsPrefixByClass = '.form-'
    need set class for linked tabs === class="form-login-tabs-1"
*
 #example: tabsGenerator (
               ['.header-li-wrapper a', '.header-wrapper', '.header-tabs'],  // tabs N1
               ['.s1-li-wrapper a', '.section1-wrapper', '.section1-tabs'],  // tabs N2
               ... etc
            )
*
 need in css:    .none {display:none};
*
 .active {*for your custom stylesheets on active first-parent anchor
    #example: ul>li>a   - stylesheets for li
 }
*
 class="none" - need set to all first-parent anchor aside from default opened
*
=====  End of Section comment block  ======*/
