
import {tabsInit} from 'static/js/libraries/tabsInit';


import {header} from 'components/header/header';
import {section1} from 'components/section1/section1';
// empty -  import section2 from 'components/section2/section2';
import {section3} from 'components/section3/section3';
// empty -  import section4 from 'components/section4/section4';
import {section5} from 'components/section5/section5';
// empty -  import section6 from 'components/section6/section6';

import svg4everybody from 'static/js/separate-js/svg4everybody.min';



function getXHR() {
    var xmlHttp;
    try {
        xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP")
        } catch (E) {
            xmlHttp = false;
        }
    }

    if (!xmlHttp && typeof XMLHttpRequest != 'undefined') {
        xmlHttp = new XMLHttpRequest();
    }

    return xmlHttp;
}

function process(url, callback) {  // адрес - куда стучимся
    var xmlHttp = getXHR();


    xmlHttp.open('GET', url, true);
    xmlHttp.onreadystatechange = function() {
        if(xmlHttp.readyState == 4) {
            if( !(xmlHttp.status === 200 || xmlHttp.status === 304) ) {
                callback()
            }
        }
    };
    xmlHttp.send(null);
}





function loadCss(...file){
    for (let i = 0; i < file.length; i++) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", file[i]);
        document.getElementsByTagName("body")[0].appendChild(link)
    }
}

function loadJs(...scripts) {
    return new Promise( (resolve, reject) => {
        function addScript(src) {
            let script = document.createElement('script');
            script.async = true;
            script.src = src;
            document.getElementsByTagName('body')[0].appendChild(script);


            process(src, () => console.log('callback'));

            return script;
        }
        let counter = 0;

        function onload(i) {
            counter++;
            if (counter == scripts.length) resolve();
        }

        for (let i = 0; i < scripts.length; i++) {
            let script = addScript(scripts[i]);

            script.onload = function() {
                onload(i);
            }
        }
    })
}




loadCss(
    '/static/css/main.min.css',
    '//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css',
    '//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css',
    '//fonts.googleapis.com/css?family=Roboto:400,500,700',
    '//fonts.googleapis.com/css?family=Love+Ya+Like+A+Sister'
);
loadJs("//code.jquery.com/jquery-3.0.0.min.js",
        "//cdnjs.cloudflare.com/ajax/libs/picturefill/3.0.2/picturefill.min.js")
    .then( () => {
        tabsInit();
        header();
        section1();
        loadJs("//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.js")
    })
    .then( () => {
        section3();
        section5();
        svg4everybody();
        console.log('finish');
    })
    .catch( reason =>  {
        console.error('error' + reason)
    });
