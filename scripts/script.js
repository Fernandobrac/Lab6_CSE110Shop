// Script.js

const website = 'https://fakestoreapi.com/products';
let cartCount = document.getElementById('cart-count');
let productList = document.getElementById('product-list');
//Local storage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
myStorage = window.localStorage;

//Add elements added to cart to storage to keep track of
if (myStorage.getItem('itemsInCart') == null){
  myStorage.setItem('itemsInCart', JSON.stringify(new Array()))
}
let itemsInCart = JSON.parse(myStorage.getItem('itemsInCart'));
cartCount.textContent = itemsInCart.length;

window.addEventListener('DOMContentLoaded', () => {
	let prodArr = [];

  //To fetch: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch 
	if (myStorage.getItem('products') == null) {
		fetch(website)
			.then(response => response.json())
			.then(data => {
				myStorage.setItem('products', JSON.stringify(data));
				prodArr = data;
				loadContent(prodArr);
			});
	}
	else{
		prodArr = JSON.parse(myStorage.getItem('products'))
		loadContent(prodArr);
	}
});

//
function loadContent(prodArr) {
	let i = 0;
	for (; i < prodArr.length; i++){
    //create a ProductItem object and pass in variables to constructor
		let newProduct = new ProductItem(prodArr[i]['id'], prodArr[i]['price'],  
			prodArr[i]['title'], prodArr[i]['image']);
    //add this element to the produxt list 
		productList.appendChild(newProduct);
	}
}