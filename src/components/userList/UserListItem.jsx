import React from 'react';
import './userListItem.scss';

const UserListItem = ({ user }) => {
  return (
    <div className="user-list-item">
      <img src={user.profilePicture} alt={user.nameSurname} className="profile-picture" />
      <span className="name-surname">{user.nameSurname}</span>
    </div>
  );
};

export default UserListItem;