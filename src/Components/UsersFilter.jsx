import React from 'react';
import cn from 'classnames';

export const UsersFilter = ({
  users,
  selectedUserId,
  setSelectedUserId,
}) => (
  <p className="panel-tabs has-text-weight-bold">
    <a
      data-cy="FilterAllUsers"
      href="#/"
      onClick={() => setSelectedUserId(null)}
      className={cn({ 'is-active': !selectedUserId })}
    >
      All
    </a>

    {users.map(user => (
      <a
        data-cy="FilterUser"
        href="#/"
        className={cn({ 'is-active': user.id === selectedUserId })}
        onClick={() => setSelectedUserId(user.id)}
      >
        {user.name}
      </a>
    ))}

  </p>
);

// className="is-active"
