import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AccountService } from "../service/accountService";

const accountService = new AccountService('http://localhost:8080/api/account');

export const getAccountsOfUser = createAsyncThunk(
    'account/getAccountsOfUser',
    async (token, { rejectWithValue }) => {
        try {
            const response = await accountService.getAccountsOfLoggedInUser(token);
            console.log("account respose",response );
            
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createAccount=createAsyncThunk(
    "account/create",
    async (accountData,{rejectWithValue})=>{
                console.log("account Data",accountData);
        const {token, ...fields} =accountData;
        console.log("token after destructure",token);
       
        try{
          const response=await accountService.createAccount(token,fields)
         console.log("response at slice",response);
          return response;
        }
        catch(error){
            console.log("error at slice",error);
            
                return rejectWithValue(error);
            
        }
    }
)

export const updateAccount = createAsyncThunk(
    'account/updateAccount',
    async ({ token, accountData }, { rejectWithValue }) => {
        try {
            const response = await accountService.updateAccount(token, accountData);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteAccount = createAsyncThunk(
    'account/deleteAccount',
    async (userData, { rejectWithValue }) => {
        const {token,accountId}=userData

        console.log("token in slice",token);
        console.log("acccont id in slice", accountId);
        try {
            const response = await accountService.deleteAccount(token,accountId);
            console.log("respoonse in slice",response);
            return response;
            
        } catch (error) {
            console.log(
                "error at this fucking slice",error
            );
            
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    account: [
        {
            accountId: null,
            accountNumber: "",
            accountType: "",
            balance: 0.0,
            userId: null,
            openDate: null,
        }
    ],
    loading: false,
    error: null
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAccountsOfUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAccountsOfUser.fulfilled, (state, action) => {
                state.loading = false;
                state.account = action.payload;
            })
            .addCase(getAccountsOfUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAccount.fulfilled, (state, action) => {
                state.loading = false;
                state.account = action.payload;
            })
            .addCase(updateAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteAccount.pending, (state) => {
                state.loading = true;
                
                state.error = null;
            })
            .addCase(deleteAccount.fulfilled, (state, action) => {
                state.loading = false;
                console.log("account deleted",action.payload);
               state.account=state.account.filter((eachAccount)=>eachAccount.accountId!==action.payload)
            })
            .addCase(deleteAccount.rejected, (state, action) => {
                state.loading = false;
                console.log("account deleteion failed",action.payload);
                state.error = action.payload;
            })
            .addCase(createAccount.pending,(state)=>{
                state.loading=false;
                state.error=null
            })
            .addCase(createAccount.rejected,(state,action)=>{
               state.loading=false;
               console.log("account rejected",action.payload);
               state.error=action.payload 
            })
            .addCase(createAccount.fulfilled,(state,action)=>{
                state.loading=false;
                state.account.push(action.payload);
                
                
            })
    }
});

export default accountSlice.reducer;
