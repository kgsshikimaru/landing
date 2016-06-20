


import {tabsInit} from 'static/js/libraries/tabsInit';


import {header} from 'components/header/header';
import {section1} from 'components/section1/section1';
// empty -  import section2 from 'components/section2/section2';
import {section3} from 'components/section3/section3';
// empty -  import section4 from 'components/section4/section4';
import {section5} from 'components/section5/section5';
// empty -  import section6 from 'components/section6/section6';

import svg4everybody from 'static/js/separate-js/svg4everybody.min';


function CSSLoad(...file){
    for (let i = 0; i < file.length; i++) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", file[i]);
        document.getElementsByTagName("body")[0].appendChild(link)
    }
}
CSSLoad(
    'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css',
    'https://fonts.googleapis.com/css?family=Roboto:400,500,700',
    'https://fonts.googleapis.com/css?family=Love+Ya+Like+A+Sister'
); //пример использования


/*


$.when(
    $.getScript( "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.js" ),
    $.getScript( "https://cdnjs.cloudflare.com/ajax/libs/picturefill/3.0.2/picturefill.min.js" ),
    $.Deferred(function( deferred ){
        $( deferred.resolve );
    })
).done(function(){
    setTimeout(section3,200);
    //place your code here, the scripts are all loaded

});

*/



function addScript(src) {
    var script = document.createElement('script');
    script.src = src;
    document.getElementsByTagName('body')[0].appendChild(script);
    return script;
}

function addScripts(scripts, callback) {
    var loaded = {}; // Для загруженных файлов loaded[i] = true
    var counter = 0;

    function onload(i) {
        if (loaded[i]) return; // лишний вызов onload/onreadystatechange
        loaded[i] = true;
        counter++;
        if (counter == scripts.length) callback();
    }

    for (var i = 0; i < scripts.length; i++)(function(i) {
        var script = addScript(scripts[i]);

        script.onload = function() {
            onload(i);
        };

        script.onreadystatechange = function() { // IE8-
            if (this.readyState == 'loaded' || this.readyState == 'complete') {
                setTimeout(this.onload, 0); // возможны повторные вызовы onload
            }
        };

    }(i));

}

addScripts(
    [
        "https://code.jquery.com/jquery-3.0.0.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/picturefill/3.0.2/picturefill.min.js",
    ],
    () => {
        tabsInit();
        header();
        section1();
        addScripts(
            [
                "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.js"
            ], () => {
                section3();
                section5();
            });
        svg4everybody()
});




