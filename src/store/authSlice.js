import {createSlice} from '@reduxjs/toolkit'

const initialState={
    status:false,      //user authenticated nhi h abhi 
    userData:null,      //user data nhi h abhi  
}
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status=true;
            state.userData=action.payload.userData;
        },
        logout:(state)=>{
            state.status=false;
            state.userData=null;
        }
    }
});
export const {login,logout}=authSlice.actions;
export default authSlice.reducer;