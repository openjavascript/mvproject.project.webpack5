
//require( '../css/_all_include.less' );
require( '../css/index.less' );

window._page_name = 'index';

var API = require( './include/api.js' )
    ;

require( './include/header.js' );

require( './include/_monitor.js' )


var Vue = require('vue')
var App = require('./index/app.vue')

new Vue({
  el: 'body',
  components: {
    app: App
  }
})

