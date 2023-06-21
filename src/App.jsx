/* eslint-disable jsx-a11y/accessible-emoji */
import cn from 'classnames';
import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const getProductCategory = categoryId => categoriesFromServer
  .find(category => category.id === categoryId) || null;

const getUser = ownerId => usersFromServer
  .find(user => user.id === ownerId) || null;

const preparedProducts = productsFromServer.map((product) => {
  const { categoryId } = product;

  const category = getProductCategory(categoryId);
  const user = getUser(category.ownerId);

  return {
    ...product,
    category,
    user,
  };
});

const getSortedProducts = (sortType, products) => {
  switch (sortType) {
    case 'id':
      return products
        .sort((p1, p2) => p1.id - p2.id);

    case 'name':
      return products
        .sort((p1, p2) => p1.name.localeCompare(p2.name));

    case 'category':
      return products
        .sort((p1, p2) => p1.category.title.localeCompare(p2.category.title));

    case 'user':
      return products
        .sort((p1, p2) => p1.user.name.localeCompare(p2.user.name));

    default:
      return true;
  }
};

const getVisibleProducts = (
  selectedUser,
  selectedCategories,
  query,
  sortType,
  sortOrder,
) => {
  let filteredProducts = preparedProducts;

  if (selectedUser) {
    filteredProducts = filteredProducts
      .filter(product => product.user.id === selectedUser);
  }

  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts
      .filter(product => selectedCategories.includes(product.categoryId));
  }

  if (query) {
    const normalizedquery = query
      .toLowerCase()
      .trim();

    filteredProducts = filteredProducts
      .filter(product => product.name.toLowerCase().includes(normalizedquery));
  }

  getSortedProducts(sortType, filteredProducts, sortOrder);

  if (sortOrder === 'DESC') {
    filteredProducts.reverse();
  }

  return filteredProducts;
};

export const App = () => {
  const [selectedUser, setselectedUser] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [query, setQuery] = useState('');
  const [sortType, setSortType] = useState('id');
  const [sortOrder, setSortOrder] = useState('ASC');

  const products = getVisibleProducts(
    selectedUser,
    selectedCategories,
    query,
    sortType,
    sortOrder,
  );

  const handleFilterByUser = (userId) => {
    setselectedUser(userId);
  };

  const handleFilterByCategory = (categoryId) => {
    if (!categoryId) {
      setSelectedCategories([]);

      return;
    }

    setSelectedCategories((prevState) => {
      if (prevState.includes(categoryId)) {
        return prevState.filter(id => id !== categoryId);
      }

      return [...prevState, categoryId];
    });
  };

  const handleQuerychange = (event) => {
    setQuery(event.target.value);
  };

  const handleSortBy = (sortBy) => {
    if (sortOrder === 'ASC') {
      setSortOrder('DESC');
    }

    if (sortOrder === 'DESC') {
      setSortOrder('ASC');
    }

    setSortType(sortBy);
  };

  const categoriesAmount = categoriesFromServer.length;

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
                onClick={() => handleFilterByUser(null)}
                className={cn({ 'is-active': !selectedUser })}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  onClick={() => handleFilterByUser(user.id)}
                  key={user.id}
                  className={cn({ 'is-active': selectedUser === user.id })}
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
                  value={query}
                  onChange={handleQuerychange}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                  />
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                onClick={() => handleFilterByCategory(null)}
                className={cn(
                  'button mr-2 my-1', {
                    'is-info': selectedCategories.length === 0
                      || selectedCategories.length === categoriesAmount,
                  }, {
                    'is-otlined': selectedCategories.length
                      === categoriesAmount,
                  },
                )}
              >
                All
              </a>

              {categoriesFromServer.map(category => (
                <a
                  data-cy="Category"
                  className={cn(
                    'button mr-2 my-1', {
                      'is-info': selectedCategories.includes(category.id),
                    },
                  )}
                  href="#/"
                  onClick={() => handleFilterByCategory(category.id)}
                  key={category.id}
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
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {products.length === 0 && (
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

                    <a href="#/" onClick={() => handleSortBy('id')}>
                      <span className="icon">
                        <i
                          data-cy="SortIcon"
                          className="fas fa-sort"
                        />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Product

                    <a href="#/" onClick={() => handleSortBy('name')}>
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-down" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Category

                    <a href="#/" onClick={() => handleSortBy('category')}>
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-up" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    User

                    <a href="#/" onClick={() => handleSortBy('user')}>
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map(product => (
                <tr data-cy="Product" key={product.id}>
                  <td className="has-text-weight-bold" data-cy="ProductId">
                    {product.id}
                  </td>

                  <td data-cy="ProductName">
                    {product.name}
                  </td>
                  <td data-cy="ProductCategory">
                    {`${product.category.icon} - ${product.category.title}`}
                  </td>

                  <td
                    data-cy="ProductUser"
                    className={cn(
                      'has-text-link', {
                        'has-text-danger': product.user.sex === 'f',
                      },
                    )}
                  >
                    {product.user.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
