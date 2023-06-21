/* eslint-disable */
import React from 'react';

const ProductTable = ({
  selectedUser,
  productsFromServer,
  categoriesFromServer,
  usersFromServer,
}) => {
  const filteredProducts = productsFromServer.filter((product) => {
    const category = categoriesFromServer
      .find(category => category.id === product.categoryId);
    const user = usersFromServer.find(user => user.id === category.ownerId);

    return selectedUser === null || user.id === selectedUser;
  });

  const products = filteredProducts.map(product => {
    const category = categoriesFromServer
      .find(category => category.id === product.categoryId);
    const user = usersFromServer.find(user => user.id === category.ownerId);

    return (
      <tr key={product.id} data-cy="Product">
        <td className="has-text-weight-bold" data-cy="ProductId">
          {product.id}
        </td>
        <td data-cy="ProductName">{product.name}</td>
        <td data-cy="ProductCategory">
          {category.icon} - {category.title}
        </td>
        <td
          data-cy="ProductUser"
          className={user.sex === 'm' ? 'has-text-link' : 'has-text-danger'}
        >
          {user.name}
        </td>
      </tr>
    );
  });

  return (
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
      <tbody>{products}</tbody>
    </table>
  );
};

export default ProductTable;
