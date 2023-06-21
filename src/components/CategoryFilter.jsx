import React from 'react';

export const CategoryFilter = ({ categories, setCategory }) => {
  const s = 0;

  return (
    <div className="panel-block is-flex-wrap-wrap">
      <a
        href="#/"
        data-cy="AllCategories"
        className="button is-success mr-6 is-outlined"
        onClick={() => setCategory(null)}
      >
        All
      </a>

      {categories.map(category => (
        <Category category={category.title} setCategory={setCategory} />
      ))}
    </div>
  );
};

const Category = ({ category, setCategory }) => (
  <a
    data-cy="Category"
    className="button mr-2 my-1"
    href="#/"
    onClick={() => setCategory(category)}
  >
    {category}
  </a>
);
