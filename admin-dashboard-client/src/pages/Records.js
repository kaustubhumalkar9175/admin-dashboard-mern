import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";
import Modal from "../components/Modal";
import {
  fetchRecords,
  deleteRecord,
  updateRecord,
  createRecord,
} from "../api/records";

/* =========================
   REUSABLE RECORD FORM
   (OUTSIDE component to
   prevent focus loss)
========================= */
const RecordForm = ({ formData, handleChange, onSubmit }) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <input
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <button
        type="button"
        onClick={onSubmit}
        className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Save
      </button>
    </div>
  );
};

/* =========================
   RECORDS PAGE
========================= */
const Records = () => {
  const { user } = useSelector((state) => state.auth);

  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Form state
  const initialFormState = {
    title: "",
    category: "",
    status: "active",
    amount: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);

  // Load records
  const loadRecords = useCallback(async () => {
  const res = await fetchRecords({ page, search });
  setRecords(res.data);
  setTotalPages(res.pagination.totalPages);
}, [page, search]);



  useEffect(() => {
  loadRecords();
}, [loadRecords]);


  // Input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Create record
  const handleCreate = async () => {
    try {
      await createRecord(formData);
      toast.success("Record created successfully");
      setShowCreateModal(false);
      setFormData(initialFormState);
      loadRecords();
    } catch {
      toast.error("Failed to create record");
    }
  };

  // Open edit modal
  const openEditModal = (record) => {
    setEditingId(record._id);
    setFormData({
      title: record.title,
      category: record.category,
      status: record.status,
      amount: record.amount,
    });
    setShowEditModal(true);
  };

  // Update record
  const handleUpdate = async () => {
    try {
      await updateRecord(editingId, formData);
      toast.success("Record updated successfully");
      setShowEditModal(false);
      setEditingId(null);
      loadRecords();
    } catch {
      toast.error("Failed to update record");
    }
  };

  // Delete record
  const handleDelete = async (id) => {
    if (window.confirm("Delete this record?")) {
      await deleteRecord(id);
      toast.success("Record deleted");
      loadRecords();
    }
  };

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">Records</h2>

      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-4">
        <input
          className="border p-2 w-64 rounded"
          placeholder="Search records..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {(user.role === "admin" || user.role === "manager") && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          >
            + Create Record
          </button>
        )}
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Title</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r._id}>
                <td className="border p-2">{r.title}</td>
                <td className="border p-2">{r.category}</td>
                <td className="border p-2">{r.status}</td>
                <td className="border p-2">{r.amount}</td>
                <td className="border p-2 space-x-2">
                  {(user.role === "admin" || user.role === "manager") && (
                    <button
                      onClick={() => openEditModal(r)}
                      className="text-blue-600"
                    >
                      Edit
                    </button>
                  )}
                  {user.role === "admin" && (
                    <button
                      onClick={() => handleDelete(r._id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="mt-4 flex gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border rounded"
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border rounded"
        >
          Next
        </button>
      </div>

      {/* CREATE MODAL */}
      {showCreateModal && (
        <Modal title="Create Record" onClose={() => setShowCreateModal(false)}>
          <RecordForm
            formData={formData}
            handleChange={handleChange}
            onSubmit={handleCreate}
          />
        </Modal>
      )}

      {/* EDIT MODAL */}
      {showEditModal && (
        <Modal title="Edit Record" onClose={() => setShowEditModal(false)}>
          <RecordForm
            formData={formData}
            handleChange={handleChange}
            onSubmit={handleUpdate}
          />
        </Modal>
      )}
    </DashboardLayout>
  );
};

export default Records;
