import React, { useState } from 'react';
import cn from 'classnames';
import './App.scss';
import { getProductsByUser, getFilteredProducts } from './heplers';
import { User } from './components/User/User';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(c => (
    c.id === product.categoryId)); // find by product.categoryId

  const user = usersFromServer.find(u => (
    u.id === category.ownerId
  )); // find by category.ownerId

  return {
    ...product,
    category,
    user,
  };
});

// function getProductsByUser(productsList, user) {
//   if (user === null) {
//     return productsList;
//   }

//   const visibleProducts = productsList.filter(product => (
//     product.user.id === user.id));

//   return visibleProducts;
// }

// function getFilteredProducts(productsList, query) {
//   if (query.trim() === '') {
//     return productsList;
//   }

//   const loweredQuery = query.toLowerCase().trim();

//   const filteredProducts = productsList.filter((product) => {
//     const productName = product.name.toLowerCase();

//     return productName.includes(loweredQuery);
//   });

//   return filteredProducts;
// }

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [input, setInput] = useState('');

  const selectUser = (user) => {
    if (selectedUser !== user) {
      setSelectedUser(user);
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleClearInput = () => {
    setInput('');
  };

  const preparedProducts = getProductsByUser(products, selectedUser);
  const filteredProducts = getFilteredProducts(preparedProducts, input);

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
                className={cn({ 'is-active': selectedUser === null })}
                onClick={() => selectUser(null)}
              >
                All
              </a>
              {usersFromServer.map(user => (
                <User
                  user={user}
                  selectedUser={selectedUser}
                  selectUser={selectUser}
                />
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={input}
                  onChange={handleInputChange}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>
                {input && (
                  <span className="icon is-right">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={handleClearInput}
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
                onClick={() => {
                  selectUser(null);
                  handleClearInput();
                }}
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
                    <tr key={product.id} data-cy="Product">
                      <td className="has-text-weight-bold" data-cy="ProductId">
                        {product.id}
                      </td>

                      <td data-cy="ProductName">{product.name}</td>
                      <td data-cy="ProductCategory">
                        {`${product.category.icon} - ${product.category.title}`}
                      </td>

                      <td
                        data-cy="ProductUser"
                        className={cn(
                          { 'has-text-link': product.user.sex === 'm',
                            'has-text-danger': product.user.sex === 'f' },
                        )}
                      >
                        {product.user.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
        </div>
      </div>
    </div>
  );
};
