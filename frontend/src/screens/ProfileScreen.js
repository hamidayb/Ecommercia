import { useState, useEffect } from "react"
import { Form, Button, Row, Col, Table } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { getUserDetails, getUpdatedProfile } from "../actions/userActions"
import Message from "../components/Message"
import Loader from "../components/Spinner"
import { getMyOrders } from "../actions/orderActions"

const LoginScreen = ({ history }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdatedProfile = useSelector((state) => state.userUpdatedProfile)
  const { success } = userUpdatedProfile

  const myOrders = useSelector((state) => state.myOrders)
  const { loading: loadingOrders, orders, error: errorOrders } = myOrders

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    } else {
      if (user && user.name) {
        setName(user.name)
        setEmail(user.email)
      } else {
        dispatch(getUserDetails("profile"))
        dispatch(getMyOrders())
      }
    }
  }, [userInfo, user, dispatch, history])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!")
    } else {
      setMessage(null)
      dispatch(getUpdatedProfile({ _id: user._id, name, email, password }))
    }
  }
  return (
    <Row>
      <Col md={4}>
        <h2>YOUR PROFILE</h2>
        {message && <Message variant="danger">{message}</Message>}
        {success && <Message>Profile Updated</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="my-3"
            onClick={submitHandler}
          >
            Update
          </Button>
        </Form>
      </Col>
      <Col md={8}>
        <h2>Your Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          class="far fa-times-circle"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          class="far fa-times-circle"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className="btn-sm" variant="light">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default LoginScreen
