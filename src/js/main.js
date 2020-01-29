//load our custom elements
require("component-leaflet-map");
require("component-responsive-frame");

//get access to Leaflet and the map
var element = document.querySelector("leaflet-map");
var L = element.leaflet;
var map = element.map;

var data = require("./diversity-index.geo.json");

var get_color = function(d) {
	if (d > 0 && d <= 37.2) { return "#f0f9e8"; }
	else if (d > 37.2 && d <= 49.4) { return "#bae4bc"; }
	else if (d > 49.4 && d <= 59.2) { return "#7bccc4"; }
	else if (d > 59.2 && d <= 68.9) { return "#43a2ca"; }
	else if (d > 68.9) { return "#0868ac"; }
	else { return "#cccccc"; }
};

var style = function(feature) {
  var s = {
    fillColor: get_color(feature.properties["diversity-index-by-census-tract_DIVERSITY INDEX 2018"]),
    weight: 1,
    opacity: .3,
    color: '#000',
    fillOpacity: 0.45
  };
  return s;
}

L.geoJson(data, {
  style: style
}).addTo(map);

map.scrollWheelZoom.disable();