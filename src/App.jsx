import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { TableHead } from './Components/TableHead';
import { TableRow } from './Components/TableRow';
import { UsersFilter } from './Components/UsersFilter';
import {
  preparedProducts,
} from './helpers';
import { ProductTitleFilter } from './Components/ProductTitleFilter';
import { CategoryFilter } from './Components/CategoryFilter';

export const App = () => {
  const [products] = useState(preparedProducts);
  const [users] = useState(usersFromServer);

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoriesIds, setSelectedCategoriesIds] = useState([]);

  let visibleProducts = [...products];

  if (searchQuery) {
    const preparedSearchQuery = searchQuery.trim().toLowerCase();

    visibleProducts = visibleProducts.filter(product => (
      product.name.toLowerCase().includes(preparedSearchQuery)
    ));
  }

  if (selectedUserId) {
    visibleProducts = visibleProducts.filter(product => (
      product.user.id === selectedUserId
    ));
  }

  if (selectedCategoriesIds.length) {
    visibleProducts = visibleProducts.filter(product => (
      selectedCategoriesIds.includes(product.categoryId)
    ));
  }

  const selectCategoryHandler = (categoryId) => {
    setSelectedCategoriesIds((prevCategoriesIds) => {
      if (prevCategoriesIds.includes(categoryId)) {
        return prevCategoriesIds.filter(id => id !== categoryId);
      }

      return [...prevCategoriesIds, categoryId];
    });
  };

  const resetFilters = () => {
    setSelectedUserId(null);
    setSearchQuery('');
    setSelectedCategoriesIds([]);
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <UsersFilter
              users={users}
              selectedUserId={selectedUserId}
              setSelectedUserId={setSelectedUserId}
            />

            <ProductTitleFilter
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            <CategoryFilter
              categories={categoriesFromServer}
              selectHandler={selectCategoryHandler}
              selectedCategoryIds={selectedCategoriesIds}
              clearFilter={() => setSelectedCategoriesIds([])}
            />

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={resetFilters}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {visibleProducts.length === 0
            ? (
              <p data-cy="NoMatchingMessage">
                No products matching selected criteria
              </p>
            )
            : (
              <table
                data-cy="ProductTable"
                className="table is-striped is-narrow is-fullwidth"
              >
                <TableHead />

                <tbody>
                  {visibleProducts.map(product => (
                    <TableRow product={product} />
                  ))}
                </tbody>
              </table>
            )
          }
        </div>
      </div>
    </div>
  );
};
