import { useState } from "react";

export default function EmployeeList({ data, reviews, onDelete, onUpdate }: any) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editMax, setEditMax] = useState(5);

  const computeAvgRating = (employeeId: string) => {
    const employeeReviews = reviews.filter((r: any) => r.employeeId === employeeId);
    if (!employeeReviews.length) return null;
    const sum = employeeReviews.reduce((acc: number, r: any) => acc + (r.rating || 0), 0);
    return sum / employeeReviews.length;
  };

  const startEdit = (employee: any) => {
    setEditingId(employee.id);
    setEditName(employee.name);
    setEditMax(employee.maxPerDay);
  };

  const saveEdit = () => {
    if (!editingId) return;
    onUpdate({ id: editingId, name: editName, maxPerDay: editMax });
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="list">
      <h3>Danh sách NV</h3>
      {data.map((e: any) => {
        const avgRating = computeAvgRating(e.id);
        return (
          <div key={e.id} className="list-item">
            {editingId === e.id ? (
              <>
                <input
                  className="form-input"
                  value={editName}
                  onChange={(evt) => setEditName(evt.target.value)}
                />
                <input
                  className="form-input"
                  type="number"
                  value={editMax}
                  onChange={(evt) => setEditMax(+evt.target.value)}
                  min={1}
                />
                <button className="form-button-small" onClick={saveEdit}>
                  Lưu
                </button>
                <button className="form-button-small cancel" onClick={cancelEdit}>
                  Hủy
                </button>
              </>
            ) : (
              <>
                <span>
                  {e.name} - max: {e.maxPerDay}{' '}
                  {avgRating != null && (
                    <em style={{ marginLeft: 12 }}>
                      (TB: {avgRating.toFixed(1)} ⭐)
                    </em>
                  )}
                </span>
                <button className="form-button-small" onClick={() => startEdit(e)}>
                  Sửa
                </button>
                <button className="form-button-small cancel" onClick={() => onDelete(e.id)}>
                  X
                </button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}