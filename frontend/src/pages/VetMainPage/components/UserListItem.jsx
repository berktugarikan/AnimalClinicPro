/*import defaultProfileImage from "@/assets/profile.png";

export function UserListItem({ user }) {
return (
    <li
      className="list-group-item list-group-item-action">
        <img src={defaultProfileImage}
        width="30"
        className="img-fluid rounded-circle shadow-sm"
        />
        <span className="ms-2">
            {user.username}
        </span>
    </li>
  );
}*/

import { useState } from "react";

import React from "react";

const UserListItem = ({ user, selected, onSelect }) => {
  return (
    <li
      className={`list-group-item ${selected ? "active" : ""}`}
      onClick={onSelect}
    >
      <div>
        <strong>Name:</strong> {user.firstname}
        <strong>Surname: </strong> {user.surname}
      </div>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      {/* Diğer kullanıcı bilgilerini ekleyebilirsiniz */}
    </li>
  );
};

export default UserListItem;