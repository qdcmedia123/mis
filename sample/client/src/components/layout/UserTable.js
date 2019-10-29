import React from "react";

const formatter = new Intl.NumberFormat("uk-UK", {
  style: "currency",
  currency: "EUR"
});

const UserTable = props => (
  <table className="table text-xs-cente">
    <thead className="thead-dark">
      <tr>
        <th scop="col">Name</th>
        <th scop="col">Card Number</th>
        <th scop="col"> Balance</th>
        <th scop="col">Limit</th>
      </tr>
    </thead>
    <tbody>
      {props.users.length > 0 && typeof props.users === 'object'? (
        props.users.map(user => (
          <tr key={user._id} className="text-left">
            <td>{user.name}</td>
            <td>{user.card_number}</td>
            <td>£ {formatter.format(user.balance)}</td>
            <td>£ {formatter.format(user.limit)}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No users</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default UserTable;
