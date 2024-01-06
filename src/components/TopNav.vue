<template>
    <nav class = "nav" :class="{ scrolled: isScrolled }">
        <div :class="{'nav-wrapper' : true, [position]: true}">
            <a v-if="position" href="/" class="brand-logo"><img src="/img/logo.svg" class="logo" alt="logo" /></a>
        </div>
    </nav>
</template>
<script setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue';
    const props = defineProps({
        position: String,
        default: false
    });

    const isScrolled = ref(false);
    const handleScroll = () => {
      isScrolled.value = window.scrollY > 0;
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
    });
</script>

<style lang = "scss">

    .nav{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        background-color: transparent;
        transition: 0.35s ease-in-out;

        .logo{
            transition: 0.35s ease-in-out;
        }
        &.scrolled{
            background-color: $brand-blue;
            box-shadow: 0px 0px 10px rgba(0,0,0,0.1);

            .nav-wrapper{
                padding: 0px 5%;
                a{
                    .logo{
                        scale: .75;                           
                    }
                }
            }
        }

        &-wrapper{
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 0 20px;
            padding-top: 35px;
            max-width: 1190px;
            margin: auto;
            @media(max-width:$mbbp){
                transition: 0.35s ease-in-out;
                padding: $mobile-padding;
            }

            &.left{
                justify-content: flex-start;
            }

            &.center{
                justify-content: center;
            }
        }

        
    }

</style>