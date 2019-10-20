import React from 'react';



const UserTable = props => (
  <table>
    <thead>
      <tr>
        <th>Email</th>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.users.length > 0 ? (
        props.users.map(user => (
          <tr key={user._id}>
            <td>{user.email}</td>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>
              <a href = {'/update/'+user._id}><button className="button muted-button">Edit</button></a>
              <button onClick = {() => props.deleteUser(user._id)} className="button muted-button">Delete</button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No users</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default UserTable