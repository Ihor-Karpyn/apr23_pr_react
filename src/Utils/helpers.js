const getUserById = (users, id) => (
  users.find(user => user.id === id)
);

const getProductsByCategoryId = (products, categoryId) => (
  products.filter(product => product.categoryId === categoryId)
);

export const prepareCategory = (args) => {
  const { products, users, categories } = args;

  return categories.map((category) => {
    const foundUser = getUserById(users, category.ownerId);
    const foundProducts = getProductsByCategoryId(products, category.id);

    return {
      ...category,
      user: foundUser,
      products: foundProducts,
    };
  });
};
