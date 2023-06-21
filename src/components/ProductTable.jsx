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
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setProductsList(products);
  });

  const filteredProducts = filterProducts(productsList, searchQuery);

  return (
    <div className="container">
      <h1 className="title">Product Categories</h1>

      <div className="block">
        <nav className="panel">
          <p className="panel-heading">Filters</p>

          <p className="panel-tabs has-text-weight-bold">
            <a
              data-cy="FilterAllUsers"
              href="#/"
            >
              All
            </a>

            <a
              data-cy="FilterUser"
              href="#/"
            >
              User 1
            </a>

            <a
              data-cy="FilterUser"
              href="#/"
              className="is-active"
            >
              User 2
            </a>

            <a
              data-cy="FilterUser"
              href="#/"
            >
              User 3
            </a>
          </p>

          <div className="panel-block">
            <p className="control has-icons-left has-icons-right">
              <input
                data-cy="SearchField"
                type="text"
                className="input"
                placeholder="Search"
                onChange={event => setSearchQuery(event.target.value)}
                value={searchQuery}
              />

              <span className="icon is-left">
                <i className="fas fa-search" aria-hidden="true" />
              </span>

              {searchQuery !== ''
              && (
                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                    onClick={() => setSearchQuery('')}
                  />
                </span>
              )}
            </p>
          </div>

          <div className="panel-block is-flex-wrap-wrap">
            <a
              href="#/"
              data-cy="AllCategories"
              className="button is-success mr-6 is-outlined"
            >
              All
            </a>

            <a
              data-cy="Category"
              className="button mr-2 my-1 is-info"
              href="#/"
            >
              Category 1
            </a>

            <a
              data-cy="Category"
              className="button mr-2 my-1"
              href="#/"
            >
              Category 2
            </a>

            <a
              data-cy="Category"
              className="button mr-2 my-1 is-info"
              href="#/"
            >
              Category 3
            </a>
            <a
              data-cy="Category"
              className="button mr-2 my-1"
              href="#/"
            >
              Category 4
            </a>
          </div>

          <div className="panel-block">
            <a
              data-cy="ResetAllButton"
              href="#/"
              className="button is-link is-outlined is-fullwidth"
            >
              Reset all filters
            </a>
          </div>
        </nav>
      </div>

      <div className="box table-container">
        {filteredProducts.length !== 0
          ? (
            <table
              data-cy="ProductTable"
              className="table is-striped is-narrow is-fullwidth"
            >
              <ProductTableHeader />

              <ProductTableBody products={filteredProducts} />
            </table>
          )
          : (
            <p data-cy="NoMatchingMessage">
              No results
            </p>
          )
        }
      </div>
    </div>
  );
};
