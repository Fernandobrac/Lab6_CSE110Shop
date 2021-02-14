// product-item.js

class ProductItem extends HTMLElement {
  // TODO
  //classes and constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
  constructor(id, price, title, image){
		
		super();

    //local storage 
		myStorage = window.localStorage;

    //Taken from: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements 
    // https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM 
		//we attach a shadow DOM to the element
    let shadow = this.attachShadow({mode: 'open'});
		
    let cartCount = document.getElementById('cart-count');
		let itemsInCart = JSON.parse(myStorage.getItem('itemsInCart'));
		let cartButton = document.createElement('cartButton');

		////Taken from: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements 
		let li = document.createElement('li');
		li.setAttribute('class', 'product');
		
		let itemPrice = document.createElement('p');
		itemPrice.setAttribute('class', 'price');
		itemPrice.textContent = '$' + price;
		
		let itemTitle = document.createElement('p');
		itemTitle.setAttribute('class', 'title');
		itemTitle.textContent = title;
		
		let itemImage = document.createElement('img');
		itemImage.src = image;
		itemImage.alt = title;
		itemImage.width = 200;

    //Modify button text: if item is not in cart array, then:
		if(!itemsInCart.includes(id)){
			cartButton.textContent = 'Add to Cart';
		}
		else{
			cartButton.textContent = 'Remove from Cart';
		}
		
		//add on click functionality to button:
		cartButton.onclick = function(){
      updateCartButton();
    }
		
    function updateCartButton() {
      if (cartButton.textContent == 'Remove from Cart'){
        removeItem();
      }
      else{
        addItem();
      }
    }

    function removeItem(){
      cartButton.textContent = "Add to Cart";
      alert('Item was removed from your cart');
        
      itemsInCart = JSON.parse(myStorage.getItem('itemsInCart'));
        
      // Convert string to int: https://www.w3schools.com/jsref/jsref_parseint.asp
      cartCount.textContent = parseInt(cartCount.textContent) - 1;  //decrement the size
        
      // Help to modify/access array:
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice 
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf 
      itemsInCart.splice(itemsInCart.indexOf(id), 1);
      myStorage.setItem('itemsInCart', JSON.stringify(itemsInCart));
    }

    function addItem(){
      itemsInCart = JSON.parse(myStorage.getItem('itemsInCart'));
      cartButton.textContent = "Remove from Cart";
      cartCount.textContent = parseInt(cartCount.textContent) + 1; // Convert string to int: https://www.w3schools.com/jsref/jsref_parseint.asp
      itemsInCart.push(id);
      myStorage.setItem("itemsInCart", JSON.stringify(itemsInCart));
      alert('Item was added to your cart');
    }

		//Styling the shadow DOM:
    //Taken from https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM 
    //and https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
		let style = document.createElement('style');
		//CSS format copied from styles.css file:
    style.textContent = `
    .price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    .product > cartButton {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    .product > cartButton:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }

    /* Modified to max-height and max-width to that the 
      images do not exceed the size of the "container" 
    */

    .product > img {
      align-self: center;
      justify-self: center;
      max-width: 100%;  /*added max-width*/
      max-height: 100%  /*added max-height*/
    }
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }`;
		
    // attach the created elements to the shadow dom
    //Taken from: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM 
		shadow.appendChild(style, li);
		shadow.appendChild(li);

		li.appendChild(itemImage);
    li.appendChild(itemPrice);
		li.appendChild(itemTitle);
		
		li.appendChild(cartButton);
		
	}
}

customElements.define('product-item', ProductItem);