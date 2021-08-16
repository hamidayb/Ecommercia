import {
  GET_MY_ORDERS_FAIL,
  GET_MY_ORDERS_REQUEST,
  GET_MY_ORDERS_RESET,
  GET_MY_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELIVERED_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_RESET,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_RESET,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
  ORDER_PLACE_FAIL,
  ORDER_PLACE_REQUEST,
  ORDER_PLACE_RESET,
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
    case ORDER_PLACE_RESET:
      return {}
    default:
      return state
  }
}

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingDetails: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ORDER_DETAILS_SUCCESS:
      return { ...state, loading: false, order: action.payload }
    case ORDER_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload }
    case ORDER_DETAILS_RESET:
      return { ...state }
    default:
      return state
  }
}

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true }
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true }
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}

export const getMyOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MY_ORDERS_REQUEST:
      return { loading: true }
    case GET_MY_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload }
    case GET_MY_ORDERS_FAIL:
      return { loading: false, error: action.payload }
    case GET_MY_ORDERS_RESET:
      return {}
    default:
      return state
  }
}

export const ordersListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
      return { loading: true }
    case GET_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload }
    case GET_ORDERS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const orderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELETE_REQUEST:
      return { loading: true }
    case ORDER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case ORDER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const orderDeliveredReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVERED_REQUEST:
      return { loading: true }
    case ORDER_DELIVERED_SUCCESS:
      return { loading: false, success: true }
    case ORDER_DELIVERED_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_DELIVERED_RESET:
      return {}
    default:
      return state
  }
}
