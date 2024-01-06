import {defineStore} from 'pinia';

export const useBasketStore = defineStore('basketStore', {

    state: () => ({ 
        basket: JSON.parse(localStorage.getItem('basket')) || null,
    }),
    actions:{
        setBasket(basket) {
            this.basket = basket;
            this.persistState();
        },
        getBasket() {
            return this.basket;
        },
        setTransactionId(transactionId) {
            this.basket = {
                ...this.basket,
                "transactionId": transactionId
            }
            this.persistState();
        },
        clearTransactionId() {
            this.basket = {
                ...this.basket,
                "transactionId": null
            }
            this.persistState();
        },
        persistState() {
            localStorage.setItem('basket', JSON.stringify(this.basket));
        },
    }

});