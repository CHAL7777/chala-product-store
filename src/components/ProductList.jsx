import React from 'react'
import all_product from '../data/all_product'
import Item from './Item'

const ProductList = ({ category }) => {
  const filteredProducts = category === 'all'
    ? all_product
    : all_product.filter(product => product.category === category)

  const title = category === 'all'
    ? 'All Products'
    : category === 'men'
      ? "Men's Collection"
      : category === 'women'
        ? "Women's Collection"
        : "Kids' Collection"

  return (
    <div className='mx-auto max-w-2xl px-4 py-16 sm:pt-24 lg:max-w-7xl lg:px-8'>
      <h2 className='text-4xl font-bold tracking-tight text-foreground text-center'>
        {title}
      </h2>
      <p className='text-center mt-3 md:px-56 text-gray-400'>
        Discover premium footwear crafted for performance, comfort, and style.
      </p>

      {filteredProducts.length === 0 ? (
        <div className='text-center py-20 text-gray-500'>
          <p className='text-xl'>No products found</p>
        </div>
      ) : (
        <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-10 px-6 md:px-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
          {filteredProducts.map((product) => (
            <Item key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductList
