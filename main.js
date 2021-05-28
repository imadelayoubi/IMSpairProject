/* Your DOM Manipulation come here */
var products = [
    {
        name: "tomatoes",
        description: "sicam",
        quantity: 500,
        supplier: "sicam company",
        price: 2500000
    },
    // {
    //     name: "orange juice",
    //     description: "delice",
    //     quantity: 100,
    //     supplier: "delice company",
    //     price: 100000
    // },
    // {
    //     name: "mini cakes",
    //     description: "chocolate",
    //     quantity: 1000,
    //     supplier: "kif company",
    //     price: 500000
    // }

]
productsHistory=[]


var counter = 0;

function setMyStockage() {
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('productsHistory', JSON.stringify(productsHistory));
}
function getMyStockage() {
    products = JSON.parse(localStorage.getItem('products'))
    productsHistory = JSON.parse(localStorage.getItem('productsHistory'))
}

function createProduct(product) {

    $("#productsTable").append('<tr id=' + "row" + counter + ' class ="row"></tr>')
    $("#row" + counter).append('<td class="namespace">' + product.name + '</td>')
    $("#row" + counter).append('<td><button id=btnupdate' + counter + ' class="btn" onclick=document.getElementById("id01").style.display="block" ><i class="fa fa-edit"></i></button></tr>')
    $("#row" + counter).append('<td><button id=btninfo' + counter + ' class="btn" ><i class="fa fa-info"></i></button></tr>')
    $("#row" + counter).append('<td><button id=btndelete' + counter + ' class="btn delete" ><i class="fa fa-trash"></i></button></tr>')



    $("#btndelete" + counter).click(function () {
        console.log("I am in delete")
        var r = confirm("Are you sure to delete this product!\nEither OK or Cancel.\n");
        if (r == true) {
            for (var i = 0; i < products.length; i++) {
                if (products[i].name === product.name) {
                    products.splice(i, 1)
                    productsHistory.push(product)
                    console.log(product)
                    setMyStockage();
                    renderProducts();
                    return;
                }
            }
        }
    })
   

    ///fixing error that is invoked twice at 15:06
    $("#btnupdate" + counter).click(function () {

        products.splice(products.indexOf(product), 1)
        setMyStockage()


        $("#nameProduct").val(product["name"])
        $("#descriptionProduct").val(product["description"])
        console.log(product["quantity"])
        $("#quantityProduct").val(product["quantity"])
        $("#supplier").val(product['supplier'])
        $("#priceProduct").val(product['price'])
    });
    ///for display a product at 15:37
    $('#btninfo' + counter).click(function () {
        console.log("ia m product", product)

        $("#productNameLabel").html("Product Name: " + product.name)
        console.log($("#productNameLabel").html())
        $("#productDescriptionLabel").html("Description: " + product.description)
        $("#productQuantityLabel").html("Quantity: " + product.quantity)
        $("#productSupplierLabel").html("Supplier: " + product.supplier)
        $("#productPriceLabel").html("Price: " + product.price)
        document.getElementById("id02").style.display = "block"
    });
    counter++;
}
 /////show the history at 21:38
 function showHistory(){
     $("#main").hide()
     $("#history").show()
    $("#productsTableHistory").html("")
    console.log("I am in show hisotry product",productsHistory)

    getMyStockage();
    if(productsHistory.length===0){
        document.getElementById("home").style.backgroundImage ="url('imgs/empty-box1.png')";
    }else { document.getElementById("home").style.backgroundImage = "";}
    for (var i = 0; i < productsHistory.length; i++) {
        createProductHistory(productsHistory[i]);
    }
    $("#productsTableHistory").show();
}
function clearHistory(){
    console.log(" I am clear archive")
    productsHistory.splice(0,productsHistory.length)
    console.log("table of archive=",productsHistory)
    setMyStockage();
    renderProductsHistory();
}
function createProductHistory(product) {
    

    $("#productsTableHistory").append('<tr id=' + "row" + counter + ' class ="row"></tr>')
    $("#row" + counter).append('<td class="namespace">' + product.name + '</td>')
    
    $("#row" + counter).append('<td><button id=btninfo' + counter + ' class="btn" ><i class="fa fa-info"></i></button></tr>')
    $("#row" + counter).append('<td><button id=btnrestore' + counter + ' class="btn restore" ><i class="fa fa-refresh"></i>restore</button></tr>')



    $("#btnrestore" + counter).click(function () {
        
        var r = confirm("Are you sure to restore this product!\nEither OK or Cancel.\n");
        if (r == true) {
            for (var i = 0; i < products.length; i++) {
                if (productsHistory[i].name === product.name) {
                    productsHistory.splice(i, 1)
                    products.push(product)
                    setMyStockage();
                    renderProductsHistory()
                    return;
                }
            }
        }
    })
   

   
    ///for display a product at 15:37
    $('#btninfo' + counter).click(function () {
        console.log("ia m product", product)

        $("#productNameLabel").html("Product Name: " + product.name)
        console.log($("#productNameLabel").html())
        $("#productDescriptionLabel").html("Description: " + product.description)
        $("#productQuantityLabel").html("Quantity: " + product.quantity)
        $("#productSupplierLabel").html("Supplier: " + product.supplier)
        $("#productPriceLabel").html("Price: " + product.price)
        document.getElementById("id02").style.display = "block"
    });
    counter++;
}
function renderProducts() {
    $("#main").show()
    $("#history").hide()
    $("#productsTable").html("")

    getMyStockage();
    if(products.length===0){
        document.getElementById("home").style.backgroundImage ="url('imgs/empty-box1.png')";
    }else { document.getElementById("home").style.backgroundImage = "";}
    for (var i = 0; i < products.length; i++) {
        createProduct(products[i]);
    }
    
    $("#productsTable").show();
}
function renderProductsHistory() {
    $("#main").hide()
    $("#history").show()
    $("#productsTableHistory").html("")
    
    getMyStockage();
    if(productsHistory.length===0){
        document.getElementById("home").style.backgroundImage ="url('imgs/empty-box1.png')";
    }else { document.getElementById("home").style.backgroundImage = "";}
    for (var i = 0; i < productsHistory.length; i++) {
        createProductHistory(productsHistory[i]);
    }
    
    $("#productsTableHistory").show();
}
function home(){
	

	renderProducts();
	
}





function addButton(event) {
    // event.preventDefault();
    var product = {}
    product["name"] = $("#nameProduct").val()
    product["description"] = $("#descriptionProduct").val()
    product['quantity'] = $("#quantityProduct").val()
    product['supplier'] = $("#supplier").val()
    product['price'] = $("#priceProduct").val()
    console.log("before add", products)
    products.push(product);
    console.log("it is added", products)
    document.getElementById("id01").style.display = "none";
    setMyStockage();
    renderProducts();
    return;
}

function w3_open() {
    document.getElementById("main").style.marginLeft = "25%";
    document.getElementById("history").style.marginLeft = "25%";
    document.getElementById("mySidebar").style.width = "25%";
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("openNav").style.display = 'none';
  }
  function w3_close() {
    document.getElementById("main").style.marginLeft = "0%";
    document.getElementById("history").style.marginLeft = "0%";
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("openNav").style.display = "inline-block";
  }
function initializeLocalStorage() {
    if (!JSON.parse(localStorage.getItem('products'))) {
        localStorage.setItem('products', JSON.stringify(products));
    
    }
    if(!JSON.parse(localStorage.getItem('productsHistory'))){
        localStorage.setItem('productsHistory', JSON.stringify(productsHistory));
    }
}
initializeLocalStorage();

renderProducts()