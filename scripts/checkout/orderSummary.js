import { cart, removeFromCart,updateDeliveryOption} from "../../data/cart.js";
import { products,getProduct} from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"
import {delieveryOptions,getDelieveryOption} from '../../data/delieveryOptions.js'
import { renderpaymentsummary } from "./paymentSummary.js";

export function renderOrdersummary(){

let cartSummartHTML = ''

cart.forEach((cartItem) => {

const productId = cartItem.productId;

const matchingProduct = getProduct(productId)

const delieveryOptionId = cartItem.delieveryOptionId;

const delieveryOption = getDelieveryOption(delieveryOptionId)

const today = dayjs()
const deliveryDate = today.add(
  delieveryOption.delieveryDays,'days'
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
       <div class="delivery-option js-delivery-option" data-product-id=${matchingProduct.id} data-delivery-option-id='${delieveryOption.id}'>
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
      renderpaymentsummary()
    })

   
})

document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
    element.addEventListener('click',() => {
      const {productId,deliveryOptionId} = element.dataset
      updateDeliveryOption(productId,deliveryOptionId)
      renderOrdersummary()
      renderpaymentsummary()
    })
})

}

