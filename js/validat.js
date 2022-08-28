// =======================================Navbra=================================//
const navBar = document.getElementById("navbar");
const contact = document.getElementsByClassName("contact");
const cartImg = document.getElementById("cartImg");
function blackHover() {
    navBar.style.backgroundColor = "black";
    navBar.style.color = "white";
    for (let i = 0; i < contact.length; i++) {
      const element = contact[i];
      element.style.backgroundColor = "black";
      element.style.color = "white";
    }
  
    cartImg.src = "../img/wc.png";
  }
  function whiteHover() {
    navBar.style.backgroundColor = "white";
    navBar.style.color = "black";
    for (let i = 0; i < contact.length; i++) {
      const element = contact[i];
      element.style.backgroundColor = "white";
      element.style.color = "black";
    }
  
    cartImg.src = "../img/shopping-trolley-icon.png";
  }
  navBar.addEventListener("mouseover", blackHover);
  navBar.addEventListener("mouseout", whiteHover);

//   =====================================MAP================================================//
  var center = [30.088183, 31.238918];
  // Create the map
  var map = L.map('map').setView(center, 12);
  
  // Set up the OSM layer
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(map);
  
  
  // Initialise the FeatureGroup to store editable layers
  var editableLayers = new L.FeatureGroup();
  map.addLayer(editableLayers);
  
  // define custom marker
  var MyCustomMarker = L.Icon.extend({
    options: {
      shadowUrl: null,
      iconAnchor: new L.Point(24, 24),
      iconSize: new L.Point(48, 48),
      iconUrl: 'https://i.pinimg.com/originals/0f/61/ba/0f61ba72e0e12ba59d30a50295964871.png' 
    }
  });
  
  var drawPluginOptions = {
    position: 'topright',
    draw: {
      polyline: {
        shapeOptions: {
          color: '#f357a1',
          weight: 10
        }
      },
      polygon: {
        allowIntersection: false, // Restricts shapes to simple polygons
        drawError: {
          color: '#e1e100', // Color the shape will turn when intersects
          message: '<strong>Polygon draw does not allow intersections!<strong> (allowIntersection: false)' // Message that will show when intersect
        },
        shapeOptions: {
          color: '#bada55'
        }
      },
      circle: true, // Turns off this drawing tool
      rectangle: {
        shapeOptions: {
          clickable: false
        }
      },
      marker: {
        icon: new MyCustomMarker()
        
      }
    },
    edit: {
      featureGroup: editableLayers, //REQUIRED!!
      remove: true
    }
  };

  // Initialise the draw control and pass it the FeatureGroup of editable layers
  var drawControl = new L.Control.Draw(drawPluginOptions);
  map.addControl(drawControl);
  
  
  var editableLayers = new L.FeatureGroup();
  map.addLayer(editableLayers);
  
  
  localStorage.clear()
  map.on('draw:created', function(e) {
    var type = e.layerType,
      layer = e.layer;
    if (type === 'marker'|| type==="circle") {
      layer.bindPopup('my location!');
      var latitude=layer.getLatLng().lat;
      var longitude=layer.getLatLng().lng;
      console.log(latitude,longitude);
      localStorage.setItem("latitude",latitude)
      localStorage.setItem("longitude",longitude)
    }else if(type === 'polyline'){
      var data =layer.getLatLngs();
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        var latitude=element.lat
        var longitude=element.lng
        localStorage.setItem(`latitude`+i+"l",latitude)
        localStorage.setItem("longitude"+i+"l",longitude)
      }
    }else if(type === 'polygon'){
        var data =layer.getLatLngs();
        
        for (let i = 0; i < data[0].length; i++) {
          const element = data[0][i];
          var latitude=element.lat
          var longitude=element.lng
          localStorage.setItem(`latitude`+i+"p",latitude)
          localStorage.setItem("longitude"+i+"p",longitude)
        }
      }
    editableLayers.addLayer(layer);
  });

//   ===========================validate==============================//
let errDiv = document.getElementById("errors")

  function notValid(element,con) {
      let ele= document.getElementById(element)
    if (!con && !ele.value ) {
        errDiv.insertAdjacentHTML("beforeend",`<h3 class="danger">${element} is required </h3>`)
    }else{
        switch (element) {
            case "name":
                if (ele.value.length<5) {
                    errDiv.insertAdjacentHTML("beforeend",`<h3 class="danger">${element} is not valid</h3>`)
                }
                break;
            case "email":
                let regex =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                
                    if (!regex.test(ele.value)) {
                        errDiv.insertAdjacentHTML("beforeend",`<h3 class="danger">${element} is not valid</h3>`)
                    }
                    break;
                    
            case "password":
                    if (ele.value.length<9) {
                            errDiv.insertAdjacentHTML("beforeend",`<h3 class="danger">${element} is not valid</h3>`)
                        }
                    break;       
            case "age":
                     if (ele.value<20) {
                            errDiv.insertAdjacentHTML("beforeend",`<h3 class="danger">${element} is not valid age must be +20</h3>`)
                        }
                 break;
            case "typeOfuser":
                ele = document.getElementsByName("typeOfuser")
                     if (!ele[0].checked && !ele[1].checked) {
                            errDiv.insertAdjacentHTML("beforeend",`<h3 class="danger">${element} is not valid you must choose type </h3>`)
                        }
                 break;
            case "location":
                         if (localStorage.length==0) {
                                errDiv.insertAdjacentHTML("beforeend",`<h3 class="danger">${element} is not valid you must choose location </h3>`)
                            }
                     break;
                default:
                break;
        }
    }
  }
document.getElementById("submit").addEventListener("click",(e)=>{
    e.preventDefault() 
    errDiv.innerText=""
    errDiv.style.display="block"
    notValid("name")
    notValid("email")
    notValid("password")
    notValid("age")
    notValid("typeOfuser",1)
    notValid("location",1)
    if (errDiv.childNodes.length==0) {
        errDiv.style.display="none"
        localStorage.setItem("name",document.getElementById("name").value)
        localStorage.setItem("age",document.getElementById("age").value)
        window.open("../Index.html",'_self')
    }
})