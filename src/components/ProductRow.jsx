import cn from 'classnames';

export const ProductRow = ({ product }) => {
  const { id, name, category, user } = product;

  return (
    <tr data-cy="Product" key={product.id}>
      <td className="has-text-weight-bold" data-cy="ProductId">
        {id}
      </td>

      <td data-cy="ProductName">{name}</td>
      <td data-cy="ProductCategory">{`${category.icon} - ${category.title}`}</td>

      <td
        data-cy="ProductUser"
        className={cn(
          'has-text-link',
          {
            'has-text-danger': user.sex === 'f',
            'has-text-link': user.sex !== 'f',
          },
        )}
      >
        {user.name}
      </td>
    </tr>
  );
};
