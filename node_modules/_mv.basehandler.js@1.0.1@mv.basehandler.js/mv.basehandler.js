var V = require( 'mv.js' )
    ;

/**
 * 提供事件处理的基本方法
 * @module v.basehandler
 * @abstract
 * @return {object}
 */
var _CONST = {
    /**
     * 触发事件
     * @method  trigger
     * @param   {string}    _evtName    事件名
     * @param   {array}     _args       需要传递的参数
     * @return  v.module:basehandler
     */
    trigger: 
        function( _evtName, _args ){
            var _trigger = $( this );
            _trigger.trigger( _evtName, _args );
            return this;
        }
    /**
     * 触发事件, 并返回处理结果
     * @method  triggerHandler
     * @param   {string}    _evtName    事件名
     * @param   {array}     _args       需要传递的参数
     * @return  *
     */
    , triggerHandler: 
        function( _evtName, _args ){
            var _trigger = $( this );
            return _trigger.triggerHandler( _evtName, _args );
        }
    /**
     * 绑定事件
     * @method  on
     * @param   {string}    _evtName    事件名
     * @param   {callback}  _cb         回调函数
     * @return  v.module:basehandler
     */
    , on: 
        function( _evtName, _cb ){
            var _trigger = $( this );
            _trigger.on( _evtName, _cb );
            return this;
        }
    /**
     * 解绑事件
     * @method  off
     * @param   {string}    _evtName    事件名
     * @param   {callback}  _cb         回调函数
     * @return  v.module:basehandler
     */
    , off: 
        function( _evtName, _cb ){
            var _trigger = $( this );
            _trigger.off( _evtName, _cb );
            return this;
        }
};

module.exports = V.BaseHandler = _CONST;

