import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../actions/cartActions"
import { Link } from "react-router-dom"
import { Row, Col, ListGroup, Image, Form, Button } from "react-bootstrap"

import Message from "../components/Message"

const CartScreen = ({ match, location, history }) => {
  const productID = match.params.id
  const qty = location.search ? Number(location.search.split("=")[1]) : 1

  const dispatch = useDispatch()

  const selector = useSelector((state) => state.cart)
  const { cartItems } = selector

  const removeFromCartHandler = (id) => {}

  useEffect(() => {
    if (productID) {
      dispatch(addToCart(productID, qty))
    } else {
    }
  }, [dispatch, productID, qty])

  return (
    <div>
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
                        value={qty}
                        onChange={(e) =>
                          dispatch(addToCart(item.product, item.qty))
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
      </Row>
    </div>
  )
}

export default CartScreen
