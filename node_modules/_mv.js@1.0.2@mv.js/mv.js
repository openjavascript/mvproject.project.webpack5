define( [], function(){
    /** @namespace V */
    !window.V && ( window.V = {} );

    $.extend( true, V, {
        /** 
         * 全局常量命名空间
         * <br />v.js 里所有的操作都通过 V.Const 的事件名进行触发
         * @see {@link v.module.const}
         * @namespace V#Const 
         */
        Const: V.Const || {}
        /**
         * @name V#ZINDEX
         * @type Int
         * @default 1000
         */
        , ZINDEX: 1000
        /**
         * $( document.documentElement )
         * @name V#HTML
         * @type Selector
         */
        , HTML: $( document.documentElement ),      JHTML: $( document.documentElement )
        /**
         * $( document )
         * @namespace V#DOC
         */
        , DOC: $( document ),                       JDOC: $( document )
        /**
         * $( document.body )
         * @name V#BODY
         * @type Selector
         */
        , BODY: $( document.body ),                 JBODY: $( document.body )
        /**
         * $( window )
         * @namespace V#WIN
         */
        , WIN: $( window ),                         JWIN: $( window )
        /** @namespace V#app */
        , app: V.app || {
            /**
             * @name V#app#prefix
             * @type String
             * @default  app_prefix_
             */
            prefix: 'app_prefix_'
            /**
             * 给输入字符串添加 前后缀, 防止命名冲突
             * @method getPrefixVal
             * @param {String} _v 
             * @return {String}
             * @memberof V#app
             */
            , getPrefixVal:
                function( _v ){
                    return V.utils.printf( '{0}_{1}_{2}', V.app.prefix, V.app.iotId, _v );
                }
        }
        /** @namespace V#utils */
        , utils: {
            getMobileOperatingSystem: getMobileOperatingSystem
            , detectCommand: detectCommand
            , getNumberValue: getNumberValue
            , getStringValue: getStringValue
            , printf: printf
            , printKey: printKey
            , formatDate: formatDate
            , parseFinance: parseFinance
            , parseBool: parseBool
            , padChar: padChar
            , parentSelector: parentSelector
            , isDecimal: isDecimal
            , isMoney: isMoney
            , cloneObject: cloneObject

            , "filterXSS": filterXSS
            , "delUrlParam": delUrlParam
            , "delUrlParams": delUrlParams
            , "getUrlParam": getUrlParam
            , "getUrlParams": getUrlParams
            , "hasUrlParam": hasUrlParam
            , 'urlHostName': urlHostName
            , "addUrlParams": addUrlParams
            , "getAllUrlParams": getAllUrlParams
			, "scriptContent": scriptContent
            , "ts": function(){ return new Date().getTime(); }

			, winSize: winSize
            , getFlashObject: getFlashObject

        } 
        /** @namespace V#is */
        , is: {
            wexin: isWeiXin()
            /**
             * 判断客户端是否为微信
             * @name weixin
             * @type {boolean}
             * @memberof V#is
             */
            , weixin: isWeiXin()
            , debug: parseBool( getUrlParam(  'fe_debug' ) )

        }
        , T: {}
    });
    function getFlashObject($id,$name) {
        $name = $name || $id;
        var o;
        if (navigator.appName.indexOf("Microsoft") != -1)//IE
        {
            o = document.getElementById($id);
        }
        else//NOT IE
        {
            o = window.document[$name];
            if( !o ){ o = $($id); }
        }
        return o;
    }
    /**
     * 获取脚本模板的内容
     * @method  scriptContent
     * @param   {selector}  _selector
     * @return  string
     * @static
     */
    function scriptContent( _selector ){
        var _r = '';
        _selector 
            && ( _selector = $( _selector ) ).length 
            && ( _r = _selector.html().trim().replace( /[\r\n]/g, '') )
            ;
        return _r;
    }
    /**
     * 获取 window 的 相关大小
     * @method  winSize
     * @param   {window}    _win,  default = window
     * @return  Object
     * @static
     */
    function winSize( _win ){
        _win = $( _win || window );
        var _r = {
                width: _win.width()
                , height: _win.height()
                , scrollLeft: _win.scrollLeft()
                , scrollTop: _win.scrollTop()
            };
        _r.viewportX = _r.scrollLeft;
        _r.maxViewportX = _r.scrollLeft + _r.width;
        _r.viewportY = _r.scrollTop;
        _r.maxViewportY = _r.scrollTop + _r.height;
        return _r;
    }
    /**
     * 取 URL 的 host name
     * @method  urlHostName
     * @param   {string}    _url
     * @return  string
     * @static
     */
    function urlHostName( _url ){
        var _r = '', _url = _url || location.href;
        if( /\:\/\//.test( _url ) ){
            _url.replace( /^.*?\:\/\/([^\/]+)/, function( $0, $1 ){
                _r = $1;
            });
        }
        return _r;
    }
    /**
     * 把 URL 相对路径 转换为 绝对路径
     * @method  relativePath
     * @param   {string}    _path
     * @param   {string}    _url
     * @return  string
     * @static
     */
    function relativePath( _path, _url ){
        _url = _url || document.URL;
        _url = _url.replace(/^.*?\:\/\/[^\/]+/, "").replace(/[^\/]+$/, "");
        if(!_path){return _url;}  
        if(!/\/$/.test(_url)){_url += "/";}

        if(/(^\.\.\/|^\.\/)/.test(_path)){
            var Re = new RegExp("^\\.\\.\\/"), iCount = 0;    
            while(Re.exec(_path)!=null){
                _path = _path.replace(Re, "");
                iCount++;
            }       
            for(var i=0; i<iCount; i++){_url = _url.replace(/[^\/]+\/$/, "");}    
            if(_url=="") return "/";  
            _path = _path.replace(/^\.\//, ""); 
            _path.replace( /\/\/$/, '/' );
            return _url+_path;
        }   
        return _path;
    }

    /**
     * 取URL参数的值
     * <br /><b>require:</b> filterXSS
     * @method  getUrlParam
     * @param   {string}    _url
     * @param   {string}    _key
     * @return  string
     * @static
     * @example
            var defaultTag = getUrlParam(location.href, 'tag');  
     */ 
    function getUrlParam( _url, _key ){
        var _r = '', _ar, i, _items;
        !_key && ( _key = _url, _url = location.href );
        _url.indexOf('#') > -1 && ( _url = _url.split('#')[0] );
        if( _url.indexOf('?') > -1 ){
            _ar = _url.split('?')[1].split('&');
            for( i = 0; i < _ar.length; i++ ){
                _items = _ar[i].split('=');
                _items[0] = decodeURIComponent( _items[0] || '' ).replace(/^\s+|\s+$/g, '');
                if( _items[0].toLowerCase() == _key.toLowerCase() ){
                    _r = filterXSS( _items[1] || '' );
                    break;
                } 
            }
        }
        return _r;
    }
    /**
     * 取URL参数的值, 这个方法返回数组
     * <br />与 getUrlParam 的区别是可以获取 checkbox 的所有值
     * <br /><b>require:</b> filterXSS
     * @method  getUrlParams
     * @param   {string}    _url
     * @param   {string}    _key
     * @return  Array
     * @static
     * @example
            var params = getUrlParams(location.href, 'tag');  
     */ 
    function getUrlParams( _url, _key ){
        var _r = [], _params, i, j, _items;
        !_key && ( _key = _url, _url = location.href );
        _url = _url.replace(/[\?]+/g, '?').split('?');
        if( _url.length > 1 ){
            _url = _url[1];
            _params = _url.split('&');
            if( _params.length ){
                for( i = 0, j = _params.length; i < j; i++ ){
                    _items = _params[i].split('=');
                    _items[0] = decodeURIComponent( _items[0] ) || '';
                    if( _items[0].trim() == _key ){
                        _r.push( filterXSS( _items[1] || '' ) );
                    }
                }
            }
        }
        return _r;
    }

    function getAllUrlParams( _url ){
        var _r = {}, _params, i, j, _items, sharp = '';
        _url = _url || location.href;
        _url.indexOf('#') > -1 && ( sharp = _url.split('#')[1], _url = _url.split('#')[0] );
        _url = _url.replace(/[\?]+/g, '?').split('?');
        if( _url.length > 1 ){
            _url = _url[1];
            _params = _url.split('&');
            if( _params.length ){
                for( i = 0, j = _params.length; i < j; i++ ){
                    _items = _params[i].split('=');
                    _items[0] = decodeURIComponent( _items[0] ) || '';
                    if( _items[0].trim() ){
                        _r [ _items[0] ] =  filterXSS( _items[1] || '' ); 
                    }
                }
            }
        }
        return _r;
    }


    /**
     * 删除URL参数
     * <br /><b>require:</b> filterXSS
     * @method  delUrlParam
     * @param  {string}    _url
     * @param  {string}    _key
     * @return  string
     * @static
     * @example
            var url = delUrlParam( location.href, 'tag' );
     */ 
    function delUrlParam( _url, _key ){
        var sharp = '', params, tmpParams = [], i, item;
        !_key && ( _key = _url, _url = location.href );
        _url.indexOf('#') > -1 && ( sharp = _url.split('#')[1], _url = _url.split('#')[0] );
        if( _url.indexOf('?') > -1 ){
            params = _url.split('?')[1].split('&');
            _url = _url.split('?')[0];
            for( i = 0; i < params.length; i++ ){
                var items = params[i].split('=');
                items[0] = items[0].replace(/^\s+|\s+$/g, '');
                if( items[0].toLowerCase() == _key.toLowerCase() ) continue;
                tmpParams.push( items.join('=') )
            }
            _url += '?' + tmpParams.join('&');
        }
        sharp && ( _url += '#' + sharp );
       _url = filterXSS( _url );
        return _url;
    }
    /**
     * 批量删除URL参数
     * <br /><b>require:</b> delUrlParam
     * @method  delUrlParams
     * @param  {string}    _url
     * @param  {Array}    _keys
     * @return  string
     * @static
     * @example
            var url = delUrlParam( location.href, [ 'k1', 'k2' ] );
     */ 
    function delUrlParams( _url, _keys ){
        !_keys && ( _keys = _url, _url = location.href );
        for( var k in _keys ) _url = delUrlParam( _url, _keys[ k ] );
        return _url;
    }
    /**
     * 判断URL中是否有某个get参数
     * @method  hasUrlParam
     * @param   {string}    _url
     * @param   {string}    _key
     * @return  bool
     * @static
     * @example
     *      var bool = hasUrlParam( 'getkey' );
     */
    function hasUrlParam( _url, _key ){
        var _r = false;
        if( !_key ){ _key = _url; _url = location.href; }
        if( /\?/.test( _url ) ){
            _url = _url.split( '?' ); _url = _url[ _url.length - 1 ];
            _url = _url.split('&');
            for( var i = 0, j = _url.length; i < j; i++ ){
                if( _url[i].split('=')[0].toLowerCase() == _key.toLowerCase() ){ _r = true; break; };
            }
        }
        return _r;
    }
    /**
     * 添加URL参数
     * <br /><b>require:</b> delUrlParam, filterXSS
     * @method  addUrlParams
     * @param   {string}    _url
     * @param   {object}    _params
     * @return  string
     * @static
     * @example
            var url = addUrlParams( location.href, {'key1': 'key1value', 'key2': 'key2value' } );
     */ 
    function addUrlParams( _url, _params ){
        var sharp = '';
        !_params && ( _params = _url, _url = location.href );
        _url.indexOf('#') > -1 && ( sharp = _url.split('#')[1], _url = _url.split('#')[0] );
        for( var k in _params ){
            _url = V.utils.delUrlParam(_url, k);
            if( /\#/.test( k ) ) continue;
            _url.indexOf('?') > -1 
                ? _url += '&' + k +'=' + _params[k]
                : _url += '?' + k +'=' + _params[k];
        }
        sharp && ( _url += '#' + sharp );
        _url = filterXSS( _url.replace(/\?\&/g, '?' ) );
        return _url;  
    }
    /**
     * xss 过滤函数
     * @method filterXSS
     * @param   {string}    _s
     * @return string
     * @static
     */
    function filterXSS( _s ){
        _s = _s.toString();
        !_s.length && ( _s = '' );
        _s = decodeURIComponent( _s );

        _s && (
            _s = _s
                    .replace( /</g, '&lt;' )
                    .replace( />/g, '&gt;' )
        );
        return _s;
    }


    function isWeiXin(){ 
        var ua = window.navigator.userAgent.toLowerCase(); 
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
            return true; 
        }else{ 
            return false; 
        } 
    } 
    /**
     * 保存数据到 Selector, 可以为非字符串内容
     * @method rawData
     * @param {String} _k 
     * @param {*} _v 
     * @return {*}
     * @memberof Zepto
     */
    $.fn.rawData =
        function( _k, _v ){
            var _selector = $( this ), _r = _v;

            _selector.each( function( _sk, _sv ){
                _sv.rawDataEx = _sv.rawDataEx || {};
                if( _k ){
                    typeof _v != 'undefined' && ( _sv.rawDataEx[ _k ] = _v );
                    !_sk && ( _r = _sv.rawDataEx[ _k ] );
                }
            });

            return _r;
        };

    /**
     * 深度克隆对象, 使用 JSON.stringify
     * @method  cloneObject
     * @param   {Object}    _obj
     * @return  Object
     * @memberof V#utils
     */
    function cloneObject( _obj ){
        return JSON.parse( JSON.stringify( _obj ) );
    }
    /**
     * 获取数值的值, 如果为空返回 '-'
     * @method  getNumberValue
     * @param   {*}    _v
     * @return  {String|Number}
     * @memberof V#utils
     */
    function getNumberValue( _v ){
        var _r = '-';
        if( typeof _v == 'string' || ( typeof _v == 'number' && !isNaN( _v ) ) ){
            _r = _v;
        }
        return _r;
    }
    /**
     * 获取字符串的值, 如果为空返回 '-'
     * @method  getStringValue
     * @param   {*}    _v
     * @return  {String}
     * @memberof V#utils
     */
    function getStringValue( _v ){
        var _r = '-';
        if( typeof _v == 'string' || typeof _v == 'number' ){
            _r = _v.toString();
        }
        return _r;
    }
    /**
     * js 附加字串函数
     * @method  padChar
     * @param   {string}    _str
     * @param   {intl}      _len
     * @param   {string}    _char
     * @return  string
     * @memberof V#utils
     */
    function padChar( _str, _len, _char ){
        _len  = _len || 2; _char = _char || "0"; 
        _str += '';
        if( _str.length >= _len ) return _str;
        _str = new Array( _len + 1 ).join( _char ) + _str
        return _str.slice( _str.length - _len );
    }
    /**
     * 从字符串解析变量值
     * <br />变量值层级关系以 "." 为分隔
     * <br />根变量必须为 window
     * @method  detectCommand
     * @param   {string}    _cmd
     * @return  string
     * @memberof V#utils
     */
    function detectCommand( _cmd ){
        var _r = _cmd, _tmp, _done;
        
        if( /\./.test( _r ) ){
            _tmp = window;
            _done = true;
            _r = _r.split( '.' );
            $.each( _r, function( _k, _v ){
                if( !_v ){ _done = false; return false; }
                if( !( _tmp = _tmp[ _v ] ) ){ _done = false; return false; }
            });
            _done && _tmp && ( _cmd = _tmp );
        }

        return _cmd;
    }
    /**
     * 格式化日期为 YYYY-m-d 格式
     * <br /><b>require</b>: pad\_char\_f
     * @method  formatDate
     * @param   {date}                  _date       要格式化日期的日期对象
     * @param   {string|undefined}      _split      定义年月日的分隔符, 默认为 '-'
     * @return  string
     * @memberof V#utils
     *
     */
    function formatDate( _date, _split ){
        _date = _date || new Date(); typeof _split == 'undefined' && ( _split = '-' );
        return [ _date.getFullYear(), _date.getMonth() + 1, _date.getDate() ].join(_split);
    }
    /**
     * Determine the mobile operating system.
     * This function either returns 'iOS', 'Android' or 'unknown'
     * @method getMobileOperatingSystem
     * @returns {String}
     * @memberof V#utils
     */
    function getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) )
        {
            return 'iOS';

        }
        else if( userAgent.match( /Android/i ) )
        {

            return 'Android';
        }
        else
        {
            return 'unknown';
        }
    }
     /**
     * 按格式输出字符串
     * @method printf
     * @param   {string}    _str
     * @return  string
     * @memberof V#utils
     * @example
     *      printf( 'asdfasdf{0}sdfasdf{1}', '000', 1111 );
     *      //return asdfasdf000sdfasdf1111
     */
    function printf( _str ){
        for(var i = 1, _len = arguments.length; i < _len; i++){
            _str = _str.replace( new RegExp('\\{'+( i - 1 )+'\\}', 'g'), arguments[i] );
        }
        return _str;
    }
     /**
     * 按格式输出字符串
     * @method printKey
     * @param   {string}    _str
     * @param   {object}    _keys
     * @return  string
     * @memberof V#utils
     * @example
     *      JC.f.printKey( 'asdfasdf{key1}sdfasdf{key2},{0}', { 'key1': '000', 'key2': 1111, '0': 222 );
     *      //return asdfasdf000sdfasdf1111,222
     */
    function printKey( _str, _keys ){
        for( var k in _keys ){
            _str = _str.replace( new RegExp('\\{'+( k )+'\\}', 'g'), _keys[k] );
        }
        return _str;
    }

    /**
     * 取小数点的N位
     * <br />JS 解析 浮点数的时候，经常出现各种不可预知情况，这个函数就是为了解决这个问题
     * @method  parseFinance
     * @param   {number}    _i
     * @param   {int}       _dot  default = 2
     * @return  number
     * @memberof V#utils
     */
    function parseFinance( _i, _dot ){
        _i = parseFloat( _i ) || 0;
        typeof _dot == 'undefined' && ( _dot = 2 );
        _i && ( _i = parseFloat( _i.toFixed( _dot ) ) );
        return _i;
    }
    /**
     *  判断数值是否为十进制 
     * @method  isDecimal
     * @param   {number}    _n
     * @return  Boolean
     * @memberof V#utils
     */
    function isDecimal( _n ){
        var _r = true;
        if( typeof _n == 'string' ){
            _n = _n.trim();
            ( /^(?:[0]{2,}|0x|[0]\d)/i.test( _n ) ) && ( _r = false );
        }
        return _r;
    }
    /**
     *  判断数值是否为金额
     * @method  isMoney
     * @param   {number}    _n
     * @param   {int}    _dot  浮点数长度
     * @return  Boolean
     * @memberof V#utils
     */
    function isMoney( _n, _dot ){
        _n = ( _n || '' ).toString();
        typeof _dot == 'undefined' && ( _dot = 0 );
        var _r = isDecimal( _n );
        _r && _dot && /\./.test( _n ) && ( _n.split( '.' )[1].length > _dot ) && ( _r = false );
        return _r;
    }
    /**
     * 扩展 jquery 选择器
     * <br />扩展起始字符的 '/' 符号为 jquery 父节点选择器
     * <br />扩展起始字符的 '|' 符号为 jquery 子节点选择器
     * <br />扩展起始字符的 '(' 符号为 jquery 父节点查找识别符
     * @method  parentSelector
     * @param   {selector}  _item
     * @param   {String}    _selector
     * @param   {selector}  _finder
     * @return  selector
     * @memberof V#utils
     */
    function parentSelector( _item, _selector, _finder ){
        _item && ( _item = $( _item ) );
        if( /\,/.test( _selector ) ){
            var _multiSelector = [], _tmp;
            _selector = _selector.split(',');
            $.each( _selector, function( _ix, _subSelector ){
                _subSelector = _subSelector.trim();
                _tmp = parentSelector( _item, _subSelector, _finder );
                _tmp && _tmp.length 
                    &&  ( 
                            ( _tmp.each( function(){ _multiSelector.push( $(this) ) } ) )
                        );
            });
            return $( _multiSelector );
        }
        var _pntChildRe = /^([\/]+)/, _childRe = /^([\|]+)/, _pntRe = /^([<\(]+)/;
        if( _pntChildRe.test( _selector ) ){
            _selector = _selector.replace( _pntChildRe, function( $0, $1 ){
                for( var i = 0, j = $1.length; i < j; i++ ){
                    _item = _item.parent();
                }
                _finder = _item;
                return '';
            });
            _selector = _selector.trim();
            return _selector ? _finder.find( _selector ) : _finder;
        }else if( _childRe.test( _selector ) ){
            _selector = _selector.replace( _childRe, function( $0, $1 ){
                for( var i = 1, j = $1.length; i < j; i++ ){
                    _item = _item.parent();
                }
                _finder = _item;
                return '';
            });
            _selector = _selector.trim();
            return _selector ? _finder.find( _selector ) : _finder;
        }else if( _pntRe.test( _selector ) ){
            _selector = _selector.replace( _pntRe, '' ).trim();
            if( _selector ){
                if( /[\s]/.test( _selector ) ){
                    var _r;
                    _selector.replace( /^([^\s]+)([\s\S]+)/, function( $0, $1, $2 ){
                        _r = _item.closest( $1 ).find( $2.trim() );
                    });
                    return _r || _selector;
                }else{
                    return _item.closest( _selector );
                }
            }else{
                return _item.parent();
            }
        }else{
            return _finder ? _finder.find( _selector ) : (window.jQuery || window.Zepto)( _selector );
        }
    }
    /**
     * 把输入值转换为布尔值
     * @method parseBool
     * @param   {*} _in
     * @return bool
     * @memberof V#utils
     */
    function parseBool( _in ){
        if( typeof _in == 'string' ){
            _in = _in.replace( /[\s]/g, '' ).toLowerCase();
            if( _in && ( _in == 'false' 
                            || _in == '0' 
                            || _in == 'null'
                            || _in == 'undefined'
           )) _in = false;
           else if( _in ) _in = true;
        }
        return !!_in;
    }

    return V;
});
