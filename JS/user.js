// ***********************1)register***************
let homeLogin = document.querySelector("#home-login");
let homeRegister = document.querySelector("#home-register");
let afterRegisterNav = document.querySelector(".afterRegister-nav");
let userAfterReg = document.querySelector("#userafterreg");
let logout = document.querySelector("#log-out");
let firstNav = document.querySelector("#firstNav");

let getUserName =
    (localStorage.getItem("fristName") + " " + localStorage.getItem("lastName"));

if (localStorage.getItem("fristName") !== null) {
    homeLogin.style.display = "none";
    homeRegister.style.display = "none";
    afterRegisterNav.style.display = "flex";
    firstNav.style.display = "flex";
    userAfterReg.innerHTML = getUserName;
    logout.addEventListener("click", function () {
        localStorage.clear();
        setTimeout(() => {
            window.location = "login.html";
        }, 1500)
    });
    console.log("data exist");
}
if (localStorage.getItem("fristName") == null) {
    afterRegisterNav.style.display = "none";
    firstNav.style.display = "none";
    homeLogin.style.display = "flex";
    homeRegister.style.display = "flex";
    console.log("data clean");
}
