import {
  ORDER_PLACE_REQUEST,
  ORDER_PLACE_SUCCESS,
  ORDER_PLACE_FAIL,
} from "../constants/orderConstants"
import axios from "axios"

export const placeOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PLACE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post("/api/orders", order, config)
    console.log(data)
    dispatch({
      type: ORDER_PLACE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_PLACE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
