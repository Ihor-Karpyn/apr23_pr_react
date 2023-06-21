import React, { useState } from 'react';
import './App.scss';
import cn from 'classnames';

import { prepareCategory } from './Utils/helpers';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const preparedCategories = prepareCategory({
  products: productsFromServer,
  users: usersFromServer,
  categories: categoriesFromServer,
});

export const App = () => {
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleUserSelection = (user) => {
    setSelectedUser(user);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const clearSearchInput = () => {
    setSearchQuery('');
  };

  const lowerCaseSearchQuery = searchQuery.toLowerCase().trim();

  // that filter doesn't work correctly
  const visiblePreparedCategories = preparedCategories.filter(
    category => category.products.some(
      product => product.name.toLowerCase().includes(lowerCaseSearchQuery),
    ),
  );

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p
              className="panel-tabs has-text-weight-bold"
            >
              <a
                data-cy="FilterAllUsers"
                href="#/"
                className={cn({
                  'is-active': selectedUser === null,
                })}
                onClick={() => handleUserSelection(null)}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  key={user.id}
                  data-cy="FilterUser"
                  href="#/"
                  className={cn({
                    'is-active': selectedUser === user,
                  })}
                  onClick={() => handleUserSelection(user)}
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
                  onChange={handleSearch}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  {searchQuery && (
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={clearSearchInput}
                    />
                  )}
                </span>
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
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>

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

            {/* that part doesn't look good, but I didn't have time to create addititinal components */}
            <tbody>
              {visiblePreparedCategories.map(category => category.products.map(
                product => (
                  (selectedUser === null || category.user === selectedUser) ? (
                    <tr key={product.id} data-cy="Product">
                      <td className="has-text-weight-bold" data-cy="ProductId">
                        {product.id}
                      </td>

                      <td data-cy="ProductName">{product.name}</td>

                      <td data-cy="ProductCategory">{`${category.icon} - ${category.title}`}</td>

                      <td
                        data-cy="ProductUser"
                        className={category.user.sex === 'm'
                          ? 'has-text-link'
                          : 'has-text-danger'
                        }
                      >
                        {category.user.name}
                      </td>
                    </tr>
                  ) : null),
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
