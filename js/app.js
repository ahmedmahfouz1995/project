// ================================== variable decleration ===========================//
const navBar = document.getElementById("navbar");
const contact = document.getElementsByClassName("contact");
const cartImg = document.getElementById("cartImg");
const mainH = document.getElementById("mainH");
const spinIcon = document.getElementsByName("spin");
let count = 1;
var favourites = [];
// ===============================navbar============================================//
// ===============================hover===========================================//
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



// ==============================================change text of the main intro h1=======================
flcArr = [
  "Owning a home is a keystone of wealth… both financial affluence and emotional security",
  "The house you looked at today and wanted to think about until tomorrow may be the same house someone looked at yesterday and will buy today",
  "Real estate cannot be lost or stolen, nor can it be carried away. Purchased with common sense, paid for in full, and managed with reasonable care, it is about the safest investment in the world.",
  "The problem with real estate is that it’s local. You have to understand the local market.",
  "I will forever believe that buying a home is a great investment. Why? Because you can’t live in a stock certificate. You can’t live in a mutual fund",
  "Don’t wait to buy real estate. Buy real estate and wait.",
  "A man travels the world over in search of what he needs and returns home to find it",
  "It’s not about the money, though that’s nice to have. At the end of the day, it’s really about matching the right buyer to the right seller. We’re matchmakers—real estate matchmakers",
  "Real Estate provides the highest returns, the greatest values, and the least risk.",
  "Home is the nicest word there is",
];
// =========================IMAGE SWIP=========================================
function swip() {
  let myImage = document.getElementById("introImage");
  let ImageSrc = `../img/${count}.jpg`;
  let ImageOSrc = `../img/1.jpg`;
  mainH.innerText = flcArr[Math.ceil(Math.random() * 10)] || flcArr[0];

  if (count < 8) {
    count++;
    myImage.setAttribute("src", ImageSrc);
  } else {
    myImage.setAttribute("src", ImageOSrc);
    count = 2;
  }
}
setInterval(swip, 5000);
// ========================================= Slider =========================================================//
let sliderDiv = document.getElementsByClassName("sliderDiv")
let slideArray= []
for (let i = 0; i < sliderDiv.length; i++) {
  slideArray.push(sliderDiv.item(i));
} 
function slide() {
  var myinterval = setInterval(() => {
    slideArray.forEach((element)=>{
      let eleLeft= element.offsetLeft
      element.style.left =eleLeft-400+"px" 
      if (parseInt(element.style.left)<-100) {   
          element.style.left =2300+"px"  
      } 
    })
  }, 3000);
  let slidbtnleft =document.getElementById('slidbtnleft')
let slidbtnright =document.getElementById('slidbtnright')
slidbtnleft.addEventListener("click",()=>{
  resume.style.display="block"
  clearInterval(myinterval)
  slideArray.forEach((element)=>{
    let eleLeft= element.offsetLeft
    element.style.left =eleLeft-400+"px" 
    if (parseInt(element.style.left)<-100) {
      element.style.left =2300+"px"
  } 
  })
});
slidbtnright.addEventListener("click",()=>{
  resume.style.display="block"
  clearInterval(myinterval)
  slideArray.forEach((element)=>{
    let eleRight= element.offsetLeft
    element.style.left =eleRight+400+"px" 
    if (parseInt(element.style.left)>2310) {
      element.style.left =-100+"px"    
  } 
})
});
return myinterval
}
slide()
let resume=document.getElementById("resume")
resume.addEventListener("click",(e)=>{
e.preventDefault()
slide()
resume.style.display="none"
})





// =========================================== Prouducts Cart =======================================================//
function cartIconfn() {
  let cart = document.getElementById("cart");
  let carticon = document.getElementById("carticon");
  let cartnum = document.getElementById("notinum");
  let cartImg = document.getElementById("cartImg");
  if (favourites.length > 0) {
    carticon.style.display = "block";
    cart.style.display = "block";
    cartnum.style.display = "inline-block";
    cartnum.innerText = favourites.length||0;
    cartImg.src = "../img/4187198.png";
    cartImg.classList.add("cartSpecial");
    navBar.addEventListener("mouseover", () => {
      cartImg.src = "../img/cartcementwhite.png";
    });
    navBar.addEventListener("mouseout", () => {
      cartImg.src = "../img/4187198.png";
    });
  } else {
    navBar.addEventListener("mouseover", () => {
      cartImg.src = "../img/wc.png";
    });
    navBar.addEventListener("mouseout", () => {
      cartImg.src = "../img/shopping-trolley-icon.png";
    });
    carticon.style.display = "none";
    cartImg.src = "../img/shopping-trolley-icon.png";
  }
}
// ===============DRAW FAVOURITE PRODUCTS THE FUNCTION CALLING IS IN HTML BUTTON ===========
const proudct = document.getElementById("proudct");
const xhr = new XMLHttpRequest();
const fd = document.getElementById("fl");
function fav(element) {
    const clear = document.getElementById("clear");
    clear.classList.add("dplay");
  let btn = element.previousElementSibling;
  btn.classList.toggle("red");

  if (btn.classList.contains("red")) {
    favourites.push(parseInt(btn.id));
    console.log(favourites);
  } else {
    for (let i = 0; i < favourites.length; i++) {
      if (favourites[i] == btn.id) {
        favourites.splice(i, 1);
      }
    }
  }
  if (favourites.length==0) {
    clear.classList.remove("dplay")
  }
// =============================================CLEAR favourite BUTTON =============================
//  TOTALLY WORKING
cartIconfn();
clear.addEventListener("click",()=>{
    clear.classList.remove("dplay")
    favourites=[]
    btn.classList.remove("red");
    let carticon = document.getElementById("carticon");
    let cartnum = document.getElementById("notinum");
    let cartImg = document.getElementById("cartImg");
    let sidebar = document.getElementById("sidebar");
    carticon.style.display="none"
    cartnum.style.display="none"
    cartImg.src="../img/shopping-trolley-icon.png"
    sidebar.innerHTML=""
    sidebar.classList.remove("dplay")
    cartIconfn();
    } 
    )
}

// =============================================DRAW FUNCTION=======================================
function draw(dataArr) {
  proudct.innerHTML = "";
  dataArr.forEach((element) => {
    proudct.insertAdjacentHTML(
      "beforeend",
      ` <div class="card">
            <button id="${element.ID-1}" class="add" ><h3><i class="fa-solid fa-heart"></i></h3></button>
            <img src="../img/apart/${Math.ceil(
              Math.random() * 10
            )}.jpg" class="card-image" alt="image"  onclick="fav(this)" >
            <h1 class="owner"> ${element["Doctor name"]}</h1>
            <p class="cardDesc">
            ${element.Address}
            </p>
            <div class="card-foot">
            <a href="../views/map.html" class="location" value= "${element.Latitude} / ${
        element.Longitude
      }" onclick="locationGeter(this)" ><i class="fa-solid fa-location-crosshairs"></i></a> 
                <p class="pnum">${element.Contact_number}</p>
                </div>
                <h4 class="price"> price : ${
                  Math.ceil(Math.random() * 10) * 1000000
                }</h4>
                <h4 class="price"> &star; &star; &star; &star; &star;</h4>
        </div>`
    );
  });
}

// ====================================GET DATA=============================================
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4) {
    if (xhr.status == 200) {
      const data = JSON.parse(xhr.response);
      let dataArr = data["SampleSaveLocation (1)"];
// ====================================DRAW PROUDCTS ==========================================
      draw(dataArr);
      fd.addEventListener("change", () => {
        if (fd.value == "all") {
          draw(dataArr);
        } else {
          let filterdata = dataArr.filter((element) => {
            return element.Brick == fd.value;
          });
          draw(filterdata);
        }
      });
// ================================================SIDE BAR===================================
      const carticon = document.getElementById("carticon");
      const SideBar = document.getElementById("sidebar");
      carticon.addEventListener("click", () => {
          SideBar.innerHTML = "";
          SideBar.innerText = "";
          SideBar.classList.toggle("dplay");
          var SideBarData = [];
          for (let i = 0; i < favourites.length; i++) {
          const element = favourites[i];
          SideBarData.push(dataArr[element]);
        }
        for (let i = 0; i < SideBarData.length; i++) {
          SideBar.insertAdjacentHTML(
            "beforeend",
            `<div class="favcontainer">
                    <div class="favImg">
                        <img src="./img/apart/${Math.ceil(
                          Math.random() * 10
                        )}.jpg" alt="image">
                    </div>
                    <div class="favDesc">
                    <h3> ${SideBarData[i]["Doctor name"]}</h3>
                    <p> ${SideBarData[i].Brick}</p>
                    <p> ${SideBarData[i].Contact_number}</p>
                    </div>
                    </div>`
          );
        }

      });
    }
  }

};
xhr.open("GET", "../db/data.json");
xhr.send("");


// ==================== location ======================//
function locationGeter(ele){
 
  let locArray=ele.getAttribute("value").split("/");
  let Latitude = locArray[0]
  let Longitude = locArray[1]
  console.log(Longitude,Latitude);
  localStorage.setItem("newlat",Latitude)
  localStorage.setItem("newlng",Longitude)
}