import React from 'react';
import classNames from 'classnames';

export const ProductList = ({ products, setSort, sortType, columnName }) => (
  <div className="box table-container">
    {products.length
      ? (
        <table
          data-cy="ProductTable"
          className="table is-striped is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {['ID', 'Product', 'Category', 'User'].map(column => (
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {column}

                    <a
                      href="#/"
                      onClick={() => {
                        setSort(column);
                      }}
                    >
                      <span className="icon">
                        <i
                          data-cy="SortIcon"
                          className={classNames('fas', {
                            'fa-sort': !sortType && columnName === column,
                            'fa-sort-up': sortType === 'asc',
                            'fa-sort-down': sortType === 'desc',
                          })}
                        />
                      </span>
                    </a>
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {products.map((product) => {
              const { id, name, category, user } = product;
              const { icon, title } = category;

              return (
                <tr data-cy="Product" key={id}>
                  <td className="has-text-weight-bold" data-cy="ProductId">
                    {id}
                  </td>

                  <td data-cy="ProductName">{name}</td>
                  <td data-cy="ProductCategory">{`${icon} - ${title}`}</td>

                  <td
                    data-cy="ProductUser"
                    className={classNames({
                      'has-text-danger': user.sex === 'f',
                      'has-text-link': user.sex === 'm',
                    })}
                  >
                    {user.name}
                  </td>
                </tr>
              );
            })}
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

);
