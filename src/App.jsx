import React, { useState } from 'react';
import './App.scss';
import cn from 'classnames';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const matchedCategory = categoriesFromServer
    .find(category => category.id === product.categoryId);
  const matchedUser = usersFromServer.find(
    user => user.id === matchedCategory.ownerId,
  );

  return {
    ...product,
    matchedCategory,
    matchedUser,
  };
});

const filteredProducts = (args) => {
  const { fullProducts, searchQuery } = args;

  const preparedSearchQuery = searchQuery.toLowerCase();

  return fullProducts.filter((fullProduct) => {
    const checkString = `
      ${fullProduct.name.toLowerCase()}
    `;

    return checkString.includes(preparedSearchQuery);
  });
};

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterByUser, setFilterByUser] = useState(0);
  const [filterByCategory, setFilterByCategory] = useState(['All']);
  const [fullProducts, setFullProducts] = useState(products);

  useState(() => setTimeout(() => setFullProducts(products), 500), []);

  const resetAllFilters = () => {
    setSearchQuery('');
    setFilterByUser(0);
    setFilterByCategory(['All']);
  };

  const visibleProducts = filteredProducts(
    { fullProducts, searchQuery },
  );

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
                className={cn({
                  'is-active': !filterByUser,
                })}
                onClick={() => setFilterByUser(0)}
              >
                All
              </a>
              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  className={cn({
                    'is-active': filterByUser === user.id,
                  })}
                  onClick={() => setFilterByUser(user.id)}
                >
                  {user.name}
                </a>
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={event => setSearchQuery(event.target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {searchQuery
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
                className={cn('button', 'is-success', 'mr-6', {
                  'is-outlined': !filterByCategory.includes('All'),
                })}
                onClick={() => setFilterByCategory(['All'])}
              >
                All
              </a>
              {categoriesFromServer.map(category => (
                <a
                  data-cy="Category"
                  className={cn('button', 'mr-2', 'my-1', {
                    'is-info': filterByCategory.includes(category.title),
                  })}
                  href="#/"
                  onClick={() => setFilterByCategory([category.title])}
                >
                  {category.title}
                </a>
              ))}
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={resetAllFilters}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {visibleProducts.length < 1
            && (
              <p data-cy="NoMatchingMessage">
                No products matching selected criteria
              </p>
            )}

          <table
            data-cy="ProductTable"
            className="table is-striped is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    ID

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Product

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-down" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Category

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-up" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    User

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              {visibleProducts.map((product) => {
                const {
                  id, name, matchedCategory, matchedUser,
                } = product;

                return (
                  <tr data-cy="Product">
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      {id}
                    </td>

                    <td data-cy="ProductName">{name}</td>
                    <td data-cy="ProductCategory">{`${matchedCategory.icon} - ${matchedCategory.title}`}</td>

                    <td
                      data-cy="ProductUser"
                      className={cn({
                        'has-text-link': matchedUser.sex === 'm',
                        'has-text-danger': matchedUser.sex === 'f',
                      })}
                    >
                      {matchedUser.name}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
