import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col } from "react-bootstrap"
import Product from "../components/Product"
import { listProducts } from "../actions/productActions"
import Loader from "../components/Spinner"
import Message from "../components/Message"

const HomeScreen = () => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)

  const { loading, products, errors } = productList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : errors ? (
        <Message variant="danger">{errors}</Message>
      ) : (
        <Row>
          {products.map((item, index) => (
            <Col key={index} sm={12} md={6} lg={4} xl={3}>
              {/* <h3>{item.name}</h3> */}
              <Product item={item} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
