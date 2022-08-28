var myMap = document.getElementById("map")
myMap.style.width="1200px"
myMap.style.height="400px"
myMap.style.margin="40px 50px"
var center = [30.088183, 31.238918];
// Create the map 
var map = L.map('map').setView(center, 12);
var marker = new L.Marker([localStorage.getItem("latitude"),localStorage.getItem("longitude")]);
marker.bindPopup("<h3>This is your location </h3>").openPopup();
marker.addTo(map)
var myIcon = L.icon({
  iconUrl: 'https://images-na.ssl-images-amazon.com/images/I/413Wxa2ALML.png',
  iconSize: [50,50],
  iconAnchor: [25, 25],
  popupAnchor: [-3, -7],
});
var marker2 = new L.Marker([localStorage.getItem("newlat"),localStorage.getItem("newlng")],{icon: myIcon});
marker2.bindPopup("<h3> This is your selected building location </h3>").openPopup();
marker2.addTo(map)
var latlngs = [
 [localStorage.getItem("latitude"),localStorage.getItem("longitude")],
  [localStorage.getItem("newlat"),localStorage.getItem("newlng")],
];

var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);

// zoom the map to the polyline
map.fitBounds(polyline.getBounds());

// Set up the OSM layer
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18
  }).addTo(map);
  var MyCustomMarker = L.Icon.extend({
    options: {
      shadowUrl: null,
      iconAnchor: new L.Point(24, 24),
      iconSize: new L.Point(48, 48),
      iconUrl: 'https://i.pinimg.com/originals/0f/61/ba/0f61ba72e0e12ba59d30a50295964871.png' 
    }
  });
  document.getElementById("lastHtag").innerText=`hello ${localStorage.getItem("name")} you Know what Age ${localStorage.getItem("age")} is the right age to start investing in real state `