<template>
    <div class = "orderComplete" >
            <div class = "orderComplete__inner" v-if="validOrder">
                <img class = "orderComplete__inner-img" src ="/img/tick.svg" alt = "An icon with a tick in it"> 
                <h1 class = "orderComplete__inner-title">Order Complete</h1>
                <p class = "orderComplete__inner-strapline">Thank you for your payment. You will receive your purchased <br> products shortly.</p>
                <div class = "orderComplete__inner-number"><span>Order Number: </span>{{ transactionId }}</div>
            </div>
            <div class = "orderComplete__inner" v-else>
                <img class = "orderComplete__inner-img--cross" src ="/img/cross.svg" alt = "An icon with a cross in it"> 
                <h1 class = "orderComplete__inner-title">Sorry</h1>
                <p class = "orderComplete__inner-strapline">Sorry, the specified order number either does not exist or is not associated with your account.</p>
                <div class = "orderComplete__inner-number"><span>Order Number: </span>{{transactionId}}</div>
            </div>
    </div>
  
</template>

<script setup>
    import { useBasketStore } from '../stores/BasketStore';
    import { ref, computed, onMounted} from 'vue';
    import { useRoute } from 'vue-router';
    const route = useRoute();
    const basketStore = useBasketStore();
    const basket = computed(() => basketStore.basket);
    const transactionId = route.params.transactionId; 

    let validOrder = ref(false);

    onMounted(() => {
        if (basket.value.transactionId == transactionId) {
            validOrder.value = true;
        }
    });


</script>

<style lang="scss">

    .orderComplete{
        width: 100%;
        padding-top: 150px;
        @media(max-width: $mbbp){
            padding: 100px $mobile-padding;
        }
        &__inner{
            max-width: 740px;
            margin: auto;
            display: flex;
            flex-direction: column;
            text-align: center;
            border: 1px solid #333;
            padding-bottom: 40px;
            gap: 20px;

            @media(max-width: $mbbp){
                padding: $mobile-padding;
            }
            
            &-img{
                width: 50px;
                margin: 0 auto;
                padding-top: 20px;
                
                &--cross{
                    width: 40px; 
                    margin: 0 auto;
                    padding-top: 20px;
                }
            }

            &-title{
                font-weight: $font-bold;
                font-size: 26px;
                margin: 0;
                padding: 0;
            }

            &-strapline{
                font-size: 14px;
                margin: 0;
                padding: 0;
            }

            &-number{
                background-color: #1A1A1A;
                border: 1px solid #333;
                font-size: 18px;
                padding: 8px 60px;
                width: fit-content;
                margin: 0 auto;
                overflow: hidden;
                @media(max-width: $mbbp){
                    display: flex;
                    flex-direction: column;
                    padding: 8px;
                    font-size: 14px;

                }
                span{
                    font-weight: $font-bold;
                }
            }
        }
    }

</style>