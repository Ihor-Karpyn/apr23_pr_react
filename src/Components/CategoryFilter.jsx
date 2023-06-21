import React from 'react';
import cn from 'classnames';

export const CategoryFilter = ({
  categories,
  selectedCategoryIds,
  selectHandler,
  clearFilter,
}) => (
  <div className="panel-block is-flex-wrap-wrap">
    <a
      href="#/"
      data-cy="AllCategories"
      className="button is-success mr-6 is-outlined"
      onClick={clearFilter}
    >
      All
    </a>

    {categories.map(category => (
      <a
        data-cy="Category"
        className={cn('button mr-2 my-1', {
          'is-info': selectedCategoryIds.includes(category.id),
        })}
        href="#/"
        onClick={() => selectHandler(category.id)}
      >
        {category.title}
      </a>
    ))}
  </div>
);
