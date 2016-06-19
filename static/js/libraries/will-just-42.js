//////////////////////////////////////////////////////////////////////////////////////////
export var wj42 = {
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
    tabsGenerator(/*[anchor, tabs, tabsPrefixByClass]*/) {
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
    },

    isVisible(elem) {

        var coords = elem.getBoundingClientRect();

        var windowHeight = document.documentElement.clientHeight;

        var extendedTop = -0.5 * windowHeight;
        var extendedBottom = 1.5 * windowHeight;

        // top visible || bottom visible
        var topVisible = coords.top > extendedTop && coords.top < extendedBottom;
        var bottomVisible = coords.bottom < extendedBottom && coords.bottom > extendedTop;

        return topVisible || bottomVisible;
    }

};


//module.exports = wj42;
