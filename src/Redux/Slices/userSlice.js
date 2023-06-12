import { createSlice } from "@reduxjs/toolkit";

const user = {
    name : '',
    contact:''
}

export const userSlice = createSlice({
    name : 'user',
    initialState : user,
    reducers:{
        // reducers to dispacth the name and contact
        addNameAndContact:(state , action) => {
            const { name , contact} = action.payload;
            const newState = {
                name:name,
                contact:contact
            }
            
            console.log('userState' , newState);
            return newState;

        }
    }

})




//state getters
export const getUser = (state) => state.user;

export const { addNameAndContact} = userSlice.actions;
export default userSlice.reducer



