import {wj42} from 'static/js/libraries/will-just-42';
export let tabsInit = () => wj42.tabsGenerator (
    ['.menu__container__navigation a'],  // header menu - only highlight classActive (header)
    ['.s2-li-wrapper a', '.monitor-display-img', '.img-'],  // img in monitor (section 2)
    ['.s2-li-wrapper a', '.tabs-container', '.text-'],  // text right than monitor (section 2)
    ['.login-wrapper__tabs-form__li-wrapper a', '.login-tabs-container', '.login-']  // form tabs (section 4)
);
