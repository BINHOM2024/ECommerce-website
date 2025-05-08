import React, { useContext, useEffect, useState } from 'react'
import { myContext } from '../context/StoreContext'
import ProductsItem from './ProductsItem'

const RelatedProducts = ({ category, subCategory }) => {
    const {products}=useContext(myContext)
    const [RelatedProducts, setRelatedProducts] = useState([])

    useEffect(() => {
        let productCopy = products.slice()
        productCopy = productCopy.filter(item => category === item.category)
        productCopy=productCopy.filter(item=>subCategory===item.subCategory)
        setRelatedProducts(productCopy.slice(0,5))
    }, [])
    
  return (
      <div className='my-12'>
          <h2 className='font-medium text-2xl text-center mb-6'>RELATED PRODUCTS</h2>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2'>
              {RelatedProducts.map(item => (
                  <ProductsItem key={item._id} item={item}/>
              ))}
          </div>
    </div>
  )
}

export default RelatedProducts