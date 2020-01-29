//load our custom elements
require("component-leaflet-map");
require("component-responsive-frame");

//get access to Leaflet and the map
var element = document.querySelector("leaflet-map");
var L = element.leaflet;
var map = element.map;

var data = require("./diversity-index.geo.json");
var geojson;

var getColor = function(d) {
	if (d > 0 && d <= 37.2) { return "#f0f9e8"; }
	else if (d > 37.2 && d <= 49.4) { return "#bae4bc"; }
	else if (d > 49.4 && d <= 59.2) { return "#7bccc4"; }
	else if (d > 59.2 && d <= 68.9) { return "#43a2ca"; }
	else if (d > 68.9) { return "#0868ac"; }
	else { return "#cccccc"; }
};

var style = function(feature) {
  var s = {
    fillColor: getColor(feature.properties["diversity-index-by-census-tract_DIVERSITY INDEX 2018"]),
    weight: 1,
    opacity: .2,
    color: '#000',
    fillOpacity: 0.7
  };
  return s;
}

var highlightFeature = function(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 1,
    opacity: 0.9,
    color: '#222',
    dashArray: '',
    fillOpacity: 1
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
}

var resetHighlight = function(e) {
  geojson.resetStyle(e.target);
}

var onEachFeature = function(feature, layer) {
	var census_tract = feature.properties["NAMELSAD"],
	diversity_index = feature.properties["diversity-index-by-census-tract_DIVERSITY INDEX 2018"];

	var popupContent = `<div class="popup">
			<p class="popup__text"><strong>` + census_tract + `</strong></p>
			<p class="popup__text">Diversity index: ` + diversity_index + `</p>
		</div>`
	layer.bindPopup(popupContent);
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight
  });
}

geojson = L.geoJson(data, {
  style: style,
  onEachFeature: onEachFeature
}).addTo(map);

map.scrollWheelZoom.disable();