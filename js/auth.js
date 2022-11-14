const auth_div = document.querySelector(".auth_div");
const login_form = document.querySelector(".login_form");
const signup_form = document.querySelector(".signup_form");
const switch_div = document.querySelector(".switch_div");
const back_btn = document.querySelector(".fa-arrow-left");
const heading = document.querySelector(".heading");
const first=document.querySelector(".fs")
const main = document.querySelector("#main");
const url = `https://masai-api-mocker.herokuapp.com`;
let active = true;

switch_div.onclick = () => (active) ? showSignup() : showlogin();
back_btn.onclick = () => (active) ? closeLogin() : showlogin();

login_form.addEventListener("submit", (e) => {
  e.preventDefault();
  let username = e.target[0].value;
  let password = e.target[1].value;
  let obj = { username, password };
  let res = login(obj);
  res
    .then((e) => getProfile(username, e.token))
    .catch(() => {
      heading.textContent = "Username or Password is Invalid !";
      setTimeout(() => {
        heading.textContent = "Fill Your Credentails Carefully !";
      }, 1000);
    });
});

signup_form.addEventListener("submit", (e) => {
  e.preventDefault();
  let username = e.target[0].value;
  let email = e.target[1].value;
  let password = e.target[2].value;
  let mobile = e.target[3].value;
  let name = "";
  let description = "";
  if (validateUsername(username) && validatePassword(password)) {
    let obj = { name, username, email, password, mobile, description };
    signup(obj);
  } else {
    heading.textContent = "Need More secure Fields !";
    setTimeout(() => {
      login_form.reset();
      heading.textContent = "All fields are Mandatory *";
    }, 2000);
  }
});

async function signup(data) {
  let temp = await fetch(`${url}/auth/register`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let res = await temp.json();
  heading.textContent = res.message;
  if (!res.error) {
    setTimeout(() => showlogin(), 1500);
  }
}

async function login(data) {
  let temp = await fetch(`${url}/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await temp.json();
}

async function getProfile(name, token) {
  let temp = await fetch(`${url}/user/${name}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": `application/json`,
    },
  });
  let res = await temp.json();
    localStorage.name = res.username;
    first.textContent = res.username;
    closeLogin();
}

// <<----------- Supportive Funcions ------------->>
function validateUsername(username) {
  let str = `@#!$%^&*()=+[]{ };:'",<.>/?`;
  if (username.length < 4) return false;
  for (let x of str) {
    if (username.includes(x)) {
      return false;
    }
  }
  return true;
}

//--> validate_password
function validatePassword(password) {
  return password.length < 8 ? false : true;
}

function manageAl(x) {
  document.querySelectorAll(".al").forEach((e) => {
    // console.log(e)
    e.style.display = x;
  });
}

function closeLogin() {
  auth_div.style = "";
  main.style = "";
  (first.textContent=='Login')? manageAl('none'): manageAl('block');
}

function showSignup() {
  heading.textContent = "All fields are Mandatory*";
  login_form.style.display = "none";
  signup_form.style.display = "block";
  switch_div.innerHTML = `Already have an account ? <span class="highlight">Login</span>`;
  login_form.reset();
  active = false;
}

function showlogin() {
  heading.textContent = "Fill Your Credentails Carefully !";
  login_form.style = "";
  signup_form.style = "";
  switch_div.innerHTML = `Don't have an account ? <span class="highlight">Create a New one</span>`;
  signup_form.reset();
  active = true;
}
