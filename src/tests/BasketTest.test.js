import { expect } from 'vitest';
import BasketService from '../utils/BasketServices'

let basket;

beforeEach(async () => {
    const BasketServices = new BasketService();
    basket = await BasketServices.fetchBasket('http://localhost:3000/api/basket');
});


test('Check to see if fetched basket is as it should be', () => {
    expect(basket).toEqual({
        id: "1",
        products: [
            { name: "Medium Booster", price: 9.99, image: "medium_booster.png", quantity: 1 },
            { name: "Small Coins", price: 4.99, image: "small_coins.png", quantity: 1 },
        ],
        couponCode: null,
        subTotal: 14.98,
        salesTax: 3.00,
        total: 17.98,
    });
});

test('Check to see if correct coupon is applied correctly', async () => {
    const BasketServices = new BasketService();
    let response = await BasketServices.submitCouponForm(basket, "25OFF", `http://localhost:3000/api/basket/${basket.id}/coupon`);
    expect(response?.success).toEqual(true);
    expect(response?.message).toEqual('Your Coupon "25OFF" has been succesfully applied, your basket has been updated');
    expect(response?.data.couponCode).toEqual("25OFF");
});
  
  

test('Check to see if blank coupon is handled correctly', async () => {
    const BasketServices = new BasketService();
    let response = await BasketServices.submitCouponForm(basket, "", `http://localhost:3000/api/basket/${basket.id}/coupon`);
    expect(response?.success).toEqual(false);
    expect(response?.message).toEqual('Coupon code not found');

});

test('Check to see if wrong coupon is handled correctly', async () => {
    const BasketServices = new BasketService();
    let response = await BasketServices.submitCouponForm(basket, "WRONGCOUPON", `http://localhost:3000/api/basket/${basket.id}/coupon`);
    expect(response?.message).toEqual('Coupon code not found');
    expect(response?.success).toEqual(false);
});

test('Check to see if catches missing params properly', async () => {
    const BasketServices = new BasketService();
    let response = await BasketServices.checkout(basket, null, `http://localhost:3000/api/basket/${basket.id}/checkout`);
    console.log("Message: " + response);
    expect(response?.message).toEqual("body must have required property 'email'");
});

test('Check to see if can checkout correctly', async () => {
    const BasketServices = new BasketService();
    let data = {
        "cardCvc" : "1111",
        "cardExpiry" : "11/25",
        "cardNumber" : "1111 1111 1111 1111",
        "email" : "cairn@test.test",
        "nameOnCard" : "Cairn MacGregor",
        "postalCode" : "ML3 8TU" 
    }
    let response = await BasketServices.checkout(basket, data, `http://localhost:3000/api/basket/${basket.id}/checkout`);
        console.log(response);
});