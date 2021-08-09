import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ListGroup, Row, Col, Image, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { PayPalButton } from "react-paypal-button-v2"
import Message from "../components/Message"
import { orderPayAction, getOrderDetails } from "../actions/orderActions"
import Loader from "../components/Spinner"
import axios from "axios"
import { ORDER_PAY_RESET } from "../constants/orderConstants"

export const PlaceOrderScreen = ({ match }) => {
  const [sdkReady, setSdkReady] = useState(false)
  const orderId = match.params.id

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { loading, order, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const roundOff = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  if (order) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    )
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientID } = await axios.get("/api/config/paypal")
      const script = document.createElement("script")
      script.type = "text/javascript"
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientID}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!orderId.isPaid) {
      // checks if paypal script is added or not
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, orderId, order, successPay])

  const paymentSuccessHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(orderPayAction(orderId, paymentResult))
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : order ? (
        <>
          <h2>Order # {order._id}</h2>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>Shipping Address</h3>
                  <p>
                    <strong>Name:</strong>
                    {order.user.name}
                  </p>
                  <p>
                    <strong>Email:</strong>
                    <a href={`mailto: ${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>
                  <p>
                    <strong>Address:</strong>
                    {order.shippingAddress.address},{order.shippingAddress.city}
                    {order.shippingAddress.postalCode},
                    {order.shippingAddress.country}
                  </p>
                  {order.isPaid ? (
                    <Message variant="success">Delivered</Message>
                  ) : (
                    <Message variant="danger">Not Delivered</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h3>Payment Method</h3>
                  <p>
                    <strong>Method:</strong> {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message variant="success">Paid</Message>
                  ) : (
                    <Message variant="danger">Not Paid</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h3>Ordered Items</h3>
                  {order.orderItems.length === 0 ? (
                    <Message>You cart is empty</Message>
                  ) : (
                    <ListGroup variant="flush">
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image src={item.image} fluid rounded></Image>
                            </Col>
                            <Col>
                              <Link
                                to={`/product/${item._id}`}
                                style={{ textDecoration: "none" }}
                              >
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x {roundOff(item.price)} ={" "}
                              {roundOff(item.qty * item.price)}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup>
                  <ListGroup.Item>
                    <h3>ORDER SUMMARY</h3>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Items: </Col>
                      <Col>${order.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping: </Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax: </Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total: </Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  {!order.isPaid && (
                    <ListGroup.Item>
                      {loadingPay && <Loader />}
                      {!sdkReady ? (
                        <Loader />
                      ) : (
                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={paymentSuccessHandler}
                        />
                      )}
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      ) : (
        <Message variant="danger">Unexpected error</Message>
      )}
    </>
  )
}

export default PlaceOrderScreen
