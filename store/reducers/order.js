import { ADD_ORDER, SET_ORDER } from '../actions/order';
import Order from '../../models/order';

const initialState = {
  order: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER:
      return {
        order: action.orders,
      };
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.item,
        action.orderData.amount,
        action.orderData.date
      );
      return {
        ...state,
        order: state.order.concat(newOrder),
      };
    default:
      return state;
  }
};
