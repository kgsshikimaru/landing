export var tabsInit = () => {
function tabsGenerator(/*[anchor, tabs, tabsPrefixByClass]*/) {
    for (let i = 0; i < arguments.length; i++) {
        $(arguments[i][0]).on('click', (e) => {
            $(arguments[i][0]).parent().removeClass('active');
            $(e.currentTarget).parent().addClass('active');
            if (arguments.length === 1) return;
            $(arguments[i][1] + ' ' +
                $(e.currentTarget).attr('href').replace('#', arguments[i][2]))
                .removeClass('none').siblings().addClass('none');
        })
    }
    
}
tabsGenerator (
    ['.menu__container__navigation a'],  // header menu - only highlight classActive (header)
    ['.s2-li-wrapper a', '.monitor-display-img', '.img-'],  // img in monitor (section 2)
    ['.s2-li-wrapper a', '.tabs-container', '.text-'],  // text right than monitor (section 2)
    ['.login-wrapper__tabs-form__li-wrapper a', '.login-tabs-container', '.login-']  // form tabs (section 4)
);
};
