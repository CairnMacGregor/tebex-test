export default class DataService {
    async get(endpoint, params = {}) {
      
        try {
            const response = await fetch(endpoint);
            const data = await response.json();
            if(data){
                return data;
            }
        } catch (error) {
            return error;
        }
    }

    async post(route, data, callback, errorCallback) {
        try {
            const response = await fetch(route, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();

            if (typeof callback === 'function') {
                callback(responseData);
            }
        } catch (error) {

            if (typeof errorCallback === 'function') {
                errorCallback(error);
            }
        }
    }
}