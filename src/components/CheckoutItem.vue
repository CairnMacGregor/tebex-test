<template>
    <div class = "checkoutItem">
        <img class = "checkoutItem__image" :src="`/img/products/${item.image}`" :alt="`Image of ${item.name}`">
        <div class = "checkoutItem__info">
            <h2 class = "checkoutItem__info-name">{{ item.name }}</h2>
            <h4 class = "checkoutItem__info-qty">Qty: {{ item.quantity }}</h4>
        </div>
        <h4 class = "checkoutItem__price">{{ item.price }} USD</h4>
    </div>
</template>

<script setup>
    const props = defineProps({
        item: Object
    })
</script>

<style lang="scss">
    .checkoutItem{
        display: flex;
        flex-direction: row;
        width: 100%;
        &__image{
            height: 40px;
            width: 40px;
            margin-right: 2.5px;
        }

        &__info{
            display: flex;
            flex-direction: column;

            &-name{
                font-size: 14px;
                font-weight: 500;
            }

            &-qty{
                font-size: 12px;
                font-weight: 300;
            }
        }

        &__price{
            margin: auto 0 0 auto;
            font-size: 12px;
            font-weight: 300;
        }
    }
</style>