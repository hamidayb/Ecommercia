import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { getUserDetails, updateUser } from "../actions/userActions"
import FormContainer from "../components/FormContainer"
import Message from "../components/Message"
import Loader from "../components/Spinner"
import Meta from "../components/Meta"
import { USER_UPDATE_RESET } from "../constants/userConstants"

const EditUser = ({ match, history }) => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [isAdmin, setIsAdmin] = useState()

  const userId = match.params.id

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success } = userUpdate

  useEffect(() => {
    if (success) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push("/admin/users")
    } else {
      if (user && user._id === userId) {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      } else {
        dispatch(getUserDetails(userId))
      }
    }
  }, [history, user, dispatch, userId, success])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, name, email, isAdmin }))
  }
  return (
    <>
      <Meta title={`Admin | ${userId}`} />
      <Link to='/admin/users' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{error}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
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

            <Form.Group controlId='isAdmin'>
              <Form.Check
                type='checkbox'
                label='Admin'
                checked={isAdmin}
                value={!isAdmin}
                onChange={(e) => {
                  setIsAdmin(e.target.checked)
                }}
              ></Form.Check>
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
        )}
      </FormContainer>
    </>
  )
}

export default EditUser
