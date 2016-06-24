// jsCssLoader([url,alternativeUrl, ...],[url,alternativeUrl, ...], ...).then()
export function jsCssLoader(...arr)  {
     return new Promise( (resolve, reject) => {
         let counterOnLoad = 0;

         function ifNeedCallback() {
             if (counterOnLoad === arr.length) {
                 resolve()
             }
         }

        function addScript(url) {
            let i = 0;
                function connectUrl(url) {
                    let script = document.createElement('script');
                    script.async = true;
                    script.src = url[i];
                    script.onerror = function() {
                        console.warn('CSS - error on download	' + url[i]);
                        i++;
                        if (i < url.length) {
                            connectUrl(url);
                        }
                        if (i === url.length) {
                            console.error (url[--i] + '     |||--> error on download & not found alternative file for download');
                        }
                    };
                    script.onload = function() {
                        counterOnLoad++;
                        ifNeedCallback()
                    };
                    document.getElementsByTagName('body')[0].appendChild(script);
                }
            connectUrl (url)
        }

        function addStyle(url) {
            let i = 0;
            function connectUrl(url) {
                let link = document.createElement('link');
                link.setAttribute('rel', 'stylesheet');
                link.setAttribute('type', 'text/css');
                link.setAttribute('href', url[i]);
                link.onerror = function() {
                    console.warn('CSS - error on download	' + url[i]);
                    i++;
                    if (i < url.length) {
                        connectUrl(url);
                    }
                    if (i === url.length) {
                        console.error (url[--i] + '     |||--> error on download & not found alternative file for download');
                    }
                };
                link.onload = function() {
                    counterOnLoad++;
                    ifNeedCallback()
                };
                document.getElementsByTagName('body')[0].appendChild(link);
            }
            connectUrl (url)
        }
        for (let i = 0; i < arr.length; i++) {
            arr[i][0].slice(-3) === '.js' ? addScript(arr[i]) : addStyle(arr[i]);
        }
    })
}
