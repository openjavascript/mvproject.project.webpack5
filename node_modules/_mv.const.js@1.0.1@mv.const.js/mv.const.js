
var V = require( 'mv.js' )
    , BaseHandler = require( 'mv.basehandler.js' )
    ;

V.Const = $.extend( true, V.Const || {}, {
    is: {
        android: 'Android'
        , ios: 'iOS'
        , unknown: 'unknown' 
    }
    , check: {
        isExp: 'check_isExp'
        , modDisabled: 'check_modDisabled'
    }
    , react: {
        ready: 'reactReady'
    }
    , type: {
        json: 'jsonType'
        , string: 'stringType'
        , empty: 'emptyType'
    }
    , parseData: {
        url: 'parseDataUrl'
        , base64: 'parseDataBase64'
        , base64Url: 'parseDataBase64Url'
        , hexToBin: 'parseDataHTB'
        , json: 'parseDataJson'
        , ex: 'parseDataEx'
        , isError: 'parseData_isError'
    }
    , history: {
        pushState: 'historyPushState'
    }
    , send: {
    }
    , command: {
    }
    , app: {
        ready: 'jsAppReady'
        , init: 'jsAppInit'
        , reset: 'jsAppReset'
        , command: 'jsAppCommand'

        , back: 'jsAppBack'

        , detectCommand: 'jsAppDetectCommand'
        , afterUpdate: 'app_afterUpdate'
        , onPopState: 'app_onPopState'
    }
    , exec: {
        appCommand: 'jsExecAppCommand'
    }
    , open: {
        panel: 'open_panel'
        , dialog: 'open_dialog'
        , before: 'open_before'
        , after: 'open_after'
    }
    , close: {
        panel: 'close_panel'
        , dialog: 'close_dialog'
        , before: 'close_before'
        , after: 'close_after'
    }
    , mod: {
        show: 'showMod'
        , hashMod: 'showHashMod'
        , afterShowMod: 'showAfterShowMod'
        , afterShowSubmod: 'showAfterShowSubmod'

        , url: 'showUrl'
        , keyBack: 'showKeyBack'
        , ex: 'showModEx'
    }
}, BaseHandler );

module.exports = V.Const;

