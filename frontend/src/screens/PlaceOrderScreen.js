import { Link } from "react-router-dom"
import { ListGroup, Button, Row, Col, Image, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import CheckoutSteps from "../components/CheckoutSteps"
import Message from "../components/Message"

export const PlaceOrderScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)

  const roundOff = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )

  cart.shippingPrice = Number(cart.itemsPrice >= 200 ? 0 : 100)

  cart.taxPrice = roundOff(Number(0.5 * cart.itemsPrice))

  cart.totalPrice = roundOff(
    Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
  )

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>Shipping Address</h3>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address},{cart.shippingAddress.city}
                {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>Payment Method</h3>
              <p>
                <strong>Method:</strong> {cart.paymentMethod.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>Ordered Items</h3>
              {cart.cartItems.length === 0 ? (
                <Message>You cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item) => (
                    <ListGroup.Item>
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
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping: </Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax: </Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total: </Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
