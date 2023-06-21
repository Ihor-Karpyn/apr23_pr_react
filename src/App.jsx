import React, { useState } from 'react';
import { Filters } from './components/Filters';
import './App.scss';
import { ProductsTable } from './components/ProductsTable';
import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { findProductByName,
  getCategoriesWithUsers,
  getProductsWithCategories } from './helpers';

const preparedCategories = getCategoriesWithUsers(
  categoriesFromServer,
  usersFromServer,
);

const preparedProducts = getProductsWithCategories(
  productsFromServer,
  preparedCategories,
);

export const App = () => {
  const [userFilterId, setUserFilterId] = useState(0);
  const [inputQuery, setInputQuery] = useState('');

  const visibleProducts = preparedProducts.filter(product => (
    findProductByName(product, inputQuery)
  ));
  // .filter(product => product.category.user.id !== userFilterId);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <Filters
          userFilter={userFilterId}
          setUserFilter={setUserFilterId}
          query={inputQuery}
          setQuery={setInputQuery}
          users={usersFromServer}
        />
        <ProductsTable products={visibleProducts} />
      </div>
    </div>
  );
};
