let products = JSON.parse(localStorage.getItem("productsDetails"));
let productIDDetails = localStorage.getItem("productDetailsid");
let productsection = document.getElementById("drawProductInBom");
let catchproduct = products.find((item) => item.id == productIDDetails);
productsection.innerHTML = `
        <div class="col m-auto m-4">
            <div class="card">
                <img height="300px" src="${catchproduct.imgUrl}" class="card-img-top" alt="${catchproduct.name}"/>

                <div class="card-body">
                    <h5 class="card-title">${catchproduct.id + 1}. ${catchproduct.name}</h5>
                    <h5 class="card-title text-warning"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></h5>
                    <div>Number of pieces:<span class="text-primary fs-5"> ${catchproduct.quantity} pieces</span></div> <!-- /suptitle -->
                    <div class="card-text">Price Before Discunt:<span class="text-primary"> ${catchproduct.price * catchproduct.quantity + catchproduct.discPrice * catchproduct.quantity} $</span></div>
                    <div>Discunt: <del class="text-danger">${catchproduct.discPrice * catchproduct.quantity} $</del></div>
                    <div class="card-title">Total Price:<span class="text-success"> ${catchproduct.price * catchproduct.quantity} $</span></div>
                    <a  href="index.html" class="text-decoration-none text-capitalize moreDetails fw-bold">return to home</a>
                </div> <!-- /card-body -->
            </div> <!-- /card -->
        </div>  <!-- /col -->`