export function getFullProducts(
  products,
  categories,
  users,
) {
  const result = products.map((product) => {
    const category = categories
      .find(productCategory => productCategory.id === product.categoryId);

    const user = users.find(owner => owner.id === category.ownerId);

    return { ...product, category, user };
  });

  return result;
}
