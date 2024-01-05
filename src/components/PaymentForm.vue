<template>
    <section :class="{'payment-form': true, 'disabled': disabled}">
        <!-- ... other code -->
        <FormKit 
            type="form"  
            :actions="false"
            #default="{ disabled }" 
            class="payment-form__form"
        >
            <FormKit
                type="email"
                label="Email*"
                validation="required|email"
                placeholder="Enter your email address"
                :validation-messages="{
                  required: 'Please enter your email address.'}"
            />
            <FormKit
                type="text"
                label="Card number*"
                validation="required"
                placeholder="MM/YY"
                :validation-messages="{
                  required: 'Please enter your email address.'}"
            />
            <div class="form-group">
                <FormKit
                    type="text"
                    label="Expiry Date*"
                    validation="required"
                    placeholder="Enter your email address"
                    :validation-messages="{
                      required: 'Please enter your email address.'}"
                />
                <FormKit
                    type="number"
                    label="CVC/CVV*"
                    validation="required"
                    placeholder="123"
                    step="0"
                    :validation-messages="{
                      required: 'Please enter your email address.'}"
                />
                <FormKit
                    type="text"
                    label="Zip Code/Postal Code*"
                    validation="required"
                    placeholder="PO12 1AB"
                    :validation-messages="{
                      required: 'Please enter your email address.'}"
                />
            </div>
            <FormKit
                    type="text"
                    label="Name on card*"
                    validation="required"
                    placeholder="Enter your name as shown"
                    :validation-messages="{
                      required: 'Please enter the name on your card.'}"
                />
            <FormKit
              type="submit"
              label="Pay by Card"
            />
        </Formkit>
    </section>
</template>

<script setup>
    const props = defineProps({
        disabled: Boolean
    });
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
        &__title{
            font-size: 12px;
            font-weight: bold;
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