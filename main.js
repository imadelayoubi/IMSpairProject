/* Your DOM Manipulation come here */
products=[
{
name:"tomatoes",
description:"sicam",
quantity:500,
supplier:"sicam company",
price:2500000},
{
name:"orange juice",
description:"delice",
quantity:100,
supplier:"delice company",
price:100000},
{
name:"mini cakes",
description:"chocolate",
quantity:1000,
supplier:"kif company",
price:500000}
]


var counter =0;

function setMyStockage(){
	
	localStorage.setItem('products',JSON.stringify(products));
	
}
function getMyStockage(){
	
	
	products=JSON.parse(localStorage.getItem('products'))
	
	
}

function createProduct(product){

	
	
    $("#productsTable").append('<tr id=' + "row" + counter+'></tr>')
	$("#row"+counter).append('<td>'+product.name+'</td>')

	$("#row"+counter).append('<td><button id=btndelete'+counter+' class="btn" ><i class="fa fa-trash"></i></button></tr>')
	$("#row"+counter).append('<td><button id=btnupdate'+counter+' class="btn" onclick=document.getElementById("id01").style.display="block" ><i class="fa fa-edit"></i></button></tr>')

	
    $("#btndelete"+counter).click(function() {
		 console.log("I am in delete")
		 var r = confirm("Are you sure to delete this product!\nEither OK or Cancel.\n");
	  if (r == true) {
		 for(var i = 0 ; i < products.length ; i++){
		 	if(products[i].name === product.name){
		 		products.splice(i,1) 
		 		// setMyStockage();
		 		renderProducts();
		 		return;
		 	}
		 }
		}
	})
    
	
	$("#btnupdate"+counter).click(function() {
		
		    updateProduct(product.name);})
	counter++;
}
function renderProducts(){
	
	$("#productsTable").html("")
	// $("#addForm").hide();
   
    // getMyStockage();
    
	for (var i =0;i<products.length;i++){
		createProduct(products[i]);
	}
	$("#productsTable").show();
}

function home(){
	

	renderProducts();
	
}

function printAddForm() {
 //  	$("#row").hide();
	// $("#addForm").show();
	// $("#favouriteForm").show().hide();
 

}


function addButton(event){
	// event.preventDefault();
	 var product={}
	
	 
	 
	
	
	product["name"]=$("#nameProduct").val()
	product["description"]=$("#descriptionProduct").val()
	product['quantityProduct']=$("#quantityProduct").val()
	product['supplier']=$("#supplier").val()
	product['price']=$("#priceProduct").val()
	console.log("before add",products)
	products.push(product);
	console.log("it is added",products)
	document.getElementById("id01").style.display="none";
	 // setMyStockage();
	renderProducts();
	
     
	return;
	
	
}

$('#add').click(addButton)






function updateProduct(name){
	var product={}
	for (var i=0;i<products.length;i++){
		if(name===products[i].name){
			 product=products[i]
			 products.splice(i,1)
			 console.log("it is deleted ",products)
		}
	}
	// setMyStockage()
	
	
	 $("#nameProduct").val(product["name"])
	 $("#descriptionProduct").val(product["description"])
	 $("#quantityProduct").val(product['quantity'])
	$("#supplier").val(product['supplier'])
	$("#priceProduct").val(product['price'])
	
}
function initializeLocalStorage(){
	if(!JSON.parse(localStorage.getItem('products'))){
		setMyStockage();
	} 
}
// initializeLocalStorage();

renderProducts();