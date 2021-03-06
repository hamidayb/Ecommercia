import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Table, Button, Row, Col } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import Loader from "../components/Spinner"
import Message from "../components/Message"
import Meta from "../components/Meta"
import { PRODUCT_CREATE_RESET } from "../constants/productConstants"
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions"
import Paginate from "../components/Paginate"

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, products, error, pages, page } = productList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })
    if (!userInfo || (userInfo && !userInfo.isAdmin)) {
      history.push("/login")
    }
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts("", pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id))
    }
  }
  const addProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <>
      <Meta title={"Admin | Products"} />
      <Row className='align-items-center'>
        <Col>
          <h2>Products</h2>
        </Col>
        <Col className='text-end'>
          <Button className='my-3' onClick={addProductHandler}>
            <i className='fas fa-plus'></i>
            <span className='px-2'>Add Product</span>
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true}></Paginate>
        </>
      )}
    </>
  )
}

export default ProductListScreen
