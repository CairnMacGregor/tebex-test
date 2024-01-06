import 'isomorphic-fetch';
export default class DataService {
    async get(endpoint, params = {}) {
        try {
            const response = await fetch(endpoint);
            const data = await response.json();
            if (data) {
                return {
                    success: true,
                    data: data,
                    showToast: true,
                    message: "Data fetched successfully",
                };

            }
        } catch (error) {
            return {
                success: false,
                showToast: false,
                message: "Something went wrong while fetching product data"
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

            if (responseData) {
                return {
                    success: responseData.success,
                    data: responseData,
                    message: responseData.message
                };
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            };

        }
    }
}