import {
  CART_ADD_ITEM_FAIL,
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_GET_ITEMS_FAIL,
  CART_GET_ITEMS_REQUEST,
  CART_GET_ITEMS_SUCCESS,
  CART_CHANGE_QTY_FAIL,
  CART_CHANGE_QTY_REQUEST,
  CART_CHANGE_QTY_SUCCESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_DETAILS,
  CART_REMOVE_ITEM_REQUEST,
  CART_REMOVE_ITEM_SUCCESS,
  CART_REMOVE_ITEM_FAIL,
  CART_UPDATE_REQUEST,
  CART_UPDATE_SUCCESS,
  CART_UPDATE_FAIL,
  CART_EMPTY_REQUEST,
  CART_EMPTY_SUCCESS,
  CART_EMPTY_FAIL,
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

    case CART_REMOVE_ITEM_REQUEST:
      return {
        ...state,
      }
    case CART_REMOVE_ITEM_SUCCESS:
      return {
        ...state,
        cartItems: action.payload,
      }
    case CART_REMOVE_ITEM_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case CART_CHANGE_QTY_REQUEST:
      return {
        ...state,
      }
    case CART_CHANGE_QTY_SUCCESS:
      return {
        ...state,
        cartItems: action.payload,
      }

    case CART_CHANGE_QTY_FAIL:
      return {
        ...state,
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

    case CART_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CART_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: action.payload,
      }
    case CART_UPDATE_FAIL:
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

    case CART_EMPTY_REQUEST:
      return { ...state, loading: true }

    case CART_EMPTY_SUCCESS:
      return { ...state, loading: false, cartItems: action.payload }

    case CART_EMPTY_FAIL:
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}
