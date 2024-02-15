import {createContext, useContext, useReducer} from 'react';
import { faker } from '@faker-js/faker';
import { cartReducer } from './reducers';


const Cart = createContext();


const Context = ({children}) => {

    
   

    const products = [...Array(20)].map(() => ({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.urlLoremFlickr({ category: 'electronics' }),
        inStock: faker.number.int({min:0, max:3} ),
        fastDelivery: faker.datatype.boolean()
       
    }));

    console.log( products.inStock)
    
    const [state, dispatch] = useReducer(cartReducer, {
        products:products,
        cart: []

     } )

  return (
   <Cart.Provider value={{state , dispatch}}> 
    {children}
   </Cart.Provider>  
  )
}

export default Context;

export const CartState = () => {

    return useContext(Cart)
};