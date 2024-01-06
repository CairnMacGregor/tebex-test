<template>
    <div class="summary">
        <!-- I'm aware the currencies are different, but that's how it is in the design -->
        <div class="summary__section">
            <p>Subtotal:</p>
            <p>${{ basket?.subTotal.toFixed(2) }}</p>
        </div>

        <div class="summary__section">
            <p>Sales Tax:</p>
            <p>£{{ basket?.salesTax.toFixed(2) }}</p>
        </div>

        <div v-if="basket.couponCode" class="summary__section discount">
            <p>Coupon Code:</p>
            <p>{{ basket.couponCode }}</p>
            <button class="discount__button" @click="removeDiscount"></button>
        </div>

        <div class="summary__section">
            <p>Total Price:</p>
            <p>${{ basket?.total.toFixed(2) }}</p>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useBasketStore } from '../stores/BasketStore';
import BasketService from '../utils/BasketServices.js';
const basketStore = useBasketStore();
const basket = computed(() => basketStore.basket);
const BasketServices = new BasketService();

const removeDiscount = async () => {
    const fetchedBasket = await BasketServices.fetchBasket();
    basketStore.setBasket(fetchedBasket);
}

</script>

<style lang="scss">
.summary {
    display: flex;
    flex-direction: column;
    gap: 12px;

    &__section {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: 12px;
        font-weight: $font-regular;

        &:last-of-type {
            font-size: 20px;
            font-weight: $font-bold;
        }
    }
}

.discount {
    position: relative;

    &__button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: -25px;
        width: 12px;
        height: 12px;
        background: url("/img/close.svg") no-repeat center center;
        background-size: contain;
        border: none;
        cursor: pointer;
    }
}
</style>