<template>
    <div class ="coupon-form">
        <h4 class ="coupon-form__title">Coupon/Gift Card</h4>
        <form class ="coupon-form__form" @submit="submitCouponForm">
            <input class ="coupon-form__input" type="text" v-model="couponCode" placeholder="Enter code here">
            <input class ="coupon-form__submit" type="submit" value = "Confirm">
        </form>
    </div>
</template>

<script setup>
    import BasketService from '../utils/BasketServices.js';
    import { ref} from 'vue';
    import { useBasketStore } from '../stores/BasketStore';
    const BasketServices = new BasketService();
    const basketStore = useBasketStore();

    let couponCode = ref('');
    let loadingData = ref(false);

    const props = defineProps({
        basket: {
            type: Object,
            default: null
        }
    });

    const submitCouponForm = async (e) => {
      e.preventDefault();
        if (!couponCode.value.trim()) {
            return;
        }
      loadingData.value = true;
      try {
        const response = await BasketServices.submitCouponForm(props.basket, couponCode.value);
        if(response?.success){
            basketStore.setBasket(response.data);
            couponCode.value = '';
        }
      } catch (error) {
        console.error(error); 
      }
      loadingData.value = false;
    };
    

</script>

<style lang ="scss">

    .coupon-form{
        margin-bottom: 24px;
        &__title{
            font-size: 12px;
            font-weight: $font-bold;
            margin-bottom: 5px;
        }

        &__form{
            display: flex;
            flex-direction: row;
            gap: 12px;
        }

        &__input{
            padding: 8px;
            font-size: 12px;
            font-weight: $font-regular;
        }   

        &__submit{
            padding: 8px;
            font-size: 12px;
            font-weight: $font-regular;
            background-color: #fff;
            color: $submit-text;
            transition: 0.35s ease-in-out;
            &:hover{
                color: #fff;
                background-color: $submit-text;
                cursor: pointer;
            }
        }
    }

</style>

