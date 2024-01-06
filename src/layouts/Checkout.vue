<template>
    <section class = "checkout">    
        <div class = "checkout__half">

          <div  class = "checkout__half-inner left">
            <div class = "checkout__helf-inner--wrapper" v-if="loadingData === false && basket?.products" >
              <BasketSummary ref="basketSummaryForm" :basket="basket?.products"></BasketSummary>
              <CouponForm :basket="basket"></CouponForm>
              <OrderSummary v-if="loadingData === false && basket"></OrderSummary>
            </div>
            <div class = "checkout__empty" v-else-if="loadingData === false && !basket?.products">
                <h4 class = "checkout__empty-title">Your order</h4>
                <h4 class = "checkout__empty-text">Your inventory is empty, adventurer! Visit our marketplace to equip yourself with some epic goods.</h4>
                <a href = "/" class = "checkout__empty-link">Shop</a>

              </div>
              <div v-else class = "checkout__loading">
                <h4 class = "checkout__loading-title">Your order</h4>
                <Loader ></Loader>
              </div>
          </div>
        </div>
        <div class = "checkout__half">
          <div class = "checkout__half-inner right">
            <PaymentForm :disabled ="loadingData === false && !basket?.products" ref="paymentForm"></PaymentForm>
          </div>
        </div>
    </section>
</template>

<style lang="scss">
    .checkout{
        display: flex;
        flex-direction: row;
        min-height: 100dvh;
        width: 100%;

        @media(max-width: $mbbp){
          flex-direction: column;
        }

        &__loading{
          &-title{
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 20px;
          }

         
        }

        &__empty{
          display: flex;
          flex-direction: column;
          gap: 20px;
          &-title{
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 20px;
          }  

          &-text{
            text-align: center;
          }
          
          &-link{
            width: fit-content;
            padding: 10px 40px;
            font-size: 12px;
            font-weight: 300;
            background-color: $brand-blue;
            color: #fff;
            transition: 0.35s ease-in-out;
            text-decoration: none;
            align-self: center;
            &:hover{
                color: $brand-blue;
                background-color: #fff;
                cursor: pointer;
            }
          }
        }

        &__half{
            max-width: 50%;
            width: 100%;
            padding: 0 20px;
            padding-top: 110px;

            @media(max-width: $mbbp){
              max-width: 100%;
              width: 100%;
              padding: 100px $mobile-padding;
            }

            &-inner{
              max-width: 455px;
              margin: auto;
              @media(max-width: $mbbp){
                max-width: 100%;
                width: 100%;
              }
              &.left{
                margin-right: 100px;
                @media(max-width: 1000px){
                  margin-right: 10%;
                }

                @media(max-width: $mbbp){
                  margin-right: 0px;
                }
              }

              &.right{
                margin-left: 100px;
                @media(max-width: 1000px){
                  margin-left: 10%;
                }
                @media(max-width: $mbbp){
                  margin-left: 0px;
                }
              }
            }
            &:first-child{
                background-color: $brand-grey;
            }
        }
    }
</style>

<script>
import BasketSummary from '../components/BasketSummary.vue';
import CouponForm from '../components/CouponForm.vue';  
import OrderSummary from '../components/OrderSummary.vue';
import PaymentForm from '../components/PaymentForm.vue';
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue';
import Loader from '../components/Loader.vue';

import { useBasketStore } from '../stores/BasketStore';
export default {
  components: {
    BasketSummary,
    CouponForm,
    OrderSummary,
    PaymentForm,
    Loader
  },
  setup() {
    const basketStore = useBasketStore();
    let loadingData = ref(true);
    let basketSummaryForm = ref(null);
    let paymentForm = ref(null);
    const basket = computed(() => basketStore.basket);

    const setHeight = () => {
      if (paymentForm.value && basketSummaryForm.value) {
        if(window.matchMedia("(min-width: 768px)").matches){
          const paymentFormHeight = paymentForm.value.$el.offsetHeight;
          basketSummaryForm.value.$el.style.minHeight = `${paymentFormHeight}px`;
        } else {
          basketSummaryForm.value.$el.style.minHeight = `auto`;
        }
      }
    };

    onMounted(() => {
        loadingData.value = false;
        window.addEventListener('resize', setHeight);
        nextTick(() => {
          setHeight();
        });
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', setHeight);
    });

    return {
        basket,
        loadingData,
        paymentForm,
        basketSummaryForm
    };
  }
};
</script>