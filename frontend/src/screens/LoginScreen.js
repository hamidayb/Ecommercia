import { useState, useEffect } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../actions/userActions"
import FormContainer from "../components/FormContainer"
import Message from "../components/Message"
import Loader from "../components/Spinner"

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const loginData = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = loginData

  const redirect = location.search ? location.search.split("=")[1] : "/"

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [userInfo, history, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  return (
    <FormContainer>
      <h1>SIGN IN</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
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

        <Button type="submit" variant="primary" className="my-3">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New User? <Link to="/register">Sign up</Link>
          <Link
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
          ></Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
