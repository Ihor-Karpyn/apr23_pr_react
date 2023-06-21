export const filterProducts = (products, searchQuery) => {
  const preparedSearch = searchQuery.toLowerCase();

  return products.filter((product) => {
    const preparedField = `
      ${product.name.toLowerCase()};
      ${product.user.name.toLowerCase()};
    `;

    return preparedField.includes(preparedSearch);
  });
};
