# React Product Categories Practice

> Here is [the working version](https://mate-academy.github.io/react_product-categories-practice/)

You are given markup for a table of products and 3 arrays.
Implement as much options below as you can:

1. Render products in a table with id, name, category and an owner (user).
    - category should render its icon before the title;
    - owner names should be colored with `has-text-link` for men and `has-text-danger` for women.
1. Implement ability to filter products by an owner:
    - If a user is selected it should be highlighter with `is-active` class;
    - Show only products of a selected user;
    - Select `All` to see all the products.
1. Use the `input` to filter products by name.
    - Show only products having the input value in their name ignoring the case;
    - The `x` button should appear only when the value is not empty;
    - Clear the value after the `x` button click.
1. Show `No results` message if there are no products matching current criteria
    - `Reset All Filters` button should clear all the filters.
1. (*) Allow to select several categories:
    - Add `is-info` class to selected categories;
    - Show only products of selected categories;
    - `All` button should clear the selection;
    - Remove `is-outlined` class from the `All` button if no categories are selected.
1. (*) Add ability to sort products by all the columns:
    - a column should have a title with the `fa-sort` icon by default;
    - the first click sorts products by the given column ascending and use `fa-sort-up` icon;
    - the second click sorts products in the descending order and use `fa-sort-down` icon;
    - the third click disables sorting;
    - products are sorted by 1 column at a time (reset the column title when clicking on the other one)

## Instructions
- Fork, clone and run `npm i`
- fix the DEMO LINK below (use your github username and the repo name)
  - [DEMO LINK](https://vchervinko.github.io/<your-repo-name>)
- implement tasks one by one (You can do it in the `App.jsx`)
- `commit`, `push` and `deploy` after each task
- Stop when the time is over (typically 2.5 hours from start)
- Create pull request and fill the [form](https://docs.google.com/forms/d/e/1FAIpQLSdtELbVv6mtCWH3rt4yjatnVz0RIp3GNSvQrjdlLxSLznx92A/viewform) (Please use the same email that you used on the platform.
  )
