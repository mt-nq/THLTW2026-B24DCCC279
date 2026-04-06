import { useState } from "react";

export default function EmployeeForm({ onAdd }: any) {
const [name, setName] = useState("");
const [max, setMax] = useState(5);

return (
<div className="employee-form">
    <h3>Thêm Nhân Viên Mới</h3>

    <div className="form-group">
        <label className="form-label">Tên nhân viên:</label>
        <input
            className="form-input"
            placeholder="Nhập tên nhân viên"
            value={name}
            onChange={e => setName(e.target.value)}
        />
    </div>

    <div className="form-group">
        <label className="form-label">Số lịch tối đa/ngày:</label>
        <input
            className="form-input"
            type="number"
            placeholder="5"
            value={max}
            onChange={e => setMax(+e.target.value)}
            min="1"
            max="20"
        />
        <small className="form-hint">Số lượng lịch hẹn tối đa nhân viên có thể nhận trong một ngày</small>
    </div>

    <button
        className="form-button"
        onClick={() =>
            onAdd({
            id: Date.now().toString(),
            name,
            maxPerDay: max,
            })
        }
    >
    Thêm Nhân Viên
    </button>
</div>
);
}