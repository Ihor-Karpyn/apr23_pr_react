import React, { useEffect, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { Table } from './components/Table';
import { UsersFilter } from './components/UsersFilter';
import { CategoryFilter } from './components/CategoryFilter';

const data = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(
    c => c.id === product.categoryId,
  );
  const user = usersFromServer.find(u => u.id === category.ownerId);

  return {
    ...product,
    category: { ...category },
    user: { ...user },
  };
});

export const App = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuary, setSearchQuary] = useState('');
  const [filters, setFilters] = useState({
    name: '',
    category: '',
  });

  useEffect(() => {
    setProducts(data);
    setUsers(usersFromServer.map(user => ({ ...user })));
    setCategories(categoriesFromServer.map(category => ({ ...category })));
  }, []);

  useEffect(() => {
    console.log(filters, searchQuary);

    setProducts(getFilteredData());
  }, [filters, searchQuary]);

  const getFilteredData = () => {
    let filteredData = [...data];

    if (filters.name) {
      filteredData = [
        ...filteredData.filter(product => product.user.name === filters.name),
      ];
    }

    if (filters.category) {
      filteredData = [
        ...filteredData.filter(
          product => product.category.title === filters.category,
        ),
      ];
    }

    if (searchQuary) {
      filteredData = [
        ...filteredData.filter(product => (
          product.name.toLowerCase().includes(searchQuary.toLocaleLowerCase())
        )),
      ];
    }

    return filteredData;
  };

  const setFilterName = (name) => {
    setFilters(prew => ({ ...prew, name }));
  };

  const setCategory = (category) => {
    setFilters(prew => ({ ...prew, category }));
  };

  const handleResetFilters = () => {
    setFilters({ name: null });
    setSearchQuary('');
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        {/* start filters */}
        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            {/* filters by uesr name */}

            <UsersFilter users={users} setFilterName={setFilterName} />

            {/*  end filters by uesr name */}

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={searchQuary}
                  onChange={(event) => {
                    setSearchQuary(event.target.value);
                  }}
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

            <CategoryFilter categories={categories} setCategory={setCategory} />

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={() => handleResetFilters()}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        {
          (products.length && <Table products={products} />)
          || <p>No results</p>
        }
      </div>
    </div>
  );
};
