import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import Product from "../components/Product"
import { listProducts } from "../actions/productActions"
import Loader from "../components/Spinner"
import Message from "../components/Message"
import Paginate from "../components/Paginate"
import Meta from "../components/Meta"
import ProductCarousel from "../components/ProductCarousel"

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)

  const { loading, products, errors, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      {!keyword ? (
        <>
          <ProductCarousel />
          <h1>Latest Products</h1>
        </>
      ) : (
        <Link to='/' className='btn btn-light my-3'>
          Go Back
        </Link>
      )}
      {loading ? (
        <Loader />
      ) : errors ? (
        <Message variant='danger'>{errors}</Message>
      ) : (
        <>
          <Row>
            {products.map((item, index) => (
              <Col key={index} sm={12} md={6} lg={4} xl={3}>
                {/* <h3>{item.name}</h3> */}
                <Product item={item} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          ></Paginate>
        </>
      )}
    </>
  )
}

export default HomeScreen
