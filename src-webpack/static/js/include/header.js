
var V = require( 'mv.js' )
    ;

V.DOC.on( 'focus', '#kw', function(){
    $("#js_hot_list").css( 'z-index', V.ZINDEX++ ).show();
});

V.DOC.on( 'blur', '#kw', function(){
    $("#js_hot_list").fadeOut(200);
});


