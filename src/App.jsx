/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';
import cn from 'classnames';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer
    .find(oneCategory => oneCategory.id === product.categoryId); // find by product.categoryId
  const user = usersFromServer.find(oneUser => oneUser.id === category.ownerId); // find by category.ownerId

  return {
    ...product,
    category,
    user,
  };
});

export const App = () => {
  const [chosenOwner, setChosenOwner] = useState('All');
  const [query, setQuery] = useState('');
  const [
    chosenCategoryTitles,
    setChosenCategoryTitles,
  ] = useState([]);
  const [isFirstCategoryClick, setIsFirstCategoryClick] = useState(true);

  const handleOwnerChange = (user) => {
    setChosenOwner(user.name);
  };

  const handleOwnerChooseAll = () => {
    setChosenOwner('All');
  };

  const handleQueryChange = (event) => {
    const { value } = event.target;

    setQuery(value);
  };

  const handleClearQuery = () => (
    setQuery('')
  );

  const handleResetAllFilters = () => {
    setChosenOwner('All');
    setQuery('');
    setChosenCategoryTitles([]);
    setIsFirstCategoryClick(true);
  };

  const handleCategoryChooseAll = () => {
    setChosenCategoryTitles([]);
    setIsFirstCategoryClick(true);
  };

  const handleCategoryChoose = (category) => {
    if (isFirstCategoryClick) {
      setChosenCategoryTitles([category.title]);
      setIsFirstCategoryClick(false);
    } else if (chosenCategoryTitles.includes(category.title)) {
      setChosenCategoryTitles(prev => (
        prev.filter(prevTitle => prevTitle !== category.title)
      ));
    } else {
      setChosenCategoryTitles(prev => [...prev, category.title]);
    }
  };

  const searchQuery = query.trim().toLowerCase();

  const visibleProducts = products
    .filter(product => (
      (product.user.name === chosenOwner || chosenOwner === 'All')
        && (product.name.toLowerCase().includes(searchQuery))
        && (chosenCategoryTitles.includes(product.category.title)
          || chosenCategoryTitles.length === 0)
    ));

  const isAnyProductFound = visibleProducts.length !== 0;

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
                className={cn({ 'is-active': chosenOwner === 'All' })}
                onClick={handleOwnerChooseAll}
              >
                All
              </a>
              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  key={user.id}
                  className={cn({ 'is-active': user.name === chosenOwner })}
                  onClick={() => handleOwnerChange(user)}
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
                  onChange={handleQueryChange}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {query && (
                  <span className="icon is-right">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={handleClearQuery}
                    />
                  </span>
                )}

              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className={cn('button is-success mr-6', {
                  'is-outlined': chosenCategoryTitles.length !== 0,
                })}
                onClick={handleCategoryChooseAll}
              >
                All
              </a>

              {categoriesFromServer.map(category => (
                <a
                  key={category.id}
                  data-cy="Category"
                  className={cn('button mr-2 my-1', {
                    'is-info': chosenCategoryTitles
                      .includes(category.title) && !isFirstCategoryClick,
                  })}
                  href="#/"
                  onClick={() => handleCategoryChoose(category)}
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
                onClick={handleResetAllFilters}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {isAnyProductFound
            ? (
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
                  {visibleProducts.map(product => (
                    <tr data-cy="Product" key={product.id}>
                      <td className="has-text-weight-bold" data-cy="ProductId">
                        {product.id}
                      </td>

                      <td data-cy="ProductName">{product.name}</td>
                      <td data-cy="ProductCategory">{`${product.category.icon} - ${product.category.title}`}</td>

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
                  ))}
                </tbody>
              </table>
            )
            : (
              <p data-cy="NoMatchingMessage">
                No products matching selected criteria
              </p>
            )
          }
        </div>
      </div>
    </div>
  );
};
