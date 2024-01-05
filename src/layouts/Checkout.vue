<template>
    <section class = "checkout">    
        <div class = "checkout__half">
          <div  class = "checkout__half-inner left">
            <div class = "checkout__helf-inner--wrapper" v-if="loadingData === false && basket?.products" >
              <BasketSummary ref="basketSummaryForm" :basket="basket?.products"></BasketSummary>
              
              <CouponForm></CouponForm>
              <OrderSummary v-if="loadingData === false && basket" :summary="basket"></OrderSummary>
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

        &__loading{
          &-title{
            font-family: 'lato';
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
            font-family: 'lato';
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 20px;
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
            padding-top: 110px;
            &-inner{
              max-width: 475px;
              margin: auto;
             
              &.left{
                margin-right: 100px;
              }

              &.right{
                margin-left: 100px;
              }
            }
            &:first-child{
                background-color: $brand-grey;
            }
        }
    }
    .row{
    }
</style>

<script>
import BasketSummary from '../components/BasketSummary.vue';
import CouponForm from '../components/CouponForm.vue';  
import OrderSummary from '../components/OrderSummary.vue';
import PaymentForm from '../components/PaymentForm.vue';
import { ref, onMounted, nextTick } from 'vue';
import DataService from '../utils/DataServices.js';
import Loader from '../components/Loader.vue';
const DataServices = new DataService();
export default {
  components: {
    BasketSummary,
    CouponForm,
    OrderSummary,
    PaymentForm,
    Loader
  },
  setup() {
    let loadingData = ref(true);
    const basket = ref(null);
    let basketSummaryForm = ref(null);
    let paymentForm = ref(null);


    const fetchBasket = async () => {
      try {
        DataServices.get('/api/basket', {})
          .then(response => {
            basket.value = response;
            loadingData.value = false;
            nextTick(() => {
              setHeight();
            });
          })
          .catch(error => {
            console.log(error);
          });
      } catch (error) {
        console.error('Something went wrong while fetching products:', error);
      }
    };

    const setHeight = () => {
      if (paymentForm.value && basketSummaryForm.value) {
        const paymentFormHeight = paymentForm.value.$el.offsetHeight;
        basketSummaryForm.value.$el.style.minHeight = `${paymentFormHeight}px`;
      }
    };

    onMounted(() => {
      fetchBasket();
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