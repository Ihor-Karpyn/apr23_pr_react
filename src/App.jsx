import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import './App.scss';
import { SortIcon } from './components/SortIcon';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const categoryTypes = ['ID', 'Product', 'Category', 'User'];

const preparedProducts = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(c => (
    c.id === product.categoryId
  )) || null;

  const owner = usersFromServer.find(u => (
    u.id === category.ownerId
  )) || null;

  const preparedCategory = { ...category, owner };

  return {
    ...product,
    category: preparedCategory,
  };
});

export const App = () => {
  const [products, setProducts] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedCategoriesId, setSelectedCategoriesId] = useState([]);
  const [query, setQuery] = useState('');
  const [sortType, setSortType] = useState('None');
  const [sortClick, setSortClick] = useState(0);
  const [isReversed, setIsReversed] = useState(false);

  const handleSortClick = (type) => {
    if (sortType !== type) {
      setSortType(type);
      setIsReversed(false);
      setSortClick(1);
    } else if (sortClick === 1) {
      setIsReversed(true);
      setSortClick(2);
    } else {
      setSortType('None');
      setIsReversed(false);
      setSortClick(0);
    }
  };

  useEffect(() => {
    setProducts(preparedProducts);
  }, []);

  const filteredProducts = products.filter((product) => {
    const normalizedQuery = query.replace(/\s/g, '').toLowerCase();
    const normalizedProduct = product.name.toLowerCase();

    const isProductMatch = normalizedProduct.includes(normalizedQuery);

    const isOwnerMatch = !selectedUserId
      || product.category?.owner?.id === selectedUserId;

    const isCategoryMatch = !selectedCategoriesId.length
      || selectedCategoriesId.includes(product.category?.id);

    return isProductMatch && isOwnerMatch && isCategoryMatch;
  });

  const getSortedProducts = () => {
    const copyProducts = [...filteredProducts];

    copyProducts.sort((productA, productB) => {
      switch (sortType) {
        case 'ID':
          return productA.id - productB.id;

        case 'Product':
          return productA.name.localeCompare(productB.name);

        case 'Category':
          return productA.category?.title.localeCompare(
            productB.category?.title,
          );

        case 'User':
          return productA.category?.owner?.name.localeCompare(
            productB.category?.owner?.name,
          );

        default:
          return 0;
      }
    });

    if (isReversed) {
      copyProducts.reverse();
    }

    return copyProducts;
  };

  const visibleProducts = getSortedProducts();

  const changeCategoryOnClick = (categoryId) => {
    if (selectedCategoriesId.includes(categoryId)) {
      setSelectedCategoriesId(currentCategories => (
        currentCategories.filter(id => id !== categoryId)
      ));
    } else {
      setSelectedCategoriesId(currentCategories => [
        ...currentCategories,
        categoryId,
      ]);
    }
  };

  const handleQueryOnChange = (event) => {
    setQuery(event.target.value);
  };

  const handleResetQueryOnClick = () => setQuery('');

  const handleAllCategoriesOnClick = () => setSelectedCategoriesId([]);

  const handleResetAllOnClick = () => {
    setSelectedUserId(0);
    setSelectedCategoriesId([]);
    setQuery('');
    setSortType('None');
    setSortClick(0);
    setIsReversed(false);
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
                  'is-active': selectedUserId === 0,
                })}
                onClick={() => setSelectedUserId(0)}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  className={cn({
                    'is-active': selectedUserId === user.id,
                  })}
                  onClick={() => setSelectedUserId(user.id)}
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
                  onChange={handleQueryOnChange}
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
                      onClick={handleResetQueryOnClick}
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
                  'is-outlined': selectedCategoriesId.length > 0,
                })}
                onClick={handleAllCategoriesOnClick}
              >
                All
              </a>

              {categoriesFromServer.map(category => (
                <a
                  data-cy="Category"
                  className={cn('button mr-2 my-1', {
                    'is-info': selectedCategoriesId.includes(category.id),
                  })}
                  href="#/"
                  onClick={() => changeCategoryOnClick(category.id)}
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
                onClick={handleResetAllOnClick}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {!visibleProducts.length && (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          )}

          {visibleProducts.length > 0 && (
            <table
              data-cy="ProductTable"
              className="table is-striped is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  {categoryTypes.map(category => (
                    <th>
                      <SortIcon
                        title={category}
                        onClick={handleSortClick}
                        sortType={sortType}
                        sortClick={sortClick}
                      />
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {visibleProducts.map(product => (
                  <tr data-cy="Product">
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      {product.id}
                    </td>

                    <td data-cy="ProductName">
                      {product.name}
                    </td>

                    <td data-cy="ProductCategory">
                      {`${product.category?.icon} - ${product.category?.title}`}
                    </td>

                    <td
                      data-cy="ProductUser"
                      className={cn(({
                        'has-text-link': product.category?.owner?.sex === 'm',
                        'has-text-danger': product.category?.owner?.sex === 'f',
                      }))}
                    >
                      {product.category?.owner?.name}
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
