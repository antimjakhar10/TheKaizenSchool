import { RefreshCw, Trash2 } from "lucide-react";
import { updateAdminData } from "../../services/adminApi";

const EnquiriesPageAdmin = ({ items, token, onRefresh, showNotification }) => {
  const handleStatusChange = async (id, status) => {
    try {
      await updateAdminData(`enquiries/${id}`, "PUT", { status }, token);
      showNotification(`Enquiry status updated to ${status}`);
      onRefresh();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this enquiry?")) return;
    try {
      await updateAdminData(`enquiries/${id}`, "DELETE", null, token);
      showNotification("Enquiry deleted!");
      onRefresh();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900">
            Student & Admission Enquiries
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">
            Parent enquiries submitted through the contact form.
          </p>
        </div>
        <button
          onClick={onRefresh}
          className="p-2 text-slate-600 hover:text-slate-900"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="border-b border-slate-200 bg-slate-50 text-slate-700 uppercase">
            <tr>
              <th className="p-3">Parent</th>
              <th className="p-3">Student / Class</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Message</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-slate-400">
                  No enquiries received yet.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">
                    {item.parentName}
                  </td>
                  <td className="p-3">
                    <div>{item.studentName}</div>
                    <div className="text-[10px] text-slate-400">
                      Class: {item.classGrade}
                    </div>
                  </td>
                  <td className="p-3">
                    <div>📞 {item.phone}</div>
                    {item.email && <div>✉️ {item.email}</div>}
                  </td>
                  <td className="p-3 max-w-xs truncate">{item.message}</td>
                  <td className="p-3">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(item._id, e.target.value)
                      }
                      className={`rounded-md px-2 py-1 text-xs font-bold border ${
                        item.status === "Pending"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : item.status === "Contacted"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-emerald-50 text-emerald-700 border-emerald-200"
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-1.5 text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnquiriesPageAdmin;
