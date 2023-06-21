import React, { useState } from 'react';
import './App.scss';
import cn from 'classnames';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(cat => (
    product.categoryId === cat.id));

  const user = usersFromServer.find(u => (
    u.id === category.ownerId));

  return {
    ...product,
    category,
    user,
  };
});

const findSubstring = (string, substring) => (
  string.toLowerCase().includes(substring.toLowerCase().trim())
);

export const App = () => {
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState('All');
  const [selectedCategory, setSelecetedCategory] = useState('All');

  const filteredProducts = products.filter(product => (
    findSubstring(product.name, search)
  ));

  const changeHandler = (event) => {
    setSearch(event.target.value);
  };

  const resetFilters = () => {
    setSearch('');
    setSelectedUser('All');
  };

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
                  'is-active': selectedUser === 'All',
                })}
                onClick={() => {
                  setSelectedUser('All');
                }}
              >
                All
              </a>
              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  className={cn({
                    'is-active': selectedUser === user.name,
                  })}
                  key={user.id}
                  value={user.name}
                  onClick={() => {
                    if (user.name !== selectedUser) {
                      setSelectedUser(user.name);
                    }
                  }}
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
                  value={search}
                  onChange={changeHandler}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {search !== ''
                  && (
                    <span className="icon is-right">
                      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                      <button
                        data-cy="ClearButton"
                        type="button"
                        className="delete"
                        onClick={() => {
                          setSearch('');
                        }}
                      />
                    </span>
                  )
                }
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
              {categoriesFromServer.map(category => (
                <a
                  data-cy="Category"
                  className={cn('button mr-2 my-1', {
                    'is-info': selectedCategory.includes(category.id),
                  })}
                  href="#/"
                  value={category.id}
                  onClick={(e) => {
                    setSelecetedCategory.push(category.id);
                  }}
                >
                  {category.title}
                </a>
              ))}
              {/* <a
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
              </a> */}
            </div>

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
          {filteredProducts.length === 0
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
                            <i
                              data-cy="SortIcon"
                              className="fas fa-sort-down"
                            />
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
                  {filteredProducts.map(product => (
                    selectedUser !== 'All'
                      ? selectedUser === product.user.name && (
                        <tr
                          data-cy="Product"
                          key={product.id}
                        >
                          <td
                            className="has-text-weight-bold"
                            data-cy="ProductId"
                          >
                            {product.id}
                          </td>

                          <td data-cy="ProductName">{product.name}</td>
                          <td data-cy="ProductCategory">
                            <span role="img">{product.category.icon}</span>
                            {` - ${product.category.title}`}
                          </td>
                          <td
                            data-cy="ProductUser"
                            className={cn({
                              'has-text-link': product.user.sex === 'm',
                              'has-text-danger': product.user.sex === 'f',
                            })}
                          >
                            {product.user.name}
                          </td>
                        </tr>
                      )
                      : (
                        <tr
                          data-cy="Product"
                          key={product.id}
                        >
                          <td
                            className="has-text-weight-bold"
                            data-cy="ProductId"
                          >
                            {product.id}
                          </td>

                          <td data-cy="ProductName">{product.name}</td>
                          <td data-cy="ProductCategory">
                            <span role="img">{product.category.icon}</span>
                            {` - ${product.category.title}`}
                          </td>
                          <td
                            data-cy="ProductUser"
                            className={cn({
                              'has-text-link': product.user.sex === 'm',
                              'has-text-danger': product.user.sex === 'f',
                            })}
                          >
                            {product.user.name}
                          </td>
                        </tr>
                      )
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
