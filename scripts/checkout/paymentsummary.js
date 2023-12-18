import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getdeliveryoption } from "../../data/deliveryoptions.js";
import formatcurrency from "../utils/money.js";

export function renderpaymentsummary(){
    let productpriceCents = 0;
    let shippingpricecents = 0;

    cart.forEach(cartItem => {
        const product = getProduct(cartItem.productId);
        productpriceCents += product.priceCents * cartItem.quantity;
        const deliveryoption = getdeliveryoption(cartItem.deliveryoptionid);
        shippingpricecents += deliveryoption.priceCents;
    });
    const totalbeforetax = (productpriceCents + shippingpricecents);
    const taxCents = totalbeforetax*0.1;
    const totalcents = totalbeforetax+taxCents;

    const paymentsummary = `
            <div class="payment-summary-title">
                Order Summary
            </div>

            <div class="payment-summary-row">
                <div>Items (3):</div>
                <div class="payment-summary-money">$${formatcurrency(productpriceCents)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div class="payment-summary-money">$${formatcurrency(shippingpricecents)}</div>
            </div>

            <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money">$${formatcurrency(totalbeforetax)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div class="payment-summary-money">$${formatcurrency(taxCents)}</div>
            </div>

            <div class="payment-summary-row total-row">
                <div>Order total:</div>
                <div class="payment-summary-money">$${formatcurrency(totalcents)}</div>
            </div>

            <button class="place-order-button button-primary">
                Place your order
            </button>`;

            console.log(paymentsummary);
            
            document.querySelector('.js-payment-summary').innerHTML = paymentsummary;
}   
