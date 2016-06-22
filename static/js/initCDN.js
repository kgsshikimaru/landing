import {jsCssLoader} from 'static/js/jsCssLoader';
import {tabsInit} from 'static/js/tabsInit';


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
             '/reservation/slick.min.css']],
    ['css', ['//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css',
             '/reservation/slick-theme.min.css']],
    ['css', ['//fonts.googleapis.com/css?family=Roboto:400,500,700',
             '/reservation/roboto.css']],
    ['css', ['//fonts.googleapis.com/css?family=Love+Ya+Like+A+Sister',
             '/reservation/love.css']],
    ['js', ['//code.jquery.com/jquery-3.0.0.min.js',
            '/reservation/jquery-3.0.0.min.js']],
    ['js', ['//cdnjs.cloudflare.com/ajax/libs/picturefill/3.0.2/picturefill.min.js',
            '/reservation/picturefill.min.js']]
    )
    .then( () => {
        tabsInit();
        header();
        section1();
        jsCssLoader(
            ['js', ['//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.js',
                '/reservation/slick.min.js']]
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




