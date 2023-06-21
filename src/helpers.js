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
