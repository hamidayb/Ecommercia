import { Helmet } from "react-helmet"

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: "Ecommercia",
  description: "Selling best products in less price",
  keywords: "products, electronics, mobiles, phones, equipments",
}

export default Meta
