
var V = require( 'mv.js' )
    , BaseHandler = require( 'mv.basehandler.js' )
    , _CONST = $.extend( true, {
        
        }, BaseHandler )
    ;

module.exports = _CONST;

/**
 * 使用 V.WIN触发一个事件
 * <br /> 事件名为 [data-cmd] 属性的值, 或者可用 {@link V#utils#detectCommand} 解析的变量值
 * @event [data-cmd]
 * @memberof V#DOC
 */
/**
 * 监听 dom 属性 [data-cmd] 的触发
 * @listens V#DOC~event:[data-cmd]
 */
V.DOC.delegate( '[data-cmd]', 'click', function( _evt ){
    var _p = $( this )
        , arr = _p.data('cmd').replace( /[\s]/g, '' ).split(',')
        , _cmd;

    for(var i = 0;i < arr.length; i++ ){
        _cmd = V.utils.detectCommand( arr[i] );
        _cmd && ( 
                V.WIN.trigger( _cmd, [ _p, _evt ] )
                , _CONST.trigger( _cmd, [ _p, _evt ] )
            );
    }
});


