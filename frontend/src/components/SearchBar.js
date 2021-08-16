import { useState } from "react"
import { Form, Button } from "react-bootstrap"

const SearchBar = ({ history }) => {
  const [keyword, setKeyword] = useState("")

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push("/")
    }
  }

  return (
    <Form onSubmit={submitHandler} style={{ display: "flex" }}>
      <Form.Control
        type="text"
        name="search"
        onChange={(e) => setKeyword(e.target.value)}
        placeHolder="Search Products..."
        classname="mr-sm-2 ml-sm-5"
        style={{ padding: "5px" }}
      ></Form.Control>
      <Button type="submit" className="p-2">
        Search
      </Button>
    </Form>
  )
}

export default SearchBar
