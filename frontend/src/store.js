import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  createProductReviewReducer,
  productTopReducer,
} from "./reducers/productReducers"
import { cartReducer } from "./reducers/cartReducers"
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  usersListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers"
import {
  orderItemsReducer,
  orderDetailsReducer,
  orderPayReducer,
  getMyOrdersReducer,
  ordersListReducer,
  orderDeleteReducer,
  orderDeliveredReducer,
} from "./reducers/orderReducer"

const reducer = combineReducers({
  productList: productListReducer,
  productTop: productTopReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: createProductReviewReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdatedProfile: userUpdateProfileReducer,
  createdOrder: orderItemsReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliveredReducer,
  ordersList: ordersListReducer,
  myOrders: getMyOrdersReducer,
  orderDelete: orderDeleteReducer,
  usersList: usersListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
})

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {}

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : null

const initialState = {
  cart: {
    cartItems: [],
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
