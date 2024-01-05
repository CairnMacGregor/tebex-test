<template>
    <div class = "basket-summary">
        <h4 class = "basket-summary__title">Your order</h4>
        <div class = "basket-summary__basket">
            <CheckoutItem class = "basket-summary__checkoutItem" v-for="basketItem of basket" :item ="basketItem"></CheckoutItem>
        </div>
    </div>
</template>

<style lang = "scss">

    .basket-summary{
        margin: auto;
        color: #fff;
        margin-bottom: 25px;
        &__title{
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 20px;
        }

        &__basket{
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
    }

</style>

<script setup>
    import CheckoutItem from './CheckoutItem.vue'
    const props = defineProps({
        basket: Array
    })
</script>