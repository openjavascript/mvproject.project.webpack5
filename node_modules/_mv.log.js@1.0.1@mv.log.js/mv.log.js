var _ = require( 'underscore' );

!window.console && (
	window.console = {
		log: function(){}
		, dir: function(){}
		, error: function(){}
		, clear: function(){}
	}
);

module.exports =  {
	/**
	 * 全局控制是否输出调试信息
	 * @name debug
	 * @type boolean
	 * @default true
	 * @memebrof v.module:log
	 * @example    Log.debug = false;//禁止控制台输出调试信息
	 */
	debug: true
	/**
	 * 输出调试信息
	 * @method  v.module:log#log
	 * @param  {...string} _msg 调试信息
	 * @return v.module:log
	 * @example Log.log( 'msg1', 'msg2', 'msg3' );
	 */
	, log: function(){
		this.debug && console.log( _.toArray( arguments ).join( ' ' ) ); 
		return this;
	}
	/**
	 * 输出调试信息, 用于显示object结构
	 * @method  v.module:log#dir
	 * @param  {...*} _msg 调试信息
	 * @return v.module:log
	 * @example Log.dir( 'string1', [1,2,3], {k1: 1, k2: 2} );
	 */
	, dir: function(){
		var _p = this;
		_p.debug && _.each( _.toArray( arguments ), function( _a ){ 
			if( typeof _a == 'string' || typeof _a == 'number' || typeof _a == 'boolean' || typeof _a == 'undefined' ){
				_p.log( _a );
				return;
			}
			console.dir( _a ); 
		} ); 
		return this;
	}
	/**
	 * 输出错误调试信息
	 * @method  v.module:log#error
	 * @param  {...*} _msg 调试信息
	 * @return v.module:log
	 * @example Log.error( 'error occur' );
	 */
	, error: function(){
		this.debug && _.each( arguments, function( _a ){ console.error( _a ); } ); 
		return this;
	}
	/**
	 * 清除调停信息
	 * @method  v.module:log#clear
	 * @return v.module:log
	 * @example Log.clear();
	 */
	, clear: function(){
		this.debug && console.clear(); 
		return this;
	}
};

