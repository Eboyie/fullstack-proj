import bcrypt from 'bcryptjs';
import { User } from './models/userModel';
import { Product } from './models/productModel';
//import { Product } from './types/Product';

export const sampleProducts: Product[] = [
  {
    name: 'Nike Slim Fit',
    slug: 'nike-slim-fit',
    category: 'Trousers',
    image: '../images/p1.jpg',
    price: 109,
    countInStock: 10,
    brand: 'Nike',
    rating: 4.5,
    numReviews: 10,
    description:
      'high quality shirt. Tailored, Stretch, 5-pockets, Mid waist, Plain.',
  },
  {
    name: 'Adidas Easy Wear',
    slug: 'adidas-easy-wear',
    category: 'Shoes',
    image: '../images/p2.jpg',
    price: 129,
    countInStock: 20,
    brand: 'Adidas',
    rating: 4.0,
    numReviews: 10,
    description:
      'Stylish, retro sneakers with a synthetic upper. Well cushioned midsole, grippy outsole. High quality product',
  },
  {
    name: 'Leather Hand Bag',
    slug: 'leather-hand-bag',
    category: 'Bags',
    image: '../images/p3.jpg',
    price: 299,
    countInStock: 0,
    brand: 'Lacoste',
    rating: 4.8,
    numReviews: 17,
    description:
      'A small, practical shoulder bag with an adjustable strap for comfortable carrying. One zippered main compartment, one smaller zippered pocket Capacity',
  },
  {
    name: 'Silver Wrist Watch',
    slug: 'silver-wrist-watch',
    category: 'Watches',
    image: '../images/p4.jpg',
    price: 99,
    countInStock: 15,
    brand: 'Nike',
    rating: 4.5,
    numReviews: 14,
    description:
      'The Rolex fluted bezel is a mark of distinction. Originally, the fluting of the Oyster bezel had a functional purpose: it served to screw the bezel onto the case helping to ensure the waterproofness of the watch.',
  },
  {
    name: 'Sport Watch',
    slug: 'sport-watch',
    category: 'Watches',
    image: '../images/p5.jpg',
    price: 159,
    countInStock: 15,
    brand: 'Nike',
    rating: 4.5,
    numReviews: 14,
    description:
      'The Apple Watch Series 9 smartwatch offers hardware processing that makes it even faster and more secure. Its features include crash detection, contactless Double Tap control, and advanced health and fitness tracking.',
  },
  {
    name: 'Designer Jeans',
    slug: 'designer-jeans',
    category: 'Trousers',
    image: '../images/p6.jpg',
    price: 109,
    countInStock: 10,
    brand: 'Nike',
    rating: 4.5,
    numReviews: 10,
    description:
      'High quality material, Relaxed, 100% cotton, 5-pockets, Mid waist. The colour of this product may transfer onto light coloured materials.',
  },
  {
    name: 'Stainless Wrist Watch',
    slug: 'stainless-wrist-watch',
    category: 'Watches',
    image: '../images/p7.jpg',
    price: 139,
    countInStock: 15,
    brand: 'Nike',
    rating: 4.5,
    numReviews: 14,
    description:
      'This model features a black dial and a two-colour Cerachrom bezel insert in grey and black ceramic. In addition to conventional hour, minute and seconds hands, the GMT-Master II features an arrow-tipped hand, which circles the dial once every 24 hours.',
  },
  {
    name: 'Leather Long Shoe',
    slug: 'leather-long-shoe',
    category: 'Shoes',
    image: '../images/p8.jpg',
    price: 179,
    countInStock: 20,
    brand: 'Adidas',
    rating: 4.0,
    numReviews: 10,
    description:
      'Seamless shoe cover made of wind and water repellent material. Reaches below the knee. Not only do they protect against splashes, they also warm your feet thanks to the windproof material.',
  },
  {
    name: 'Running Footwear',
    slug: 'running-footwear',
    category: 'Shoes',
    image: '../images/p9.jpg',
    price: 169,
    countInStock: 20,
    brand: 'Adidas',
    rating: 4.0,
    numReviews: 10,
    description:
      'Comfortable running shoes that are perfect for training on asphalt, gravel and treadmills. Soft and pleasant damping guarantees comfort',
  },
  {
    name: 'Brown Bag pack',
    slug: 'brown-bag-pack',
    category: 'Bags',
    image: '../images/p10.jpg',
    price: 59,
    countInStock: 15,
    brand: 'Nike',
    rating: 4.5,
    numReviews: 14,
    description:
      'A practical shoe bag that protects your training shoes. Front zippered pocket for storage. Made from recycled materials. Carrying handles that make it easier to carry the bag with you.',
  },
  {
    name: 'Faded Fit Jeans',
    slug: 'faded-fit-jeans',
    category: 'Trousers',
    image: '../images/p11.jpg',
    price: 109,
    countInStock: 10,
    brand: 'Nike',
    rating: 4.5,
    numReviews: 10,
    description:
      'high quality material, Coin pocket, Relaxed, 100% cotton, 5-pockets, Mid waist',
  },
  {
    name: 'Easy Hand Bag',
    slug: 'easy-hand-bag',
    category: 'Bags',
    image: '../images/p12.jpg',
    price: 45,
    countInStock: 15,
    brand: 'Nike',
    rating: 4.5,
    numReviews: 14,
    description:
      'Large equipment bag with a practical opening bottom and slightly water-repellent outer fabric. Handy storage options and an adjustable carrying strap.',
  },
];