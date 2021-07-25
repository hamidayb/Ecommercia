import React from "react"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import Rating from "./Rating"

const Product = ({ item }) => {
  return (
    <Card className="my-3">
      <Link to={`/product/${item._id}`} className="m-3 mb-6 rounded">
        <Card.Img src={item.image} variant="top" />
      </Link>

      <Card.Body>
        <Link
          to={`/product/${item._id}`}
          style={{ textDecoration: "none", fontSize: "20px" }}
        >
          <Card.Title as="div">{item.name}</Card.Title>
        </Link>

        <Card.Text as="div">
          <div className="my-3">
            <Rating
              value={item.rating}
              text={`${item.numReviews} reviews`}
            ></Rating>
          </div>
        </Card.Text>

        <Card.Text as="h1">${item.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
