import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';
import usersFromServer from './api/users';
import categories from './api/categories';

export const preparedProducts = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(c => c.id === product.categoryId);
  const user = usersFromServer.find(u => u.id === category?.ownerId);

  return ({
    ...product,
    category,
    user,
  });
});

export const filterProducts = (products, ...callbacks) => {
  if (callbacks.length === 0) {
    return products;
  }

  return products.filter(product => (
    callbacks.every(callback => callback(product))
  ));
};

export const createOwnerFilter = ownerId => p => p.user.id === ownerId;

export const createProductTitleFilter = (searchQuery) => {
  const preparedSearchQuery = searchQuery.toLowerCase();

  return product => (
    product.name.toLowerCase().includes(preparedSearchQuery)
  );
};

export const createCategoryFilter = categoriesIds => product => (
  categoriesIds.includes(product.category.id)
);
