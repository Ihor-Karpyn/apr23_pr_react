import React from 'react';
import cn from 'classnames';

export const SortIcon = ({
  title,
  sortType,
  sortClick,
  changeSortType,
}) => (
  <span className="is-flex is-flex-wrap-nowrap">
    {title}

    <a
      href="#/"
      onClick={() => changeSortType(title)}
    >
      <span className="icon">
        <i
          data-cy="SortIcon"
          className={cn('fas', {
            'fa-sort': sortType !== title,
            'fa-sort-up': sortType === title && sortClick === 1,
            'fa-sort-down': sortType === title && sortClick === 2,
          })}
        />
      </span>
    </a>
  </span>
);
