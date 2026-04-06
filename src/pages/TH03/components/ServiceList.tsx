import { useState } from "react";

export default function ServiceList({ data, onUpdate, onDelete }: any) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState(0);
  const [editDuration, setEditDuration] = useState(0);

  const startEdit = (service: any) => {
    setEditingId(service.id);
    setEditName(service.name);
    setEditPrice(service.price);
    setEditDuration(service.duration);
  };

  const saveEdit = () => {
    if (!editingId) return;
    onUpdate({ id: editingId, name: editName, price: editPrice, duration: editDuration });
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="service-list">
      <h3>Dịch vụ</h3>
      {data.map((s: any) => (
        <div key={s.id} className="service-item">
          {editingId === s.id ? (
            <>
              <input
                className="form-input"
                value={editName}
                onChange={(evt) => setEditName(evt.target.value)}
              />
              <input
                className="form-input"
                type="number"
                value={editPrice}
                onChange={(evt) => setEditPrice(+evt.target.value)}
                min={0}
                step={1000}
              />
              <input
                className="form-input"
                type="number"
                value={editDuration}
                onChange={(evt) => setEditDuration(+evt.target.value)}
                min={1}
              />
              <div className="form-buttons">
                <button className="form-button-small" onClick={saveEdit}>
                  Lưu
                </button>
                <button className="form-button-small cancel" onClick={cancelEdit}>
                  Hủy
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="service-name">{s.name}</div>
              <div className="service-meta">
                <span className="service-price">{s.price.toLocaleString()}đ</span>
                <span className="service-duration">{s.duration} phút</span>
              </div>
              <div className="form-buttons">
                <button className="form-button-small" onClick={() => startEdit(s)}>
                  Sửa
                </button>
                <button className="form-button-small cancel" onClick={() => onDelete(s.id)}>
                  X
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}