import React, { useContext, useEffect, useState } from 'react'
import Hero from '../components/Hero'
import { myContext } from '../context/StoreContext';
import ProductsItem from '../components/ProductsItem';
import Subscribe from '../components/Subscribe';

const Home = () => {
  const { products } = useContext(myContext)
  const [latestItems, setLatestItems] = useState([])
  const [bestSellers, setBestSellers] = useState([])
  
  useEffect(() => {
    setLatestItems(products.slice(0, 10))
    const bestSeller = products.filter((item) => item.bestSeller).slice(0, 5);
    setBestSellers(bestSeller);
  }, [products])


  return (
    <div className="w-[80%] m-auto">
      <Hero />
      <h2 className="text-[26px] text-center">Latest Collections</h2>
      <p className="text-center mb-8 text-[18px] text-gray-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quas
        ipsam deleniti fugit?
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {latestItems.map((item) => (
          <ProductsItem item={item} key={item._id} />
        ))}
      </div>
      <h2 className="text-[26px] text-center mt-8">Best Sellers</h2>
      <p className="text-center mb-8 text-[18px] text-gray-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quas
        ipsam deleniti fugit?
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {bestSellers.map((item) => (
          <ProductsItem item={item} key={item._id} />
        ))}
      </div>
      <Subscribe/>
    </div>
  );
}

export default Home