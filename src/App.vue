<script>
import Checkout from './layouts/Checkout.vue';
import { useBasketStore } from './stores/BasketStore';
import BasketService from './utils/BasketServices.js';
import { Suspense, ref, onMounted, computed } from 'vue';
import { useRoute, RouterView } from 'vue-router'
import TopNav from './components/TopNav.vue';
export default {
  components: {
    Checkout,
    Suspense,
    RouterView,
    TopNav
  },
  setup() {
    const BasketServices = new BasketService();
    const store = useBasketStore();
    const isBasketLoaded = ref(false); 
    const route = useRoute();
    const position = computed(() => {
      return route.meta.position;
    });
    onMounted(async () => {
      if(store.basket === null){
        const fetchedBasket = await BasketServices.fetchBasket();
        store.setBasket(fetchedBasket);
      }
      isBasketLoaded.value = true;
    });

    return {
      store,
      isBasketLoaded,
      position
    }
  }
};
</script>

<template>
   <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <div :key="$route.name">
          <TopNav :position="position"></TopNav>
          <component :is="Component" v-if="isBasketLoaded"></component>
        </div>
      </transition>
    </router-view>
</template>

<style scoped>

.logo {
  height: 4em;
  padding: 1.5em;
  display: block;
  margin: 0 auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>