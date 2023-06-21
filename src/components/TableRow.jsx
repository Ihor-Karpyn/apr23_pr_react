
export const TableRow = ({ product }) => {
  const { id, name, category, user } = product;
  const categoryStr = `${category.icon} - ${category.title}`;

  return (
    <tr data-cy="Product">
      <td className="has-text-weight-bold" data-cy="ProductId">
        {id}
      </td>

      <td data-cy="ProductName">{name}</td>
      <td data-cy="ProductCategory">
        {categoryStr}
      </td>

      <td data-cy="ProductUser" className="has-text-link">
        {user.name}
      </td>
    </tr>
  );
};
