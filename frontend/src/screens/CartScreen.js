import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  addToCart,
  removeFromCart,
  getItemsIntoCart,
  changeQty,
  updateCart,
} from "../actions/cartActions"
import { Link } from "react-router-dom"
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap"
import Message from "../components/Message"
import Loader from "../components/Spinner"

const CartScreen = ({ match, location, history }) => {
  const productID = match.params.id
  const qty = location.search ? Number(location.search.split("=")[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { loading, cartItems, error } = cart

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (productID && userInfo) {
      dispatch(addToCart(productID, qty))
    } else if (productID && !userInfo) {
      history.push("/cart")
    } else {
      if (userInfo) {
        dispatch(getItemsIntoCart())
      }
    }
  }, [dispatch, history, userInfo, productID, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const updateQty = (id, qty) => {
    dispatch(changeQty(id, qty))
  }

  const checkoutHandler = () => {
    dispatch(updateCart())
    history.push("/login?redirect=shipping")
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
              <Message>
                Cart is empty <Link to="/">Go Back</Link>
              </Message>
            ) : (
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.product}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={3}>
                        <Link
                          to={`/product/${item.product}`}
                          className="product-heading"
                        >
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={2}>${item.price}</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={item.qty}
                          onChange={(e) =>
                            updateQty(item.product, e.target.value)
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col md={2}>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}) Items
                  </h2>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed()}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default CartScreen
