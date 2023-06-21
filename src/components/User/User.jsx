import cn from 'classnames';

export const User = ({
  user,
  selectedUser,
  selectUser,
}) => (
  <a
    data-cy="FilterUser"
    href="#/"
    key={user.id}
    className={cn({ 'is-active': selectedUser === user })}
    onClick={() => selectUser(user)}
  >
    {user.name}
  </a>
);
