// import _ from 'lodash'
 import $ from 'jquery'
var Carousel = require('./app/carousel')
var GoTop = require('./app/gotop')
var WaterFall = require('./app/waterfall')
var Exposure = require('./app/exposure')

Carousel.init($('.carousel'))
WaterFall($('#pic-ct'))
Exposure($('#about li'))
new GoTop