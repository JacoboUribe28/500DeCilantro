import React from 'react';
import { User } from '../../models/User';

interface UserProfileProps {
  user: User;
  data: object[];
  columns: string[];
}

const UserProfile: React.FC<UserProfileProps> = ({ user, data, columns }) => {
  return (
    <div className="user-profile-list">
      <div className="user-profile">
        <h3>{user.name}</h3>
        <p>Email: {user.email}</p>
        <p>Edad: {user.age}</p>
      </div>
      
      <h2>Lista de Clientes</h2>
      <table>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>{(row as any)[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserProfile;
