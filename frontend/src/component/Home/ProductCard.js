import React from 'react'
import { Link } from 'react-router-dom';

const ProductCard = ({product}) => {
  return (
    <Link to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} className="w-96 h-96 object-cover"/>
        <p>{product.name}</p>
        <div>
            <span>({product.numOfReviews} Reviews)</span>
        </div>
        <span>{product.price}</span>
    </Link>
  )
}

export default ProductCard