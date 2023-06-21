export function getProductsByUser(productsList, user) {
  if (user === null) {
    return productsList;
  }

  const visibleProducts = productsList.filter(product => (
    product.user.id === user.id));

  return visibleProducts;
}

export function getFilteredProducts(productsList, query) {
  if (query.trim() === '') {
    return productsList;
  }

  const loweredQuery = query.toLowerCase().trim();

  const filteredProducts = productsList.filter((product) => {
    const productName = product.name.toLowerCase();

    return productName.includes(loweredQuery);
  });

  return filteredProducts;
}
