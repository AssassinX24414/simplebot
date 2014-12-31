
require("es6-collections");

var five = require("johnny-five");
var pixel = require("../../lib/pixel.js");


var opts = {};
opts.port = process.argv[2] || "";

var board = new five.Board(opts);
var strip = null;

console.log("Starting");

board.on("ready", function() {

    console.log("Board ready, lets add light");

    strip = new pixel.Strip({
        data: 6,
        length: 4,
        board: this
    });

    var pos = 0;

    var colors = ["red", "green", "blue", "yellow", "cyan", "magenta", "white"];
    var current_color = 0;

    var blinker = setInterval(function() {

        strip.color("#000"); // blanks it out

        if (++pos >= strip.stripLength()) {
            pos = 0;
            if (++current_color>= colors.length) current_color = 0;
        }
        strip.pixel(pos).color(colors[current_color]);

        strip.show();
    }, 1000/2);

});
