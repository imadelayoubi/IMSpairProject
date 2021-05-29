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
productsHistory = []


var counter = 0;

function setMyStockage() {
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('productsHistory', JSON.stringify(productsHistory));
}
function getMyStockage() {
    products = JSON.parse(localStorage.getItem('products'))
    productsHistory = JSON.parse(localStorage.getItem('productsHistory'))
}
var countt = 0
function createProduct(product) {

    $("#productsTable").append('<tr id=' + "row" + counter + ' class ="row"></tr>')
    $("#row" + counter).append('<td class="idspace">' + Number(products.indexOf(product) + 1) + '</td>')
    $("#row" + counter).append('<td class="namespace">' + product.name + '</td>')
    $("#row" + counter).append('<td style="background-color: #04aa6d;"><button id=btnupdate' + counter + ' class="btn" onclick=document.getElementById("id01").style.display="block" ><i class="fa fa-edit"></i></button></tr>')
    $("#row" + counter).append('<td style="background-color: #04aa6d;"><button id=btninfo' + counter + ' class="btn grnbtn" ><i class="fa fa-info"></i></button></tr>')
    $("#row" + counter).append('<td style="background-color: #9A0000;"><button id=btndelete' + counter + ' class="btn delete redbtn" ><i class="fa fa-trash"></i></button></tr>')




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
        $("#productPriceLabel").html("Price: " + product.price + 'DT')
        document.getElementById("id02").style.display = "block"
    });
    counter++;
}

/////show the history at 21:38
// function showHistory() {
//     $("#main").hide()
//     $("#history").show()
/////show the history at 21:38
function showHistory() {
    $("#main").hide()
    $("#history").show()
    $("#searchProduct").hide()
    $("#searchProductHistory").show()
    $("#productsTableHistory").html("")
    console.log("I am in show hisotry product", productsHistory)

    getMyStockage();
    if (productsHistory.length === 0) {
        document.getElementById("home2").style.backgroundImage = "url('imgs/IMS.jpg')";
    } else { document.getElementById("home2").style.backgroundImage = ""; }
    for (var i = 0; i < productsHistory.length; i++) {
        createProductHistory(productsHistory[i]);
    }
    $("#productsTableHistory").show();
}
function clearHistory() {
    console.log(" I am clear archive")
    productsHistory.splice(0, productsHistory.length)
    console.log("table of archive=", productsHistory)
    setMyStockage();
    renderProductsHistory();
}
function createProductHistory(product) {


    $("#productsTableHistory").append('<tr id=' + "row" + counter + ' class ="row"></tr>')
    $("#row" + counter).append('<td class="idspace">' + Number(productsHistory.indexOf(product) + 1) + '</td>')
    $("#row" + counter).append('<td class="namespace">' + product.name + '</td>')

    $("#row" + counter).append('<td style="background-color: #04aa6d;"><button id=btninfo' + counter + ' class="btn" ><i class="fa fa-info"></i></button></tr>')
    $("#row" + counter).append('<td style="background-color: #04aa6d;"><button id=btnrestore' + counter + ' class="btn restore" ><i class="fa fa-refresh"></i></button></tr>')



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
$("#searchProduct").show()
$("#searchProductHistory").hide()
function renderProducts() {
    $("#main").show()
    $("#productsTable").html("")
    $("#history").hide()
    $("#about").hide()
    $("#client").hide()

    $("#searchProduct").show()
    $("#searchProductHistory").hide()
    getMyStockage();
    if (products.length === 0) {
        document.getElementById("home1").style.backgroundImage = "url('imgs/IMS.jpg')";
    } else { document.getElementById("home1").style.backgroundImage = ""; }
    for (var i = 0; i < products.length; i++) {
        createProduct(products[i]);
    }

    $("#productsTable").show();
}
function renderProductsHistory() {
    $("#main").hide()
    $("#history").show()
    $("#about").hide()
    $("#client").hide()
    console.log("hahahahah")

    $("#productsTableHistory").html("")

    getMyStockage();
    if (productsHistory.length === 0) {

        document.getElementById("home2").style.backgroundImage = "url('imgs/IMS.jpg')";
    } else { document.getElementById("home2").style.backgroundImage = ""; }
    for (var i = 0; i < productsHistory.length; i++) {
        createProductHistory(productsHistory[i]);
    }

    $("#productsTableHistory").show();
}
function home() {


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
    $("#nameProduct").val("")
    $("#descriptionProduct").val("")
    $("#quantityProduct").val("")
    $("#supplier").val("")
    $("#priceProduct").val("")
    setMyStockage();
    renderProducts();
    return;
}

function w3_open() {
    document.getElementById("main").style.marginLeft = "25%";
    document.getElementById("history").style.marginLeft = "25%";
    document.getElementById("about").style.marginLeft = "25%";
    document.getElementById("client").style.marginLeft = "25%";
    document.getElementById("mySidebar").style.width = "25%";
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("openNav").style.display = 'none';
}
function w3_close() {
    document.getElementById("main").style.marginLeft = "0%";
    document.getElementById("history").style.marginLeft = "0%";
    document.getElementById("about").style.marginLeft = "0%";
    document.getElementById("client").style.marginLeft = "0%";
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("openNav").style.display = "inline-block";
}
function initializeLocalStorage() {
    if (!JSON.parse(localStorage.getItem('products'))) {
        localStorage.setItem('products', JSON.stringify(products));

    }
    if (!JSON.parse(localStorage.getItem('productsHistory'))) {
        localStorage.setItem('productsHistory', JSON.stringify(productsHistory));
    }
}

function filter(array, predicate) {
    var acc = [];
    each(array, function (element) {
        if (predicate(element)) {
            acc.push(element)
        }
    });
    return acc;
}

function each(coll, func) {
    if (Array.isArray(coll)) {
        for (var i = 0; i < coll.length; i++) {
            func(coll[i], i);
        }
    } else {
        for (var key in coll) {
            func(coll[key], key);
        }
    }
}
function searchProducts() {

    var filteredProducts = []
    filteredProducts = filter(products, function (object) {
        if (object.name.toLowerCase().includes(document.getElementById("searchProduct").value.toLowerCase()))

            return object
    })



    $("#main").show()
    $("#history").hide()
    $("#productsTable").html("")
    $("#client").hide()
    //    getMyStockage();
    if (filteredProducts.length === 0) {
        document.getElementById("home1").style.backgroundImage = "url('imgs/IMS.jpg')";
    } else { document.getElementById("home1").style.backgroundImage = ""; }
    for (var i = 0; i < filteredProducts.length; i++) {
        createProduct(filteredProducts[i]);
    }

    $("#productsTable").show();
    //
}
function searchProductsHistory() {

    var filteredProducts = []
    filteredProducts = filter(productsHistory, function (object) {
        if (object.name.toLowerCase().includes(document.getElementById("searchProductHistory").value.toLowerCase()))

            return object
    })
    console.log("I am in history search function filtered=", filteredProducts)



    $("#main").hide()
    $("#history").show()
    $("#productsTableHistory").html("")
    $("#client").hide()

    //    getMyStockage();
    if (filteredProducts.length === 0) {
        document.getElementById("home2").style.backgroundImage = "url('imgs/IMS.jpg')";
    } else { document.getElementById("home2").style.backgroundImage = ""; }
    for (var i = 0; i < filteredProducts.length; i++) {
        createProductHistory(filteredProducts[i]);
    }

    $("#productsTableHistory").show();
    //
    // function searchProductsHistory(){

    //     var filteredProducts=[]
    //     filteredProducts= filter(productsHistory,function(object){
    //         if(object.name.toLowerCase().includes(document.getElementById("searchProductHistory").value.toLowerCase()))

    //        return object})
    //        console.log("I am in history search function filtered=",filteredProducts)



    //        $("#main").hide()
    //        $("#history").show()
    //        $("#productsTableHistory").html("")

    //     //    getMyStockage();
    //        if (filteredProducts.length === 0) {
    //            document.getElementById("home").style.backgroundImage = "url('imgs/empty-box1.png')";
    //        } else { document.getElementById("home").style.backgroundImage = ""; }
    //        for (var i = 0; i < filteredProducts.length; i++) {
    //         createProductHistory(filteredProducts[i]);
    //        }

    //        $("#productsTableHistory").show();
    //
}
// Get the input field
var input = document.getElementById("searchProduct");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        searchProducts()
    }
});
// Get the input field
var inputHistory = document.getElementById("searchProductHistory");

// Execute a function when the user releases a key on the keyboard
inputHistory.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        searchProductsHistory()
    }
    // inputHistory.addEventListener("keyup", function(event) {
    //   // Number 13 is the "Enter" key on the keyboard
    //   if (event.keyCode === 13) {
    //     // Cancel the default action, if needed
    //     event.preventDefault();
    //     // Trigger the button element with a click
    //     searchProductsHistory()
    //   }
});
function displayAbout() {
    $("#main").hide()
    $("#history").hide()
    $("#about").show()
}
function createProductClient(product) {
console.log("I am in create product for client,", product)
    $("#productsTableClient").append('<tr id=' + "row" + counter + ' class ="row"></tr>')
    $("#row" + counter).append('<td class="idspace">' + Number(products.indexOf(product) + 1) + '</td>')
    $("#row" + counter).append('<td class="namespace">' + product.name + '</td>')
    
    $("#row" + counter).append('<td style="background-color: #04aa6d;"><button id=btninfo' + counter + ' class="btn grnbtn" ><i class="fa fa-info"></i></button></tr>')
    





    ///for display a product at 15:37
    $('#btninfo' + counter).click(function () {
        console.log("ia m product", product)

        $("#productNameLabel").html("Product Name: " + product.name)
        console.log($("#productNameLabel").html())
        $("#productDescriptionLabel").html("Description: " + product.description)
        $("#productQuantityLabel").html("Quantity: " + product.quantity)
        $("#productSupplierLabel").html("Supplier: " + product.supplier)
        $("#productPriceLabel").html("Price: " + product.price + 'DT')
        document.getElementById("id02").style.display = "block"
    });
    counter++;
}
function renderProductsClient() {
   
    $("#client").show()
    $("#main").hide()
    $("#productsTableClient").html("")
    $("#history").hide()
    $("#about").hide()
    

    $("#searchProduct").hide()
    $("#searchProductHistory").hide()
    getMyStockage();
    if (products.length === 0) {
        document.getElementById("home3").style.backgroundImage = "url('imgs/IMS.jpg')";
    } else { document.getElementById("home3").style.backgroundImage = ""; }
    for (var i = 0; i < products.length; i++) {
        createProductClient(products[i]);
    }
    console.log("i am after creating rows")

    $("#productsTableClient").show();
}
initializeLocalStorage();

renderProducts()