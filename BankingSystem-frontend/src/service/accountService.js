import axios from 'axios';

export class AccountService {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async createAccount(token, accountDetails) {
        console.log("account details At service", accountDetails);
        console.log(" At service", token);
       const accountNumber = accountDetails.data.accountNumber
       const accountType = accountDetails.data.accountType
       const balance= accountDetails.data.balance
        
        try {
            const payload = JSON.stringify(accountDetails);

            console.log("Request payload:", payload);
            const response = await axios.post(`${this.baseURL}/create`, {accountNumber,accountType,balance}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log("response.data at service class", response.data);
            return response.data;
        } catch (error) {
            console.error('There was a problem with the Axios operation:', error);
        }
    }
    
    

    async getAccountsOfLoggedInUser(token) {
        try {
            const response = await axios.get(`${this.baseURL}/all-accounts`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('There was a problem with the Axios operation:', error);
        }
    }

    async deleteAccount(token,accountId){
        console.log("token in service",token);
        console.log("acccont id in serviec", accountId);
        
        try{
        const response =await axios.delete(`${this.baseURL}/delete/${accountId}`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        });
        console.log("resonse status in service",response.status);
        
        return response.status;

    }catch(error){
        console.log("error cathced while deleteting account in service class",error);
        
    }
    }

    
    
}
