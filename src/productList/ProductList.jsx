import React from 'react';
import { Product } from '../Product/product';

export const ProductList = ({ products }) => (
  <tbody>
    {products.map(product => (
      <Product product={product} key={product.id} />
    ))}
  </tbody>
);
