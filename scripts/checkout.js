import { cart, removeFromCart} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js"
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"
import {delieveryOptions} from '../data/delieveryOptions.js'

hello()
const today = dayjs()
const deliveryDate = today.add(7,'days')
let r = deliveryDate.format('dddd MMMM D')
console.log(r);


let cartSummartHTML = ''

cart.forEach((cartItem) => {

const productId = cartItem.productId;


let matchingProduct;

products.forEach((product) => {
    if(product.id === productId){
        matchingProduct = product
    }
})

const delieveryOptionId = cartItem.delieveryOptionId;
let delieveryOption;

delieveryOptions.forEach((option) => {
 
  if(option.id === delieveryOptionId){
    delieveryOption = option
  }
})

const today = dayjs()
const deliveryDate = today.add(
  delieveryOption.delieveryDays,'day'
)

const dateString = deliveryDate.format(
  'dddd, MMMM D'
)


  cartSummartHTML +=  `
     <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src=${matchingProduct.image}>

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${matchingProduct.id}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                 ${delieveryOptionHTML(matchingProduct,cartItem)}
              </div>
            </div>
          </div>
    `
});

function delieveryOptionHTML(matchingProduct,cartItem){
  let html = ''
  delieveryOptions.forEach((delieveryOption)=>{
    const today = dayjs()
    const deliveryDate = today.add(
      delieveryOption.delieveryDays,'day'
    )

    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    )

    const priceString = delieveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(delieveryOption.priceCents)} - `

    const isChecked = delieveryOption.id === cartItem.delieveryOptionId;

   html += `
       <div class="delivery-option">
                  <input type="radio"
                    ${isChecked ? 'checked':''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} - Shipping
                    </div>
                  </div>
                </div>
    
    `
  })
  return html
}

document.querySelector('.js-order-summary')
    .innerHTML = cartSummartHTML


document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click',() => {
        const productId = link.dataset.productId;
        removeFromCart(productId)
        
    

      const container = document.querySelector(`.js-cart-item-container-${productId}`)

          
      container.remove()

    })

   
})


