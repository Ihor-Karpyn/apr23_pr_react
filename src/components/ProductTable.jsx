import { useEffect, useState } from 'react';
import { ProductTableHeader } from './ProductTableHeader';
import { ProductTableBody } from './ProductTableBody';
import { filterProducts } from '../helpers';

import usersFromServer from '../api/users';
import categoriesFromServer from '../api/categories';
import productsFromServer from '../api/products';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(c => c.id === product.categoryId);
  const user = usersFromServer.find(u => u.id === category.ownerId);

  return {
    ...product,
    category,
    user,
  };
});

export const ProductTable = () => {
  const [productsList, setProductsList] = useState([]);
  // const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setProductsList(products);
  });

  const filteredProducts = filterProducts({ productsList, searchQuery });

  return (
    <table
      data-cy="ProductTable"
      className="table is-striped is-narrow is-fullwidth"
    >
      <ProductTableHeader />

      <ProductTableBody products={filteredProducts} />
    </table>
  );
};
