import {
  CART_ADD_ITEM_REQUEST,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_DETAILS,
  CART_ADD_ITEM_SUCCESS,
  CART_ADD_ITEM_FAIL,
  CART_REMOVE_ITEM,
  CART_UPDATE_REQUEST,
  CART_UPDATE_SUCCESS,
  CART_UPDATE_FAIL,
  CART_GET_ITEMS_REQUEST,
  CART_GET_ITEMS_SUCCESS,
  CART_GET_ITEMS_FAIL,
} from "../constants/cartConstants"
import axios from "axios"

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_ADD_ITEM_REQUEST })

    const { data } = await axios.get(`/api/products/${id}`)
    const item = {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    }

    const { cart } = getState()
    const existItem = cart.cartItems.find((x) => x.product === item.product)
    if (existItem) {
      cart.cartItems = cart.cartItems.map((x) =>
        x.product === existItem.product ? item : x
      )
    } else {
      cart.cartItems = [...cart.cartItems, item]
    }

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data: cartData } = await axios.post(
      "/api/cart",
      { cartItems: cart.cartItems },
      config
    )
    dispatch({ type: CART_ADD_ITEM_SUCCESS, payload: cartData.cartItems })
    localStorage.setItem("cartItems", JSON.stringify(cartData.cartItems))
  } catch (error) {
    dispatch({
      type: CART_ADD_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: id })
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const updateCart = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_UPDATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []

    const { data } = await axios.post("/api/cart", { cartItems }, config)

    dispatch({ type: CART_UPDATE_SUCCESS })
  } catch (error) {
    dispatch({
      type: CART_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getItemsIntoCart = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_GET_ITEMS_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get("/api/cart/mycart", config)

    dispatch({ type: CART_GET_ITEMS_SUCCESS, payload: data })
    localStorage.setItem("cartItems", JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: CART_GET_ITEMS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_DETAILS,
    payload: data,
  })
  localStorage.setItem("shippingAddress", JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })
  localStorage.setItem("paymentMethod", JSON.stringify(data))
}
