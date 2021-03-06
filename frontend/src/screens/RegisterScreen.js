import { useState, useEffect } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { register } from "../actions/userActions"
import FormContainer from "../components/FormContainer"
import Message from "../components/Message"
import Loader from "../components/Spinner"
import Meta from "../components/Meta"

const LoginScreen = ({ location, history }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const loginData = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = loginData

  const redirect = location.search ? location.search.split("=")[1] : "/"

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [userInfo, history, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!")
    } else {
      dispatch(register(name, email, password))
    }
  }
  return (
    <>
      <Meta title={"Ecommercia | Register"} />
      <FormContainer>
        <h1>REGISTER</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter full name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            type='submit'
            variant='primary'
            className='my-3'
            onClick={submitHandler}
          >
            Register
          </Button>
        </Form>

        <Row className='py-3'>
          <Col>
            Already have an Account? <Link to='/register'>Sign in</Link>
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/login"}
            ></Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  )
}

export default LoginScreen
