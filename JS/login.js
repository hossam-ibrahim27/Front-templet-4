let userUserName = document.querySelector("#validationCustom01");
let userEmail = document.querySelector("#validationCustom02");
let userPasowred = document.querySelector("#inputPassword3");
let loginSubmit = document.querySelector("#login-submit");

let getUserName = localStorage.getItem("userName");
let getEmail = localStorage.getItem("eamil");
let getPasowred = localStorage.getItem("passwored");

loginSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  if (localStorage.getItem("userName") || localStorage.getItem("eamil") || localStorage.getItem("passwored")) {
    if (
      userUserName.value === "" ||
      userEmail.value === "" ||
      userPasowred.value === ""
    ) {
      alert("Please Fill Fields With Data");
    } else {
      if (
        getUserName &&
        getUserName.trim() === userUserName.value.trim() &&
        getEmail &&
        getEmail.trim() === userEmail.value.trim() &&
        getPasowred &&
        getPasowred.trim() === userPasowred.value.trim()
      ) {
        setTimeout(() => {
          window.location = "index.html";
        }, 1000);
      } else {
        alert("Please Fill Fields With Correct Data");
      }
    }
  }
  else {
    alert("You Haven't An Account And You Can't Login  Before Creat An Account.");
  }

});
