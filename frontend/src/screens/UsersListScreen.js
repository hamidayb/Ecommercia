import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Table, Button } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { getUserList, deleteUser } from "../actions/userActions"
import Loader from "../components/Spinner"
import Message from "../components/Message"

const UsersList = ({ history }) => {
  const dispatch = useDispatch()
  const usersList = useSelector((state) => state.usersList)
  const { loading, users, error } = usersList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUserList())
    } else {
      history.push("/login")
    }
  }, [dispatch, history, userInfo, success])

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <>
      <h2>Users</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i class="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i class="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UsersList