var $ = require("./thirdparty/jquery.min.js");
var THREE = require("./thirdparty/three.min.js");
var Dropzone = require("./thirdparty/dropzone.js");
var interact = require("./thirdparty/interact.js");
var signals = require("./thirdparty/signals.min.js");
require("./thirdparty/d3.min.js");

module.exports = window.$ = window.jQuery = $;
module.exports = window.THREE = THREE;
module.exports = window.Dropzone = Dropzone;
module.exports = window.interact = interact;
module.exports = window.signals = signals;