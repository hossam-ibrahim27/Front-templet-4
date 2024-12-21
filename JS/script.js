// **********************Define-Variable***********************
let ShowProductVar = document.getElementById("drawProductInBom");
let badge = document.querySelector(".badge");
let cartDivLength = document.querySelectorAll("#cartDiv li");
let products = productsfromback;

// ********************2)section-Draw-product**********
// 1) display product:
let drawProductInBom;
(drawProductInBom = function (products = []) {
    let drawProductInBom = products.map((item) => {
        return (`
        <div class="col">
            <div class="card">
                <img height="300px" src="${item.imgUrl}" class="card-img-top" alt="${item.name}"/>
                <div class="card-body">
                <h5 class="card-title">${item.id + 1}. ${item.name}</h5>
                    <h5 class="card-title text-warning"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></h5>
                <a onclick="saveProductDetails(${item.id})" href="cartDetails.html" class="text-decoration-none moreDetails fw-bold">See more Details</a>
                <h5 class="card-text">US $${item.price}</h5>
                <p class="card-text"><del class="text-danger">List price US $${item.discPrice}</del></p>
                    <div class="d-flex justify-content-between">
                <button id="addtoCartButton" onclick="addToCart(${item.id} , this)" type="button"  
                class="btn btn-primary">
                    <i class="fa-solid fa-cart-plus me-1 fs-5"></i> 
                    <span>Add To Cart</span>
                </button>
                <span role="button" tabindex="0">
                <i class="far fa-heart text-primary ${item.loved === true ? "fas fa-heart text-danger" : ""}"onclick="addTOFavourite(${item.id})"></i>
                </span>
            </div>
            </div> <!-- /card-body -->
            </div> <!-- /card -->
        </div>  <!-- /col -->     
        `)
    }).join("");
    ShowProductVar.innerHTML = drawProductInBom;
})(JSON.parse(localStorage.getItem("productsDetails")) || products);
// **************************3)Section-AddProductToCart*****************************
// 3.a: when press buttona(dd to cart) product (dd to cart).
// 3.b:solve problem whene choose protuct delte products from localstoreg:use array addedItem.
// 3.c:solve problem whene reload padge delte products which choosen:use check(temy operator)then use if.
// **********3.1) Add to cart from add to cart:***********************
// 3.b && 3.c check is this item in local storge or no
let addedItem = (localStorage.getItem("productChoosenCart")) ?
    JSON.parse(localStorage.getItem("productChoosenCart")) : [];

if (addedItem) {
    addedItem.map((item) => {
        document.querySelector("#cartDiv div").innerHTML += `
        <li class="list-group-item list-group-item-light d-flex justify-content-between align-items-center">
            <div class="ms-2 me-auto d-flex justify-content-between align-items-center">
                <img width="60px" height="60px" src="${item.imgUrl}" class="rounded-circle" alt="${item.name}">
                <div class="text-center">
                    <div class="fw-bold">${item.name}</div> <!-- /suptitle -->
                    <div>Number of pieces : ${item.quantity}</div> <!-- /suptitle -->
                    <div>Price of pieces :${item.price * item.quantity} $</div> <!-- /subtitle -->
                </div>
            </div>
            <div>
                <span  class="badge bg-primary rounded-pill">${item.id}</span>
                <span  onclick="addToCartbyplus(${item.id})" class="btn text-success plus"><i class="fas fa-plus"></i></span>
                <span onclick="removefromcartpagebyminus(${item.id})" class="btn text-danger"><i class="fas fa-trash-alt"></i></span>
            </div>
        </li>`;
    });
    let cartDivLength = document.querySelectorAll("#cartDiv li");
    badge.style.display = "block";
    badge.innerHTML = cartDivLength.length;
}

// 3.a: added to cart.
function addToCart(id, elemnt) {
    if (localStorage.getItem("eamil")) {
        // 2.a) whene press add to cart button : add product to cart and add to localstorge
        let product = products.find((item) => item.id === id);
        let isItemInCart = addedItem.some((item) => item.id === product.id);
        if (isItemInCart) {
            addedItem = addedItem.map((p) => {
                if (p.id === product.id) {
                    // p.prim = 0;
                    alert("This Product Aleardy in Cart")
                    p.quantity = 1;
                }
                return (p);
            })
        } else {
            addedItem.push(product);
            elemnt.outerHTML = `
            <button id="redbutton" onclick="retur(${id},this)" type="button" class="btn btn-danger">
                        <i class="fa-solid fa-cart-plus text-white me-1 fs-5"></i> 
                        <span>Remove From Cart</span>
                    </button>
            `
        }
        document.querySelector("#cartDiv div").innerHTML = "";
        addedItem.forEach((item) => {
            document.querySelector("#cartDiv div").innerHTML += `
        <li class="list-group-item list-group-item-light d-flex justify-content-between align-items-center">
            <div class="ms-2 me-auto d-flex justify-content-between align-items-center">
                <img width="60px" height="60px" src="${item.imgUrl}" class="rounded-circle" alt="${item.name}">
                <div class="text-center">
                    <div class="fw-bold">${item.name}</div> <!-- /suptitle -->
                    <div>Number of pieces : ${item.quantity}</div> <!-- /suptitle -->
                    <div>Number of pieces :${item.price * item.quantity} $</div> <!-- /subtitle -->
                </div>
            </div>
            <div>
                <span  class="badge bg-primary rounded-pill">${item.id}</span>
                <span  onclick="addToCartbyplus(${item.id})" class="btn text-success plus"><i class="fas fa-plus"></i></span>
                <span onclick="removefromcartpagebyminus(${item.id})" class="btn text-danger"><i class="fas fa-trash-alt"></i></span>
            </div>
        </li>`;
        });
        let cartDivLength = document.querySelectorAll("#cartDiv li");
        badge.style.display = "block";
        badge.innerHTML = cartDivLength.length;
        // solve problem 2.b : 
        window.localStorage.setItem("productChoosenCart", JSON.stringify(addedItem));
    }
    else {
        window.location = "login.html";
    }
}

function counterArray(arr, filterid) {
    let counter = arr.map((item) => item[filterid]).map((item, i, z) => z.indexOf(item) === i && i).filter((item) => arr[item]).map((item) => arr[item]);
    return (counter);
}
// ********************4)close,open Cart**********************************************
let cartIcon = document.querySelector("#cartIcon");
let cartContainer = document.querySelector("#cartContainer");
let cheakcartContainer = document.querySelector("#cartDiv div");
let arrowCart = document.querySelector("#arrowCart");

cartIcon.addEventListener("click", opencart);
function opencart() {
    if (cheakcartContainer.innerHTML != "") {
        if (cartContainer.style.display == "block") {
            cartContainer.style.display = "none";
            arrowCart.innerHTML = `<i class="fas fa-sort-down"></i>`
        } else {
            cartContainer.style.display = "block";
            arrowCart.innerHTML = `<i class="fas fa-sort-up"></i>`
        }
    }
}
// ***********************5)Section-Product-Details*************
function saveProductDetails(id) {
    localStorage.setItem("productDetailsid", id);
    window.location = "cartDetails.html";
}
// *********************6)search**************************************************
// 6.a:Search by name make me get name from local storge***
// 6.a:Search by price make me get price from local storge***
// ************************خلي بالك ينفسي ركزي معايا
//     // search(i.target.value, JSON.parse(localStorage.getItem("productsDetails")));
// اوعا تستخدم ديه ف السيرش لانك لو مش مسجل دخول م هيعرف يعمل بحث لان مفيش بيانات ف اللوكال استوريج فخليه يبحث ف اللي جاي من الداتا بيز وليس من اللوكال استوريج

let inputSearch = document.getElementById("searchInput");
let optionsearch = document.getElementById("optionsearch");
let moodSerch = "name";

optionsearch.addEventListener("change", function () {
    if (optionsearch.selectedIndex === 1) {
        moodSerch = "price";
    } else {
        moodSerch = "name";
    }
    drawProductInBom(products);
});


inputSearch.addEventListener("keyup", function (i) {
    search(i.target.value, products);
    if (i.target.value.trim() === "") {
        drawProductInBom(products);
    }
});

function search(title, myArray) {
    let array;
    if (moodSerch === "name") {
        array = myArray.filter((item) => item.name.toLowerCase().indexOf(title.toLowerCase()) !== -1);
    } else if (moodSerch === "price") {
        array = myArray.filter((item) => item.price.toString().indexOf(title) !== -1);
    }
    drawProductInBom(array);
}

// *************************7)AddToFavourit************************************************
let addItem2 = (localStorage.getItem("productFavourit"))
    ? JSON.parse(localStorage.getItem("productFavourit"))
    : [];
function addTOFavourite(id) {
    if (localStorage.getItem("eamil")) {
        let productFavorite = products.find((item) => item.id === id);

        let hasSelected = addItem2.some((item) => item.id === productFavorite.id);

        if (hasSelected) {
            addItem2 = addItem2.filter((item) => item.id !== productFavorite.id);

            window.localStorage.setItem("productFavourit", JSON.stringify(addItem2));
            products = products.map((item) => {
                if (item.id === productFavorite.id) {
                    item.loved = 0;
                }
                return item;
            });
            // خلي بالك يحسام هتضرب معاك ايرورور لو انت م مسجل قبل كدا وحاولت تبحث قبل مضيف للمفضله لو عملت سيت لل(productdetail)
            window.localStorage.setItem("productFavourit", JSON.stringify(products));
            drawProductInBom(products);
        } else {
            productFavorite.quantity = 1;
            productFavorite.loved = true;
            addItem2.push(productFavorite);
            window.localStorage.setItem("productFavourit", JSON.stringify(addItem2));
            products = products.map((item) => {
                if (item.id === productFavorite.id) {
                    item.loved = true;
                }
                return item;
            });
            window.localStorage.setItem("productsDetails", JSON.stringify(products));
            drawProductInBom(products);
        }
    } else {
        window.location = "login.html";
    }
}
// **************8)removefromcartbyminus**************
function removefromcartpagebyminus(id) {
    let addedItem5 = JSON.parse(localStorage.getItem("productChoosenCart")) || [];
    addedItem5.splice(addedItem5.findIndex(item => item.id === id), 1);
    localStorage.setItem("productChoosenCart", JSON.stringify(addedItem5));
    drawCart(addedItem5);
    document.getElementById("redbutton").outerHTML = `
    <button  onclick="addTOFavouritegreen(${id},this)" type="button"  
            class="btn btn-primary">
                <i class="fa-solid fa-cart-plus me-1 fs-5"></i> 
                <span>Add To Cart</span>
            </button>
            `

}
function drawCart(addedItem5) {
    let cartDiv = document.querySelector("#cartDiv div");
    cartDiv.innerHTML = '';
    addedItem5.forEach((item) => {
        cartDiv.innerHTML += `
            <li class="list-group-item list-group-item-light d-flex justify-content-between align-items-center">
                <div class="ms-2 me-auto d-flex justify-content-between align-items-center">
                    <img width="60px" height="60px" src="${item.imgUrl}" class="rounded-circle" alt="${item.name}">
                    <div class="text-center">
                        <div class="fw-bold">${item.name}</div>
                        <div>Number of pieces : ${item.quantity}</div>
                        <div>Total Price : ${item.price * item.quantity} $</div>
                    </div>
                </div>
                <div>
                    <span  class="badge bg-primary rounded-pill">${item.id}</span>
                    <span  onclick="addToCart(${item.id})" class="btn text-success plus"><i class="fas fa-plus"></i></span>
                    <span onclick="removefromcartpagebyminus(${item.id})" class="btn text-danger"><i class="fas fa-trash-alt"></i></span>
                </div>
            </li>`;
    });

}
// *******************9)addtocartbyplus***********
// 3.b && 3.c check is this item in local storge or no
let addedItemplus = (localStorage.getItem("productChoosenCart")) ?
    JSON.parse(localStorage.getItem("productChoosenCart")) : [];

if (addedItemplus) {
    addedItemplus.map((item) => {
        document.querySelector("#cartDiv div").innerHTML += `
            <li class="list-group-item list-group-item-light d-flex justify-content-between align-items-center">
                <div class="ms-2 me-auto d-flex justify-content-between align-items-center">
                    <img width="60px" height="60px" src="${item.imgUrl}" class="rounded-circle" alt="${item.name}">
                    <div class="text-center">
                        <div class="fw-bold">${item.name}</div> <!-- /suptitle -->
                        <span>${item.price} $</span> <!-- /subtitle -->
                    </div>
                </div>
                <div>
                    <span  class="badge bg-primary rounded-pill">${item.id}</span>
                    <span onclick="addToCart(${item.id})" class="btn text-success plus"><i class="fas fa-plus"></i></span>
                    <span  class="btn text-danger"><i class="fas fa-trash-alt"></i></span>
                </div>
            </li>`;
    });
    let cartDivLength = document.querySelectorAll("#cartDiv li");
    badge.style.display = "block";
    badge.innerHTML = cartDivLength.length;
}

// 3.a: added to cart.
function addToCartbyplus(id) {
    if (localStorage.getItem("eamil")) {
        // 2.a) whene press add to cart button : add product to cart and add to localstorge
        let product = products.find((item) => item.id === id);

        let isItemInCart = addedItemplus.some((item) => item.id === product.id);

        if (isItemInCart) {
            addedItemplus = addedItemplus.map((p) => {
                if (p.id === product.id)
                    p.quantity += 1;
                return (p);
            })
        } else {
            addedItemplus.push(product);
        }
        document.querySelector("#cartDiv div").innerHTML = "";
        addedItem.forEach((item) => {
            document.querySelector("#cartDiv div").innerHTML += `
        <li class="list-group-item list-group-item-light d-flex justify-content-between align-items-center">
            <div class="ms-2 me-auto d-flex justify-content-between align-items-center">
                <img width="60px" height="60px" src="${item.imgUrl}" class="rounded-circle" alt="${item.name}">
                <div class="text-center">
                    <div class="fw-bold">${item.name}</div> <!-- /suptitle -->
                    <div>Number of pieces : ${item.quantity}</div> <!-- /suptitle -->
                    <div>Number of pieces :${item.price * item.quantity} $</div> <!-- /subtitle -->
                </div>
            </div>
            <div>
                <span  class="badge bg-primary rounded-pill">${item.id}</span>
                <span  onclick="addToCartbyplus(${item.id})" class="btn text-success plus"><i class="fas fa-plus"></i></span>
                <span onclick="removefromcartpagebyminus(${item.id})" class="btn text-danger"><i class="fas fa-trash-alt"></i></span>
            </div>
        </li>`;
        });
        let cartDivLength = document.querySelectorAll("#cartDiv li");
        badge.style.display = "block";
        badge.innerHTML = cartDivLength.length;
        // solve problem 2.b : 
        window.localStorage.setItem("productChoosenCart", JSON.stringify(addedItemplus));
    }
    else {
        window.location = "register.html";
    }
}
function counterArray(arr, filterid) {
    let counter = arr.map((item) => item[filterid]).map((item, i, z) => z.indexOf(item) === i && i).filter((item) => arr[item]).map((item) => arr[item]);
    return (counter);
}