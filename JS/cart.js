let showPriceVar = document.getElementById("ShowCartPrice");
let ShowPriceFavourite = document.getElementById("ShowfavouritPrice");
// ***********************1)Section-Cart****************************
// *******1.a)Draw in bom*********************
function drawProductInBom(allproduct = []) {
  if (JSON.parse(localStorage.getItem("productChoosenCart")).length === 0) {

    document.getElementById("choosenCart").innerHTML =
      `<p >Your Cart page Is Empty </p>
      <div>
        <a href="index.html" class="text-white text-decoration-none">Go to Home Page</a> 
        <a href="index.html" class="text-white"> <i class="fas fa-sign-out-alt"></i></a>
    </div>`;
    showPriceVar.style.display = "none";

  }
  let products = JSON.parse(localStorage.getItem("productChoosenCart")) || allproduct;
  let drawProductInBom = products.map((item) => {
    return (`
            <div class="col">
                <div class="card">
                  <img height="300px" src="${item.imgUrl}" class="card-img-top" alt="${item.name}"/>
                  <div class="card-body">
                    <h5 class="card-title">${item.id + 1}. ${item.name}</h5>
                    <h5 class="card-title text-warning"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></h5>
                    <div>Number of pieces:<span class="text-primary fs-5"> ${item.quantity} pieces</span></div> <!-- /suptitle -->
                    <div class="card-text">Price Before Discunt:<span class="text-primary"> ${(item.price + item.discPrice) * item.quantity} $</span></div>
                    <div>Discunt: <del class="text-danger">${item.discPrice * item.quantity} $</del></div>
                    <div class="card-title">Total Price:<span class="text-success"> ${(item.price - item.discPrice) * item.quantity} $</span></div>
                    <div class="d-flex justify-content-between">
                <span  class="badge bg-primary rounded-pill">${item.id}</span>
                <span  onclick="addToCartbyplus(${item.id})" class="btn text-success plus"><i class="fas fa-plus"></i></span>
                    <button onclick="removefromcartpage(${item.id})" type="button" class="btn btn-danger">
                      <span>Remove From Cart</span>
                    </button>
                    </div>
                  </div> <!-- /card-body -->
                </div> <!-- /card -->
              </div>  <!-- /col -->     
            `)
  }).join("");
  document.getElementById("drawProductInBom").innerHTML = drawProductInBom;
  let total = 0;
  let discunt = 0;
  for (let i = 0; i < products.length; i++) {
    total += +(products[i].price * products[i].quantity);
    discunt += +(products[i].discPrice * products[i].quantity);
  }
  showPriceVar.innerHTML = `<div class="mb-5 text-center productHead rounded-1 p-1">
                <h2 class="h2 text-capitalize">Total Price Chossen product is : ${total} LE</h2>
                 <h2 class="h2 text-capitalize">Total Discount Chossen product is : ${discunt} LE</h2>
              </div> <!-- /product-heade -->`
};
drawProductInBom();
// **********2)removefromcartpage******************************
function removefromcartpage(id) {
  let productsincart = localStorage.getItem("productChoosenCart");
  if (productsincart) {
    let getproduct = JSON.parse(localStorage.getItem("productChoosenCart"));
    let poductedremoved = getproduct.filter((item) => item.id != id);
    localStorage.setItem("productChoosenCart", JSON.stringify(poductedremoved));
    drawProductInBom(poductedremoved);
  }
}
// **********2)removefromcartpage******************************
function addToCartbyplus(id) {
  let productsincart = localStorage.getItem("productChoosenCart");
  
  if (productsincart) {
    let getproduct = JSON.parse(productsincart);
    let productExists = getproduct.find(item => item.id === id);
    
    if (productExists) {
      productExists.quantity += 1;
    } else {
      getproduct.push({ id: id, quantity: 1 });
    }
    localStorage.setItem("productChoosenCart", JSON.stringify(getproduct));
    drawProductInBom(getproduct);
  } else {
    let newProduct = [{ id: id, quantity: 1 }];
    localStorage.setItem("productChoosenCart", JSON.stringify(newProduct));
    drawProductInBom(newProduct);
  }
  let priceTotal = JSON.parse(localStorage.getItem("productChoosenCart"));
  console.log(priceTotal[0].quantity * priceTotal[0].price)
  let total = 0;
  let discunt = 0;
  for (let i = 0; i < priceTotal.length; i++) {
    total += +(priceTotal[i].price * priceTotal[i].quantity);
    discunt += +(priceTotal[i].discPrice*priceTotal[i].quantity);
  }
  showPriceVar.innerHTML = `<div class="mb-5 text-center productHead rounded-1 p-1">
                <h2 class="h2 text-capitalize">Total Price Chossen product is : ${total} LE</h2>
                 <h2 class="h2 text-capitalize">Total Discount Chossen product is : ${discunt} LE</h2>
              </div> <!-- /product-heade -->`
}
// ********************3)Section-Favourite*******************************************
function drawProductInBom2(allproduct2 = []) {
  if (JSON.parse(localStorage.getItem("productFavourit")).length === 0) {

    document.getElementById("favouritCart").innerHTML = `Your Favorite page Is Empty
      <div>
        <a href="index.html" class="text-white text-decoration-none">Go to Home Page</a> 
        <a href="index.html" class="text-white"> <i class="fas fa-sign-out-alt"></i></a>
    </div>`;
    ShowPriceFavourite.style.display = "none";

  }
  let products2 = JSON.parse(localStorage.getItem("productFavourit")) || allproduct2;
  let drawProductInBom2 = products2.map((item) => {
    return (`
                <div class="col">
                <div class="card">
                  <img height="300px" src="${item.imgUrl}" class="card-img-top" alt="${item.name}"/>
                  <div class="card-body">
                    <h5 class="card-title">${item.id + 1}. ${item.name}</h5>
                    <h5 class="card-title text-warning"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></h5>
                    <div class="card-text">Price Before Discunt:<span class="text-primary"> ${(item.price + item.discPrice) * item.quantity} $</span></div>
                    <div>Discunt: <del class="text-danger">${item.discPrice * item.quantity} $</del></div>
                    <div class="card-title">Total Price:<span class="text-success"> ${(item.price - item.discPrice) * item.quantity} $</span></div>
                    <span class="float-end" role="button" tabindex="0">
                      <i onclick="removefromFavourite(${item.id})" class ="fas fa-heart text-danger"></i>
                      </span>
                  </div> <!-- /card-body -->
                </div> <!-- /card -->
              </div>  <!-- /col -->
            `)
  }).join("");
  document.getElementById("drawProductInBom2").innerHTML = drawProductInBom2;
  let total2 = 0;
  let discunt2 = 0;
  for (let i = 0; i < products2.length; i++) {
    total2 += +products2[i].price;
    discunt2 += +products2[i].discPrice;
  }
  ShowPriceFavourite.innerHTML = `<div class="mb-5 text-center productHead rounded-1 p-1">
                <h2 class="h2 text-capitalize">Total Price Chossen product is : ${total2} LE</h2>
                 <h2 class="h2 text-capitalize">Total Discount Chossen product is : ${discunt2} LE</h2>
              </div> <!-- /product-heade -->`
};
drawProductInBom2();
// **********2.b)removefromfavourite******************************
function removefromFavourite(id) {
  let productsincart2 = localStorage.getItem("productFavourit");
  if (productsincart2) {
    let getproduct2 = JSON.parse(productsincart2);
    let poductedremoved2 = getproduct2.filter((item) => item.id != id);
    localStorage.setItem("productFavourit", JSON.stringify(poductedremoved2));
    drawProductInBom2(poductedremoved2);
  }
}
// *******************************************************************************************
// function addToCartbyplus(id) {
//   let productsincart = localStorage.getItem("productChoosenCart");
  
//   if (productsincart) {
//     // تحويل البيانات المخزنة في السلة إلى مصفوفة من الكائنات
//     let getproduct = JSON.parse(productsincart);
    
//     // البحث عن المنتج في السلة
//     let productExists = getproduct.find(item => item.id === id);
    
//     if (productExists) {
//       // إذا كان المنتج موجوداً في السلة، نقوم بزيادة الكمية
//       productExists.quantity += 1;
//     } else {
//       // إذا لم يكن المنتج موجوداً في السلة، نضيفه مع الكمية 1
//       getproduct.push({ id: id, quantity: 1 });
//     }
    
//     // حفظ السلة المعدلة في LocalStorage
//     localStorage.setItem("productChoosenCart", JSON.stringify(getproduct));
    
//     // رسم السلة بعد التعديل
//     drawProductInBom(getproduct);
    
//     // تحديث السعر الإجمالي والخصم بناءً على الكمية
//     let total = 0;
//     let discunt = 0;

//     // حساب الأسعار بناءً على الكمية
//     for (let i = 0; i < getproduct.length; i++) {
//       let product = getproduct[i];
//       let productDetails = products.find(p => p.id === product.id);
//       if (productDetails) {
//         total += productDetails.price * product.quantity; // حساب السعر الإجمالي بناءً على الكمية
//         discunt += productDetails.discPrice * product.quantity; // حساب الخصم بناءً على الكمية
//       }
//     }
    
//     // تحديث الواجهة مع السعر الإجمالي والخصم
//     showPriceVar.innerHTML = `<div class="mb-5 text-center productHead rounded-1 p-1">
//                 <h2 class="h2 text-capitalize">Total Price Chosen product is: ${total} LE</h2>
//                 <h2 class="h2 text-capitalize">Total Discount Chosen product is: ${discunt} LE</h2>
//              </div> <!-- /product-head -->`;
//   } else {
//     // إذا كانت السلة فارغة، نضيف المنتج الأول مع الكمية 1
//     let newProduct = [{ id: id, quantity: 1 }];
//     localStorage.setItem("productChoosenCart", JSON.stringify(newProduct));
//     drawProductInBom(newProduct);
    
//     // تحديث السعر الإجمالي والخصم في حال كانت السلة فارغة
//     let total = 0;
//     let discunt = 0;

//     // حساب الأسعار بناءً على الكمية
//     for (let i = 0; i < newProduct.length; i++) {
//       let product = newProduct[i];
//       let productDetails = products.find(p => p.id === product.id);
//       if (productDetails) {
//         total += productDetails.price * product.quantity;
//         discunt += productDetails.discPrice * product.quantity;
//       }
//     }
    
//     // تحديث الواجهة مع السعر الإجمالي والخصم
//     showPriceVar.innerHTML = `<div class="mb-5 text-center productHead rounded-1 p-1">
//                 <h2 class="h2 text-capitalize">Total Price Chosen product is: ${total} LE</h2>
//                 <h2 class="h2 text-capitalize">Total Discount Chosen product is: ${discunt} LE</h2>
//              </div> <!-- /product-head -->`;
//   }
// }
