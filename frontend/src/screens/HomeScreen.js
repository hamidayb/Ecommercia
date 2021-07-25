import React from "react"
import Products from "../products"
import { Row, Col } from "react-bootstrap"
import Product from "../components/Product"

const HomeScreen = () => {
  return (
    <Row>
      {Products.map((item, index) => (
        <Col key={index} sm={12} md={6} lg={4} xl={3}>
          {/* <h3>{item.name}</h3> */}
          <Product item={item} />
        </Col>
      ))}
    </Row>
  )
}

export default HomeScreen
