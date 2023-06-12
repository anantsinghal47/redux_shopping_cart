import { createSlice } from "@reduxjs/toolkit";

const cart = {
    cartItems: [
        
    ],
    totalValue: '0'
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: cart,
    reducers: {
        // reducers to dispacth the name and contact
        addToCart: (state, action) => {
            const { item } = action.payload;
            const itemInCart = state.cartItems.find((itm) => itm.id === item.id);
            if (itemInCart) {
                 const removeItem = state.cartItems.filter((itm) => itm.id !== item.id);
                 var updatedItem = {...item , quantity : parseInt(item.quantity + 1)}
                 console.log(updatedItem);  

                
                const newState = {
                cartItems : [
                    ...removeItem,
                   updatedItem
                ],
                totalValue : parseInt(state.totalValue) + (parseInt(item.quantity)*parseInt(item.price)) 

              }

              console.log(newState)

              return newState;




            } else {
               
                item.quantity++;
               const newState = {
                 cartItems : [
                    ...state.cartItems,
                    item
                 ],
                 totalValue : parseInt(state.totalValue) + (parseInt(item.quantity)*parseInt(item.price)) 

               }

               return newState;
            }


          },
          incrementQuantity: (state, action) => {
            const { item } = action.payload;
            const itemInCart = state.cartItems.find((itm) => itm.id === item.id);
            itemInCart.quantity++;
          },
          decrementQuantity: (state, action) => {
            const { item } = action.payload;

            const itemInCart = state.cartItems.find((itm) => itm.id === item.id);
            if (itemInCart.quantity === 1) {
                itemInCart.quantity = 1
            } else {
                itemInCart.quantity--;
            }
          },
          removeItem: (state, action) => {
            const { item } = action.payload;
            const removeItem = state.cartItems.filter((itm) => itm.id !== item.id);
            state.cartItems = removeItem;
          },
    }

})




//state getters
export const getCart = (state) => state.cart;
export const getItem = (state,id) => state.cart.cartItems.find((itm) => itm.id === id);


export const { addToCart , incrementQuantity , decrementQuantity , removeItem} = cartSlice.actions;
export default cartSlice.reducer



