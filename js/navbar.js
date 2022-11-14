import { homepage } from "../assets/methods.js";

const user_div = document.querySelector(".user_div");
const user_info = document.querySelector(".user_info");
const menu_icon = document.querySelector(".fa-bars");
const first_span = document.querySelector(".fs");
const logout = document.querySelector(".logout");
const close_btn = document.querySelector(".fa-xmark");
let list_opend=false;
first_span.textContent = localStorage.getItem("name") || "Login";
document.querySelector('.logo_div').onclick=()=>homepage();
document.querySelector('.home_btn').onclick=()=>homepage();

const close_contact=document.querySelector('.fa-arrow-left-long');
const contact_btn=document.querySelector('.contact_btn');
const contact_div=document.querySelector('.contact_div');
contact_btn.onclick=()=>{
  contact_div.style.display='grid';
}
close_contact.onclick=()=>{
  contact_div.style='';
  
}

if(first_span.textContent!='Login'){
  manageAl('block');
}
menu_icon.addEventListener("mouseenter", () => {
  user_info.style.display = "flex";
  list_opend=true;
});
user_info.addEventListener("mouseleave", () => {
  user_info.style = "";
  list_opend=false;
});

first_span.onclick = () => {
  if (first_span.textContent == "Login") {
    auth_div.style.display = "flex";
    main.style.filter = "brightness(50%)";
  }
};

logout.onclick = () => {
  localStorage.removeItem("name");
  manageAl("none");
  active = false;
  first_span.textContent = "Login";
};
close_btn.onclick=()=>{
  user_info.style='';
}

document.querySelector('.g').onclick=function(){
  location.href="https://github.com/Sandeep-morya";
}
document.querySelector('.l').onclick=function(){
  location.href="https://www.linkedin.com/in/sandeep-morya-7896ba111/";
}
document.querySelector('.f').onclick=function(){
  location.href="https://www.facebook.com/Sandeepmaurya13";
}
document.querySelector('.i').onclick=function(){
  location.href="https://www.instagram.com/13_sandeep_maurya/";
}
document.querySelector('.w').onclick=function(){
  location.href="https://wa.me/9988885304";
}
document.querySelector('.t').onclick=function(){
  location.href="https://t.me/Sandeep_Maurya";
}