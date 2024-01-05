<template>
    <div class = "summary">
        <!-- I'm aware the currencies are different, but that's how it is in the design -->
        <div class = "summary__section">
            <p>Subtotal:</p>
            <p>${{ summary?.subTotal.toFixed(2) }}</p>
        </div>
        <div class = "summary__section">

            <p>Sales Tax:</p>
            <p>£{{ summary?.salesTax.toFixed(2) }}</p>
        </div>
        <div class = "summary__section">

            <p>Total Price:</p>
            <p>${{ summary?.total.toFixed(2) }}</p>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        summary: Object
    });

</script>

<style lang="scss">
    .summary{
        display: flex;
        flex-direction: column;
        gap: 12px;
        &__section{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            font-size: 12px;
            font-weight: 300;

            &:last-of-type{
                font-size: 20px;
                font-weight: 700;
            }
        }
    }
</style>