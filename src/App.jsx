import React, { useState } from 'react';
import classNames from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { ProductList } from './components/ProductList/ProductList';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(categoryItem => (
    categoryItem.id === product.categoryId
  ));
  const user = usersFromServer.find(userItem => (
    category.ownerId === userItem.id
  ));

  return {
    ...product,
    category,
    user,
  };
});

export const App = () => {
  const [userFilter, setUserFirler] = useState(null);
  const [titleSearch, setTitleSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [columnName, setColumnName] = useState(null);
  const [sortType, setSortType] = useState(null);

  const visibleProducts = products.filter((product) => {
    const { name, user, category } = product;

    const filterByUser = userFilter
      ? user.name === userFilter
      : true;

    const filterByTitle = titleSearch
      ? name.toLowerCase().includes(titleSearch)
      : true;

    const filterByCategory = categoryFilter.length
      ? categoryFilter.includes(category.title)
      : true;

    return filterByUser && filterByTitle && filterByCategory;
  });

  const resetAllFilters = () => {
    resetUserSelect();
    resetTitleSearch();
    resetCategoryChose();
  };

  const handleSelectUser = (userName) => {
    if (userFilter !== userName) {
      setUserFirler(userName);
    }
  };

  const resetUserSelect = () => {
    setUserFirler(null);
  };

  const handleChangeTitleSearch = (event) => {
    setTitleSearch(event.target.value.toLowerCase().trim());
  };

  const resetTitleSearch = () => {
    setTitleSearch('');
  };

  const handleChoseCategory = (title) => {
    if (categoryFilter.includes(title)) {
      setCategoryFilter(state => (
        state.filter(category => category !== title)
      ));
    } else {
      setCategoryFilter(state => (
        [...state, title]
      ));
    }
  };

  const resetCategoryChose = () => {
    setCategoryFilter([]);
  };

  const resetColumnSort = () => {
    setColumnName(null);
    setSortType(null);
  };

  const sortSetter = (column) => {
    switch (true) {
      case !columnName && !sortType:
      case columnName !== column:
        setColumnName(column);
        setSortType('asc');
        break;
      case columnName === column && sortType === 'asc':
        setSortType('desc');
        break;
      case columnName === column && sortType === 'desc':
        resetColumnSort();
        break;
      default:
        break;
    }
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
                className={classNames({
                  'is-active': userFilter === null,
                })}
                onClick={resetUserSelect}
              >
                All
              </a>
              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  className={classNames({
                    'is-active': userFilter === user.name,
                  })}
                  onClick={() => {
                    handleSelectUser(user.name);
                  }}
                  key={user.id}
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
                  value={titleSearch}
                  onChange={handleChangeTitleSearch}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {titleSearch && (
                  <span className="icon is-right">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={resetTitleSearch}
                    />
                  </span>
                )}
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className={classNames('button is-success mr-6', {
                  'is-outlined': categoryFilter.length,
                })}
                onClick={resetCategoryChose}
              >
                All
              </a>
              {categoriesFromServer.map(category => (
                <a
                  data-cy="Category"
                  className={classNames('button mr-2 my-1', {
                    'is-info': categoryFilter.includes(category.title),
                  })}
                  href="#/"
                  onClick={() => {
                    handleChoseCategory(category.title);
                  }}
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
                onClick={resetAllFilters}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <ProductList
          products={visibleProducts}
          setSort={sortSetter}
          columntName={columnName}
          sortType={sortType}
        />
      </div>
    </div>
  );
};
