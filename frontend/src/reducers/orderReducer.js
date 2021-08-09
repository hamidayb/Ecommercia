import {
  ORDER_PLACE_FAIL,
  ORDER_PLACE_REQUEST,
  ORDER_PLACE_SUCCESS,
} from "../constants/orderConstants"

export const orderItemsReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PLACE_REQUEST:
      return {
        loading: true,
      }
    case ORDER_PLACE_SUCCESS:
      return { loading: false, success: true, orderInfo: action.payload }
    case ORDER_PLACE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
