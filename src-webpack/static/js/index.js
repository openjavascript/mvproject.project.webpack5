
require( '../css/_all_include.less' );
require( '../css/index.less' );

var Vue = require( 'vue' );
var vt = require( './index/index.vue' );
/*
*/

window._page_name = 'index';

var API = require( './include/api.js' )
    ;

require( './include/header.js' );

require( './include/_monitor.js' );

console.log( 'test' );

/*
new Vue( { 
    el: 'body'
    , components: vt
   });
*/
