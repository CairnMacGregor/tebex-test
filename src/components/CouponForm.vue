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
    import DataService from '../utils/DataServices.js';
    import { ref} from 'vue';
    let couponCode = ref('');
    let loadingData = ref(false);
    const DataServices = new DataService();

    const props = defineProps({
        basketID: {
            type: Number,
            default: null
        }
    });

    console.log(props.basketID);
    const submitCouponForm = (e) => {
        e.preventDefault();
        loadingData.value = true;   
        DataServices.post(`/api/basket/${props.basketID}/coupon`, {code: couponCode.value})
            .then(response => {
              loadingData.value = false;
            })
            .catch(error => {
              console.log(error);
            });
        
    }

</script>

<style lang ="scss">

    .coupon-form{
        margin-bottom: 24px;
        &__title{
            font-size: 12px;
            font-weight: bold;
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
            font-weight: 300;
        }   

        &__submit{
            padding: 8px;
            font-size: 12px;
            font-weight: 300;
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

