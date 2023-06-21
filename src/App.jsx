import React, { useState } from 'react';
import './App.scss';

import cn from 'classnames';
import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const initialProducts = productsFromServer.map((product) => {
  const category = categoriesFromServer
    .find(currentCategory => currentCategory.id === product.categoryId) || null; // find by product.categoryId
  const user = usersFromServer
    .find(currentUser => currentUser.id === category.ownerId) || null; // find by category.ownerId

  return { ...product, category, user };
});

export const App = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [preparedProducts, setPreparedProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');

  const filterProductsByUser = (user) => {
    setPreparedProducts(initialProducts
      .filter(product => product.user.id === user.id));
  };

  const selectUser = (user) => {
    setSelectedUser(user);
    filterProductsByUser(user);
  };

  const toggleFilters = (category) => {
    if (selectedCategories.includes(category.title)) {
      setSelectedCategories(selectedCategories
        .filter(filter => filter !== category.title));

      return;
    }

    setSelectedCategories([...selectedCategories, category.title]);
  };

  const filterProductsByCategory = () => {
    if (selectedCategories.length === 0) {
      return preparedProducts;
    }

    return preparedProducts
      .filter(product => selectedCategories.includes(product.category.title));
  };

  const cleanSelectedFilters = () => {
    setSelectedCategories([]);
    setPreparedProducts(initialProducts);
  };

  const changeFilters = (category) => {
    toggleFilters(category);
    filterProductsByCategory(selectedCategories);
  };

  const cleanSearch = () => {
    setSearch('');
  };

  const cleanUserSelect = () => {
    setSelectedUser('');
    setPreparedProducts(initialProducts);
  };

  const resetAll = () => {
    cleanSelectedFilters();
    cleanUserSelect();
    cleanSearch();
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;

    setSearch(value);
  };

  const filterBySearch = products => products.filter((product) => {
    const formattedSearch = search.toLowerCase().trim();

    const isInTitle = product.name.toLowerCase().includes(formattedSearch);

    return isInTitle;
  });

  const isProductsEmpty = preparedProducts.length === 0;
  const isSearchEmpty = search.length === 0;
  const filteredProducts = filterProductsByCategory(selectedCategories);
  const searchedProducts = filterBySearch(filteredProducts);

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
                className={cn({ 'is-active': selectedUser.length === 0 })}
                href="#/"
                onClick={cleanUserSelect}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  key={user.id}
                  className={cn({ 'is-active': selectedUser === user })}
                  onClick={() => selectUser(user)}
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
                  onChange={handleSearchChange}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {!isSearchEmpty && (
                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                    onClick={() => cleanSearch()}
                  />
                </span>
                )}
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className={cn('button is-success mr-6',
                  { ' is-outlined': selectedCategories.length !== 0 })}
                onClick={cleanSelectedFilters}
              >
                All
              </a>

              {categoriesFromServer.map(category => (
                <a
                  data-cy="Category"
                  key={category.id}
                  className={cn('button mr-2 my-1',
                    { 'is-info': selectedCategories.includes(category.title) })}
                  href="#/"
                  onClick={() => {
                    changeFilters(category);
                  }}
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
                onClick={resetAll}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {isProductsEmpty && (
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>
          )}

          {!isProductsEmpty && (
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
              {searchedProducts.map(product => (
                <tr data-cy="Product" key={product.id}>
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
                      { 'has-text-link': product.user.sex === 'm' },
                      { 'has-text-danger': product.user.sex === 'f' },
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
