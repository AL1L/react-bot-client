import React from 'react';

const coolUsers = ["366085504971571200", "195658620644360193"];

export const getUsername = (user) => {
  let name = user.displayName ? user.displayName : user.username;

  if(coolUsers.includes(user.id)) {
    name = <span style={{
      fontWeight: "bolder",
      textDecoration: "underline"
    }}>{name}</span>;
  }

  return name;
}