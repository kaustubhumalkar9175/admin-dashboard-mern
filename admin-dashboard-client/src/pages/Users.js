import { useEffect, useState, useCallback } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { fetchUsers } from "../api/users";

const Users = () => {
  const [users, setUsers] = useState([]);

  const loadUsers = useCallback(async () => {
    try {
      const res = await fetchUsers();
      setUsers(res.data);
    } catch (error) {
      console.error("Failed to load users", error);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">Users</h2>

      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Email</th>
              <th className="border p-2 text-left">Role</th>
              <th className="border p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u._id}>
                  <td className="border p-2">{u.name}</td>
                  <td className="border p-2">{u.email}</td>
                  <td className="border p-2 capitalize">{u.role}</td>
                  <td className="border p-2 capitalize">{u.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default Users;
