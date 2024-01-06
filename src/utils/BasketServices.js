import useCustomToast from '../utils/useToast';
import DataService from './DataServices';
const { showToast } = useCustomToast();
const DataServices = new DataService();

export default class BasketService {
    async fetchBasket(url = '/api/basket') {
        let data;
        await DataServices.get(url, {})
          .then(response => {
            data = response.data;
          })
          .catch(error => {
            showToast("Something went wrong while fetching your basket, please try again","error", 'top-right', 3500);
        });
        return data;
    };

    async submitCouponForm(basket, couponCode, url = `/api/basket/${basket.id}/coupon`){
        let data;
        await DataServices.post(url, {code: couponCode})
            .then(response => {
                if(response.success){
                    data = response.data;
                    showToast(response.message,"success", 'top-right', 3500);
                } else {
                    data = {
                        success:false,
                        message: response.message
                    }
                    showToast(response.message,"warning", 'top-right', 3500);
                }
            })
            .catch(error => {
                console.log(error)
            });
        return data;
    };

    async checkout(basket, params, url = `/api/basket/${basket.id}/checkout`){
        let data;
        await DataServices.post(url, {...params})
            .then(response => {
                if(response.success){
                    data = response.data;
                    showToast("Success! Your transaction has been accepted.","success", 'top-right', 3500);
                } else {
                    data = {
                        success:false,
                        message: response.message
                    }
                    showToast(response.message,"warning", 'top-right', 3500);
                }
            })
            .catch(error => {
              console.error(error); 
            });
        return data;
    };
}