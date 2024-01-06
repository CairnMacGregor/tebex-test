<template>
    <section :class="{'payment-form': true, 'disabled': disabled}">
        <h4 class = "payment-form__title"><span class = "payment-form__title--colored">Make Payment</span><img src = "/img/arrow.svg" class = "payment-form__title--arrow">Order Confirmed</h4>
        <FormKit 
            type="form"  
            :actions="false"
            :disabled="disabled"
            #default="{ disabled }"
            class="payment-form__form"
            @submit="submitPaymentForm"
        >
            <FormKit
                name="email"
                type="email"
                label="Email*"
                validation="required|email"
                placeholder="Enter your email address"
                :validation-messages="{
                  required: 'Please enter your email address.'}"
            />
            <FormKit
                name="cardNumber"
                type="tel"
                label="Card number*"
                autocomplete="cc-number" 
                placeholder="Card Number"
                validation="required"
                v-mask="'#### #### #### ####'"
                :validation-messages="{
                  required: 'Please enter your card number.'}"
            />
            <div class="form-group">
                <FormKit
                    name="cardExpiry"
                    type="text"
                    label="Expiry Date*"
                    validation="required"
                    placeholder="MM/YY"
                    v-mask="'##/##'"
                    :validation-messages="{
                      required: 'Please enter your card\'s expiry date.'
                    }"
                />
                <FormKit
                    name="cardCvc"
                    type="text"
                    label="CVC/CVV*"
                    validation="required"
                    placeholder="123"
                    step="0"
                    maxlength="4"
                    v-mask="'####'"
                    :validation-messages="{
                      required: 'Please enter your CVC/CVV number.'}"
                />
                <FormKit
                    name="postalCode"
                    type="text"
                    label="Zip Code/Postal Code*"
                    validation="required"
                    placeholder="PO12 1AB"
                    :validation-messages="{
                      required: 'Please enter your Zip/Postcode.'}"
                />
            </div>
            <FormKit
                    name="nameOnCard"
                    type="text"
                    label="Name on card*"
                    validation="required"
                    placeholder="Enter your name as shown"
                    :validation-messages="{
                      required: 'Please enter the name on your card.'}"
                />
            <FormKit v-if="!loadingData"
              type="submit"
              label="Pay by Card"
              :disabled="disabled"
            />
            <Loader v-else></Loader>
        </Formkit>
    </section>
</template>

<script setup>
    import { computed, ref} from 'vue';
    import BasketService from '../utils/BasketServices';
    import { useBasketStore } from '../stores/BasketStore';
    import Loader from './Loader.vue';
    import { useRouter } from 'vue-router';
    const BasketServices = new BasketService();
    const basketStore = useBasketStore();
    const basket = computed(() => basketStore.basket);
    const loadingData = ref(false);
    const props = defineProps({
        disabled: Boolean
    });

    const router = useRouter(); 

    const submitPaymentForm = async (data) => {

      loadingData.value = true;
      try {
        const response = await BasketServices.checkout(basket.value, data);
        if(response?.success){
            basketStore.setTransactionId(response.transactionId);
            loadingData.value = false;

            router.push({ name: 'order-complete', params: { "transactionId": basket.value.transactionId } });
        }
      } catch (error) {
        console.error(error); 
        loadingData.value = false;
      }
    }

</script>

<style lang = "scss">

    .payment-form{
        margin: auto;
        color: #fff;
        margin-bottom: 25px;

        &.disabled{
            opacity: 0.5;
            &:hover{
                * {
                    cursor: not-allowed;
                }
            }
        }

        .formkit-form{
            display: flex;
            flex-direction: column;
            gap: 12px;

            .form-group{
                display: grid;
                gap: 12px;
                grid-template-columns: calc(27.5% - 6px) calc(27.5% - 6px) calc(45% - 12px);
               
            }
        }

        &__title{
            font-size: 12px;
            font-weight: $font-bold;
            margin-bottom: 20px;
            color: $dull-text-color;
            &--colored{
                color: $brand-blue;
            }

            &--arrow{
                scale: 1.5;
                margin: auto 10px;
            }
        }

        &__basket{
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
    }

</style>