import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import { ADD_ORDER } from '../actions/order';
import CartItem from '../../models/cart-item';
import { DELE_PRODUCT } from '../actions/products';

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    //otra opcion action.product
    case ADD_TO_CART:
      const addProduct = action.product;
      const prodPrice = addProduct.price;
      const prodTitle = addProduct.title;
      let updatedOrNewCartItem;
      if (state.items[addProduct.id]) {
        //already have item in the cart
        updatedOrNewCartItem = new CartItem(
          state.items[addProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addProduct.id].sum + prodPrice
        );
      } else {
        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }
      return {
        ...state,
        items: { ...state.items, [addProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice,
      };
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.pid];
      const currentQty = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
      };
    case ADD_ORDER:
      return initialState;
      case DELE_PRODUCT:
        if (!state.items[action.pid]) {
          return state;
        }
        const updatedItems={...state.items};
        const itemTotal=state.items[action.pid].sum
        delete updatedItems[action.pid]
        return{
          ...state,
          items:updatedItems,
          totalAmount:state.totalAmount-itemTotal
        }
    default:
      return state;
  }
};
