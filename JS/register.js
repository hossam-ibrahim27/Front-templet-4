//   *********************************************2) check user data*************************

let userFrName = document.querySelector("#validationCustom01");
let userLsName = document.querySelector("#validationCustom02");
let userUserName = document.querySelector("#validationCustom03");
let userEmail = document.querySelector("#validationCustom04");
let userPasowred = document.querySelector("#inputPassword5");
let userRetPasowred = document.querySelector("#inputPassword6");
let registerSubmit = document.querySelector("#regster-subm");

registerSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    userFrName.value === "" ||
    userLsName.value === "" ||
    userUserName.value === "" ||
    userEmail.value === "" ||
    userPasowred.userRetPasowred === ""
  ) {
    // modal.style.display = "block";
    alert(
      "Please Fill Fields"
    );
  } else if (userPasowred.value !== userRetPasowred.value) {
    alert(
      "You input Wrong Return Passowrd , Please Return Passowerd again Correct"
    );
  } else {
    localStorage.setItem("fristName", userFrName.value);
    localStorage.setItem("lastName", userLsName.value);
    localStorage.setItem("userName", userUserName.value);
    localStorage.setItem("eamil", userEmail.value);
    localStorage.setItem("passwored", userPasowred.value);
    localStorage.setItem("returnPassowerd", userRetPasowred.value);

    setTimeout(() => {
      window.location = "login.html";
    }, 1000);
  }
});