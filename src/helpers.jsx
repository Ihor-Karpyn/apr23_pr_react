
export const getElementById = (elements, criterion) => (
  elements.find(elem => elem.id === criterion)
);

export const getCategoriesWithUsers = (categories, users) => (
  categories.map(category => ({
    ...category,
    user: getElementById(users, category.ownerId),
  }))
);

export const getProductsWithCategories = (products, categories) => (
  products.map(product => ({
    ...product,
    category: getElementById(categories, product.categoryId),
  }))
);

export const findProductByName = (product, query) => (
  product.name.toLowerCase().includes(query.toLowerCase())
);
