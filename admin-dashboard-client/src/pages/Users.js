import { useEffect, useState, useCallback } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { fetchUsers } from "../api/users";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadUsers = useCallback(async () => {
  const res = await fetchUsers();
  setUsers(res.data);
}, []);


  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">Users</h2>

      <div className="bg-white shadow rounded">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td className="border p-2">{u.name}</td>
                <td className="border p-2">{u.email}</td>
                <td className="border p-2">{u.role}</td>
                <td className="border p-2">{u.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border"
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border"
        >
          Next
        </button>
      </div>
    </DashboardLayout>
  );
};

export default Users;
