import axios from 'axios';

export class UserService {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async getCurrentLoggedInUser(token) {
        try {
            console.log("userService getUser", token);
            
            const response = await axios.get(`${this.baseURL}/current-user`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("userService getUser rsponse", response.data);
            
            return response.data;
        } catch (error) {
            console.error('Error while fetching current user', error);
            throw error;
        }
    }

    // FIXME: if Problem occures send userDetails in Object form
    async updateUser(token,userDetails) {
        try {
            const response = await axios.put(`${this.baseURL}/update`, userDetails, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error('Error while updating user', error);
            throw error;
    }
}

    async deleteUser(token) {
        try {
            const response = await axios.delete(`${this.baseURL}/delete`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error('Error while deleting user', error);
            throw error;
        }
    }
   
}
