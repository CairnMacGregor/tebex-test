export default class DataService {
    async get(endpoint, params = {}) {
      
        try {
            const response = await fetch(endpoint);
            const data = await response.json();
            if(data){
                return {
                    success: true,
                    data: data,
                    message: "Data fetched successfully",
                };
                
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    async post(endpoint, data) {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

        } catch (error) {
            return {
                success: false,
                message: error.message
            };
            
        }
    }
}