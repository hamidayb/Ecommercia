import {
  CART_ADD_ITEM_FAIL,
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_REMOVE_ITEM,
  CART_UPDATE_FAIL,
  CART_UPDATE_REQUEST,
  CART_UPDATE_SUCCESS,
  CART_GET_ITEMS_FAIL,
  CART_GET_ITEMS_REQUEST,
  CART_GET_ITEMS_SUCCESS,
  CART_RESET,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_DETAILS,
} from "../constants/cartConstants"

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CART_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: action.payload,
      }
    case CART_ADD_ITEM_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      }

    case CART_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CART_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      }
    case CART_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case CART_GET_ITEMS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CART_GET_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: action.payload,
      }
    case CART_GET_ITEMS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case CART_SAVE_SHIPPING_DETAILS:
      return {
        ...state,
        shippingAddress: action.payload,
      }

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      }

    case CART_RESET:
      return { cartItems: [], shippingAddress: {} }

    default:
      return state
  }
}
