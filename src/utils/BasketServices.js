import useCustomToast from '../utils/useToast';
import DataService from './DataServices';
const { showToast } = useCustomToast();
const DataServices = new DataService();

export default class BasketService {
    async fetchBasket(){
        let data;
        await DataServices.get('/api/basket', {})
          .then(response => {
            data = response.data;
          })
          .catch(error => {
            showToast("Something went wrong while fetching your basket, please try again","error", 'top-right', 3500);
        });
        return data;
    };

    async submitCouponForm(basket, couponCode){
        let data;
        await DataServices.post(`/api/basket/${basket.id}/coupon`, {code: couponCode})
            .then(response => {
                if(response.success){
                    data = response.data;
                    showToast(response.message,"success", 'top-right', 3500);
                } else {
                    showToast(response.message,"warning", 'top-right', 3500);
                }
            })
            .catch(error => {
              console.error(error);
            });
        return data;
    };

    async checkout(basket, params){
        let data;
        await DataServices.post(`/api/basket/${basket.id}/checkout`, {...params})
            .then(response => {
                if(response.success){
                    data = response.data;
                    showToast("Success! Your transaction has been accepted.","success", 'top-right', 3500);
                } else {
                    showToast(response.message,"warning", 'top-right', 3500);
                }
            })
            .catch(error => {
              console.error(error); 
            });
        return data;
    };
}