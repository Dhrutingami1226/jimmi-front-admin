import React from "react";

const StoreList = ({ stores, onEdit, onDelete }) => {
  if (stores.length === 0) {
    return <p className="no-stores">No stores found.</p>;
  }

  return (
    <div className="store-list-container">
      <table className="store-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr key={store.id}>
              <td>{store.id}</td>
              <td>{store.name}</td>
              <td>{store.address.substring(0, 50)}...</td>
              <td>
                <a href={`tel:${store.phone}`}>{store.phone}</a>
              </td>
              <td>
                <button
                  onClick={() => onEdit(store)}
                  className="action-btn edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(store.id)}
                  className="action-btn delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoreList;
