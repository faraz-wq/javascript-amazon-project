import {cart, removefromcart, updatedeliveryoption} from '../../data/cart.js';
import { products } from '../../data/products.js';
import formatcurrency from '.././utils/money.js';
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {deliveryoptions} from '../../data/deliveryoptions.js'



export function renderordersummary(){
    let checkoutHTML = ``;

    cart.forEach(cartitem => {
        const productId = cartitem.productId;
        let matchingItem;

        products.forEach((product)=>{
            if(product.id === productId) {
                matchingItem = product;
            }
        });

        const deliveryoptionid = cartitem.deliveryoptionid;

        let deliveryday;

        deliveryoptions.forEach((option) => {
            if (option.id === deliveryoptionid) {
                deliveryday = option.deliverydays;
            }
        })

        const today = dayjs();
        const deliveryDate = today.add(deliveryday,'days');

        const datestring = deliveryDate.format('dddd, MMMM D');


        checkoutHTML += `
            <div class="cart-item-container js-cart-item-${matchingItem.id}">
            <div class="delivery-date">
            Delivery date: ${datestring}
            </div>

            <div class="cart-item-details-grid">
            <img class="product-image"
                src="${matchingItem.image}">

            <div class="cart-item-details">
                <div class="product-name">
                ${matchingItem.name}
                </div>
                <div class="product-price">
                $${formatcurrency(matchingItem.priceCents)}
                </div>
                <div class="product-quantity">
                <span>
                    Quantity: <span class="quantity-label">${cartitem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                    Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingItem.id}">
                    Delete
                </span>
                </div>
            </div>

            <div class="delivery-options" n>Choose a delivery option:
                ${deliveryOptionsHTML(matchingItem,cartitem)}
            </div>
            </div>
        </div>`;
    });
    function deliveryOptionsHTML(matchingItem,cartitem)  {
        let html = ``;
        deliveryoptions.forEach((option)=>{
            const today = dayjs();

            const deliveryDate = today.add(option.deliverydays,'days');

            const datestring = deliveryDate.format('dddd, MMMM D');

            const pricestring = option.priceCents === 0 ? 'FREE' : `$${formatcurrency(option.priceCents)}-`;
            const ischecked = option.id === cartitem.deliveryoptionid;

            html += `<div class="delivery-option js-delivery-option"
            data-product-id="${matchingItem.id}" data-delivery-option-id="${option.id}">
                <input type="radio"
                    ${ischecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                <div>
                    <div class="delivery-option-date">
                    ${datestring}
                    </div>
                    <div class="delivery-option-price">
                    ${pricestring} - Shipping
                    </div>
                </div>
            </div>`
        })

        return html;
    }
    document.querySelector('.js-order-summary').innerHTML = checkoutHTML; 

    document.querySelectorAll('.js-delete-link')
        .forEach((link) => {
            link.addEventListener('click',()=>{
                const productId = link.dataset.productId;
                removefromcart(productId);

                const container = document.querySelector(`.js-cart-item-${productId}`);
                container.remove();
            });
        });

    document.querySelectorAll('.js-delivery-option')
        .forEach((element) =>{
            element.addEventListener('click',()=>{
                const productId = element.dataset.productId;
                const deliveryoptionid = element.dataset.deliveryOptionId;
                updatedeliveryoption(productId,deliveryoptionid);
                renderordersummary();
            })
        });
}

renderordersummary();