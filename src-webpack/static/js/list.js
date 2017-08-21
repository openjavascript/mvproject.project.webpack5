
require( '../css/_all_include.less' );
require( '../css/_pagination.less' );
require( '../css/list.less' );

window._page_name = 'list';

var API = require( './include/api.js' )
    ;

require( './include/header.js' );
require( '../../../thirdparty/jquery.tmpl.js' );

var _pagination =  $( '#tmpl_pagination' ).tmpl( { totalNum: 999, pageRows: 10, curPage: 5, firstPage: 1 } );
$( '#js_pagination' ).html( _pagination );

require( './include/_monitor.js' );


