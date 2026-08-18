import products from './products';

// Backwards-compatibility adapter for components referencing old product schema
const all_product = products.map((item) => ({
  ...item,
  image: item.images[0],
  image1: item.images[1] || item.images[0],
  image2: item.images[2] || item.images[0],
  image3: item.images[3] || item.images[0],
  new_price: item.price,
  old_price: item.originalPrice,
}));

export default all_product;