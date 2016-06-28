export var section3 = () => {

    function isVisible(elem) {

        var coords = elem.getBoundingClientRect();

        var windowHeight = document.documentElement.clientHeight;

        var extendedTop = -windowHeight;
        var extendedBottom = windowHeight;

        // top visible || bottom visible
        var topVisible = coords.top > extendedTop && coords.top < extendedBottom;
        var bottomVisible = coords.bottom < extendedBottom && coords.bottom > extendedTop;

        return topVisible || bottomVisible;
    }

var slider = {};
if ($(window).width() <= 1075) {
    slider.state = '2d';
}
if ($(window).width() > 1075) {
    slider.state = '3d';
}


/*=================================
=            3D slider            =
=================================*/
(function($) {
    //
    // Detect CSS transform support
    //
    var transform = (function() {
        var vendors = ['webkit', 'moz', 'ms'];
        var style = document.createElement("div").style;
        var trans = 'transform' in style ? 'transform' : undefined;

        for (var i = 0, count = vendors.length; i < count; i++) {
            var prop = vendors[i] + 'Transform';
            if (prop in style) {
                trans = prop;
                break;
            }
        }

        return trans;
    })();

    var Item = function(element, options) {
        element.item = this;
        this.element = element;

        if (element.tagName === 'IMG') {
            this.fullWidth = element.width;
            this.fullHeight = element.height;
        } else {
            element.style.display = "inline-block";
            this.fullWidth = element.offsetWidth;
            this.fullHeight = element.offsetHeight;
        }

        element.style.position = 'absolute';

        if (options.mirror && this.element.tagName === 'IMG') {
            // Wrap image in a div together with its generated reflection
            this.reflection = $(element).reflect(options.mirror).next()[0];

            var $reflection = $(this.reflection);
            this.reflection.fullHeight = $reflection.height();
            $reflection.css('margin-top', options.mirror.gap + 'px');
            $reflection.css('width', '100%');
            element.style.width = "100%";

            // The item element now contains the image and reflection
            this.element = this.element.parentNode;
            this.element.item = this;
            this.element.alt = element.alt;
            this.element.title = element.title;
        }

        if (transform && options.transforms)
            this.element.style[transform + "Origin"] = "0 0";

        this.moveTo = function(x, y, scale) {
            this.width = this.fullWidth * scale;
            this.height = this.fullHeight * scale;
            this.x = x;
            this.y = y;
            this.scale = scale;

            var style = this.element.style;
            style.zIndex = "" + (scale * 100) | 0;

            if (transform && options.transforms) {
                style[transform] = "translate(" + x + "px, " + y + "px) scale(" + scale + ")";
            } else {
                // The gap between the image and its reflection doesn't resize automatically
                if (options.mirror && this.element.tagName === 'IMG')
                    this.reflection.style.marginTop = (options.mirror.gap * scale) + "px";

                style.width = this.width + "px";
                style.left = x + "px";
                style.top = y + "px";
            }
        };
    };

    var time = !window.performance || !window.performance.now ?
        function() {
            return +new Date();
        } :
        function() {
            return performance.now();
        };

    //
    // Detect requestAnimationFrame() support
    //
    // Support legacy browsers:
    //   http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    //
    var cancelFrame = window.cancelAnimationFrame || window.cancelRequestAnimationFrame;
    var requestFrame = window.requestAnimationFrame;

    (function() {
        var vendors = ['webkit', 'moz', 'ms'];

        for (var i = 0, count = vendors.length; i < count && !cancelFrame; i++) {
            cancelFrame = window[vendors[i] + 'CancelAnimationFrame'] || window[vendors[i] + 'CancelRequestAnimationFrame'];
            requestFrame = requestFrame && window[vendors[i] + 'RequestAnimationFrame'];
        }
    }());

    var Carousel = function(element, options) {
        var self = this;
        var $container = $(element);
        this.items = [];
        this.xOrigin = (options.xOrigin === null) ? $container.width() * 0.5 : options.xOrigin;
        this.yOrigin = (options.yOrigin === null) ? $container.height() * 0.1 : options.yOrigin;
        this.xRadius = (options.xRadius === null) ? $container.width() / 2.3 : options.xRadius;
        this.yRadius = (options.yRadius === null) ? $container.height() / 6 : options.yRadius;
        this.farScale = options.farScale;
        this.rotation = this.destRotation = Math.PI / 2; // start with the first item positioned in front
        this.speed = options.speed;
        this.smooth = options.smooth;
        this.fps = options.fps;
        this.timer = 0;
        this.autoPlayAmount = options.autoPlay;
        this.autoPlayDelay = options.autoPlayDelay;
        this.autoPlayTimer = 0;
        this.onLoaded = options.onLoaded;
        this.onRendered = options.onRendered;

        this.itemOptions = {
            transforms: options.transforms
        };

        if (options.mirror) {
            this.itemOptions.mirror = $.extend({ gap: 2 }, options.mirror);
        }

        $container.css({ position: 'relative', overflow: 'hidden' });

        // Rotation:
        //  *      0 : right
        //  *   Pi/2 : front
        //  *   Pi   : left
        //  * 3 Pi/2 : back
        this.renderItem = function(itemIndex, rotation) {
            var item = this.items[itemIndex];
            var sin = Math.sin(rotation);
            var farScale = this.farScale;
            var scale = farScale + ((1 - farScale) * (sin + 1) * 0.5);

            item.moveTo(
                this.xOrigin + (scale * ((Math.cos(rotation) * this.xRadius) - (item.fullWidth * 0.5))),
                this.yOrigin + (scale * sin * this.yRadius),
                scale
            );
        };

        this.render = function() {
            var count = this.items.length;
            var spacing = 2 * Math.PI / count;
            var radians = this.rotation;

            for (var i = 0; i < count; i++) {
                this.renderItem(i, radians);
                radians += spacing;
            }

            if (typeof this.onRendered === 'function')
                this.onRendered(this);
        };

        this.playFrame = function() {
            var rem = self.destRotation - self.rotation;
            var now = time();
            var dt = (now - self.lastTime) * 0.002;
            self.lastTime = now;

            if (Math.abs(rem) < 0.003) {
                self.rotation = self.destRotation;
                self.pause();
            } else {
                // Rotate asymptotically closer to the destination
                self.rotation = self.destRotation - rem / (1 + (self.speed * dt));
                self.scheduleNextFrame();
            }

            self.render();
        };

        this.scheduleNextFrame = function() {
            this.lastTime = time();

            this.timer = this.smooth && cancelFrame ?
                requestFrame(self.playFrame) :
                setTimeout(self.playFrame, 1000 / this.fps);
        };

        this.itemsRotated = function() {
            return this.items.length * ((Math.PI / 2) - this.rotation) / (2 * Math.PI);
        };

        this.floatIndex = function() {
            var count = this.items.length;
            var floatIndex = this.itemsRotated() % count;

            // Make sure float-index is positive
            return (floatIndex < 0) ? floatIndex + count : floatIndex;
        };

        this.nearestIndex = function() {
            return Math.round(this.floatIndex()) % this.items.length;
        };

        this.nearestItem = function() {
            return this.items[this.nearestIndex()];
        };

        this.play = function() {
            if (this.timer === 0)
                this.scheduleNextFrame();
        };

        this.pause = function() {
            this.smooth && cancelFrame ? cancelFrame(this.timer) : clearTimeout(this.timer);
            this.timer = 0;
        };

        //
        // Spin the carousel.  Count is the number (+-) of carousel items to rotate
        //
        this.go = function(count) {
            this.destRotation += (2 * Math.PI / this.items.length) * count;
            this.play();
        };

        this.deactivate = function() {
            this.pause();
            clearInterval(this.autoPlayTimer);
            if (options.buttonLeft) options.buttonLeft.unbind('click');
            if (options.buttonRight) options.buttonRight.unbind('click');
            $container.unbind('.cloud9');
        };

        this.autoPlay = function() {
            this.autoPlayTimer = setInterval(
                function() { self.go(self.autoPlayAmount); },
                this.autoPlayDelay
            );
        };

        this.enableAutoPlay = function() {
            // Stop auto-play on mouse over
            $container.bind('mouseover.cloud9', function() {
                clearInterval(self.autoPlayTimer);
            });

            // Resume auto-play when mouse leaves the container
            $container.bind('mouseout.cloud9', function() {
                self.autoPlay();
            });

            this.autoPlay();
        };

        this.bindControls = function() {
            if (options.buttonLeft) {
                options.buttonLeft.bind('click', function() {
                    self.go(-1);
                    return false;
                });
            }

            if (options.buttonRight) {
                options.buttonRight.bind('click', function() {
                    self.go(1);
                    return false;
                });
            }

            if (options.mouseWheel) {
                $container.bind('mousewheel.cloud9', function(event, delta) {
                    self.go((delta > 0) ? 1 : -1);
                    return false;
                });
            }

            if (options.bringToFront) {
                $container.bind('click.cloud9', function(event) {
                    var hits = $(event.target).closest('.' + options.itemClass);

                    if (hits.length !== 0) {
                        var idx = self.items.indexOf(hits[0].item);
                        var count = self.items.length;
                        var diff = idx - (self.floatIndex() % count);

                        // Normalise "diff" to represent the shortest way to rotate item to front
                        if (2 * Math.abs(diff) > count)
                            diff += (diff > 0) ? -count : count;

                        // Suppress default browser action if the item isn't roughly in front
                        if (Math.abs(diff) > 0.5)
                            event.preventDefault();

                        // Halt any rotation already in progress
                        self.destRotation = self.rotation;

                        self.go(-diff);
                    }
                });
            }
        };

        var items = $container.find('.' + options.itemClass);

        this.finishInit = function() {
            //
            // Wait until all images have completely loaded
            //
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if ((item.tagName === 'IMG') &&
                    ((item.width === undefined) || ((item.complete !== undefined) && !item.complete)))
                    return;
            }

            clearInterval(this.initTimer);

            // Init items
            for (i = 0; i < items.length; i++)
                this.items.push(new Item(items[i], this.itemOptions));

            // Disable click-dragging of items
            $container.bind('mousedown onselectstart', function() {
                return false;
            });

            if (this.autoPlayAmount !== 0) this.enableAutoPlay();
            this.bindControls();
            this.render();

            if (typeof this.onLoaded === 'function')
                this.onLoaded(this);
        };

        this.initTimer = setInterval(function() { self.finishInit(); }, 50);
    };

    //
    // The jQuery plugin
    //
    $.fn.Cloud9Carousel = function(options) {
        return this.each(function() {
            /* For full list of options see the README */
            options = $.extend({
                xOrigin: null, // null: calculated automatically
                yOrigin: null,
                xRadius: null,
                yRadius: null,
                farScale: 0.5, // scale of the farthest item
                transforms: true, // enable CSS transforms
                smooth: true, // enable smooth animation via requestAnimationFrame()
                fps: 30, // fixed frames per second (if smooth animation is off)
                speed: 4, // positive number
                autoPlay: 0, // [ 0: off | number of items (integer recommended, positive is clockwise) ]
                autoPlayDelay: 4000,
                bringToFront: false,
                itemClass: 'cloud9-item',
                handle: 'carousel'
            }, options);

            $(this).data(options.handle, new Carousel(this, options));
        });
    };
})(window.jQuery || window.Zepto);





let slider3d = () => {

    $('#carousel').attr( 'data-carousel2d' , 'false' );
    $('.game-slider__item-2d').removeClass('game-slider__item-2d')
        .addClass('game-slider__item cloud9-item s3-img-wrapper');
    $("#carousel").removeClass('game-slider-2d ')
        .addClass('game-slider');
    $("#carousel").Cloud9Carousel({
        autoPlay: 1,
        autoPlayDelay: 3000,
        xOrigin: null, // null: calculated automatically
        yOrigin: null,
        farScale: 0.4,
        xRadius: 550,
        yRadius: 50,
        bringToFront: true
    });
};
    if ($(window).width() > 1075) {
        slider3d()
    }



/*=====  End of 3D slider  ======*/

/*=================================
=            2D slider            =
=================================*/
let slider2d = () => {
    $('.container__game-slider').attr('style', '');
    $('#carousel').removeClass('game-slider s3-img-wrapper').addClass('game-slider-2d');
    $('.game-slider__item').removeClass('game-slider__item cloud9-item')
        .addClass('game-slider__item-2d');

    $('#carousel').slick({
        accessibility: true,
        adaptiveHeight: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true,
        arrows: false,
        dots: true,

        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                dots: true
            }
        }, {
            breakpoint: 640,
            settings: {
                slidesToShow: 1,
                dots: true,
                fade: true,
                cssEase: 'linear'
            }
        }]
    });
};
    if ($(window).width() <= 1075) {
        slider2d()
    }


/*=====  End of 2D slider  ======*/
    let carouselTopPadding = 0;
    function fixToH1position () {
        let $carousel = $("#carousel");
        let [$imgs, minPosition] = [$carousel.find('img'), 99999999999];
        for (let img of $imgs ) {
            let position = $(img).offset().top;
            if (minPosition > position) {
                minPosition = position;
            }
        }

        let $h1 = $('.container__game-slider h1');

        if ($h1.offset().top + $h1.height() + 40 > minPosition) {

                carouselTopPadding += 13;
                $carousel.css({'top': carouselTopPadding});
                setTimeout( fixToH1position,5)
        }
        if ($h1.offset().top + $h1.height() + 70 < minPosition) {
                carouselTopPadding -= 13;
                $carousel.css({'top': carouselTopPadding});
                setTimeout( fixToH1position,5)
        }
    }
    function fixBottomPosition(min,max) {
        let $carousel = $("#carousel");
        let [$imgs, maxPosition, maxHeight, toBottom] = [$carousel.find('img'), 0, 0, 0];
        for (let img of $imgs ) {
            let position = $(img).offset().top;
            if ( position > maxPosition) {
                maxPosition = position;
            }
            if ($(img).height() > maxHeight) {
                maxHeight = $(img).height();
            }
            toBottom = maxPosition + maxHeight;
        }
        let $containerSlider = $('.container__game-slider');
        let $ofsetTopLogin = $('.login-wrapper__tabs-form').offset().top;


        function correctPosition() {
            if ($ofsetTopLogin < (toBottom + min)) {
                $containerSlider.height($containerSlider.height() + 10);
                setTimeout( () => {
                    fixBottomPosition2d(min,max);
                },i * 5)
            }
            if ($ofsetTopLogin > (toBottom + max)) {
                $containerSlider.height($containerSlider.height() - 10);
                setTimeout( () => {
                    fixBottomPosition2d(min,max);
                }, i * 5)
            }
        }






    }

    function fixBottomPosition2d(min,max) {
        let $carousel = $("#carousel");
        let [$imgs, maxPosition, maxHeight, toBottom] = [$carousel.find('img'), 0, 0, 0];
        let $dotsPosition;
        try {
            $dotsPosition = $('.slick-dots').offset().top + $('.slick-dots').height();
        } catch (e) {}


        let $containerSlider = $('.container__game-slider');
        let $ofsetTopLogin = $('.login-wrapper__tabs-form').offset().top;

        if ($ofsetTopLogin < ($dotsPosition + min)) {
            $containerSlider.height($containerSlider.height() + 10);
            setTimeout( () => {
                fixBottomPosition2d(min,max);
            },5)
        }
        if ($ofsetTopLogin > ($dotsPosition + max)) {
            $containerSlider.height($containerSlider.height() - 10);
            setTimeout( () => {
                fixBottomPosition2d(min,max);
            },5)
        }
    }
    let startInterval = false;
    let interval;
    let singleton = true;

$(window).on('resize scroll', (function() {
    let [block, carousel, $carousel] = [false, document.querySelector('#carousel'), $("#carousel")];
    if (isVisible(carousel)) {
        let startInterval = true;
        if (startInterval && singleton) {
            singleton = false;
            interval = setInterval(() => {



        if (slider.state === '2d' && $(window).width() > 1075 && !block) {
            block = true;
            $carousel.find('img').css('position', 'absolute');
            function transformTo3D() {
                return new Promise( (resolve) => {
                    $carousel.slick('unslick');
                    slider3d();
                    resolve('3d');
                })
            }
            transformTo3D()
                .then( (form) => {
                    block = false;
                    slider.state = form;
                    fixToH1position ();
                    fixBottomPosition(10, 21);

                })
        }
        if (slider.state === '3d' && $(window).width() <= 1075 && !block) {
            $carousel.css({'top': 0});
            block = true;
            function transformTo2D() {
                return new Promise( (resolve) => {
                    $carousel.data("carousel").deactivate();
                    $carousel.find('img').attr('style', '');
                    setTimeout(() => {
                        slider2d();
                        resolve('2d');
                    },15)
                })
            };
            transformTo2D()
                .then( (form) => {
                    block = false;
                    slider.state = form;
                })
        }
        if (slider.state === '3d' && $(window).width() > 1075) {
            fixToH1position ();
            fixBottomPosition(10,21);
        }
        if (slider.state === '2d' && $(window).width() <= 1075) {
            fixBottomPosition2d(3,15);
        }
            },100);
        }
    }
    if (!isVisible(carousel)) {
        startInterval = false;
        singleton = true;
        clearInterval(interval);
    }


}));

};
