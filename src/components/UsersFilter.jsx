import React from 'react';

export const UsersFilter = ({ users, setFilterName }) => {
  const s = 1;

  return (
    <p className="panel-tabs has-text-weight-bold">
      <a data-cy="FilterAllUsers" href="#/" onClick={() => setFilterName(null)}>
        All
      </a>

      {users.map(user => (
        <Filter name={user.name} setFilterName={setFilterName} />
      ))}
    </p>
  );
};

const Filter = ({ name, setFilterName }) => (
  <a
    data-cy="FilterUser"
    href="#/"
    onClick={() => setFilterName(name)}
  >
    {name}
  </a>
);
