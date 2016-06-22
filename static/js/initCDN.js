import {jsCssLoader} from 'static/js/jsCssLoader';
import wj42 from 'static/js/libraries/will-just-42';
import {tabsInit} from 'static/js/libraries/tabsInit';


import {header} from 'components/header/header';
import {section1} from 'components/section1/section1';
// empty -  import section2 from 'components/section2/section2';
import {section3} from 'components/section3/section3';
// empty -  import section4 from 'components/section4/section4';
import {section5} from 'components/section5/section5';
// empty -  import section6 from 'components/section6/section6';

import svg4everybody from 'static/js/separate-js/svg4everybody.min';



jsCssLoader(
    ['css', ['/static/css/main.min.css', '/static/css/main.css']],
    ['css', ['//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css',
             '/static/reservation/slick.min.css']],
    ['css', ['//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css',
             '/static/reservation/slick-theme.min.css']],
    ['css', ['//fonts.googleapis.com/css?family=Roboto:400,500,700',
             '/static/reservation/roboto.css']],
    ['css', ['//fonts.googleapis.com/css?family=Love+Ya+Like+A+Sister',
             '/static/reservation/love.css']],
    ['js', ['//code.jquery.com/jquery-3.0.0.min.js',
            '/static/reservation/jquery-3.0.0.min.js']],
    ['js', ['//cdnjs.cloudflare.com/ajax/libs/picturefill/3.0.2/picturefill.min.js',
            '/static/reservation/picturefill.min.js']]
    )
    .then( () => {
        wj42.tabsGenerator (
            ['.menu__container__navigation a'],  // header menu - only highlight classActive (header)
            ['.s2-li-wrapper a', '.monitor-display-img', '.img-'],  // img in monitor (section 2)
            ['.s2-li-wrapper a', '.tabs-container', '.text-'],  // text right than monitor (section 2)
            ['.login-wrapper__tabs-form__li-wrapper a', '.login-tabs-container', '.login-']  // form tabs (section 4)
        );
        header();
        section1();
        jsCssLoader(
            ['js', ['//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.js',
                '/static/reservation/slick.min.js']]
        )
        .then(() => {
            section3();
            section5();
            svg4everybody();
        });
    })
    .catch( (data) => {
        console.log(data);
        section3();
        section5();
    });




