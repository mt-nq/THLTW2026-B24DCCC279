import { useState } from "react";

export default function ServiceForm({ onAdd }: any) {
const [name, setName] = useState("");
const [price, setPrice] = useState(0);
const [duration, setDuration] = useState(30);

return (
<div className="service-form">
    <h3>Thêm Dịch Vụ Mới</h3>

    <div className="form-group">
        <label className="form-label">Tên dịch vụ:</label>
        <input
            className="form-input"
            placeholder="Nhập tên dịch vụ"
            value={name}
            onChange={e => setName(e.target.value)}
        />
    </div>

    <div className="form-group">
        <label className="form-label">Giá dịch vụ (VNĐ):</label>
        <input
            className="form-input"
            type="number"
            placeholder="100000"
            value={price}
            onChange={e => setPrice(+e.target.value)}
            min="0"
            step="10000"
        />
        <small className="form-hint">Giá tiền của dịch vụ (VNĐ)</small>
    </div>

    <div className="form-group">
        <label className="form-label">Thời gian (phút):</label>
        <input
            className="form-input"
            type="number"
            placeholder="60"
            value={duration}
            onChange={e => setDuration(+e.target.value)}
            min="1"
            max="480"
        />
        <small className="form-hint">Thời gian thực hiện dịch vụ (tính bằng phút)</small>
    </div>

    <button
        className="form-button"
        onClick={() =>
            onAdd({
            id: Date.now().toString(),
            name,
            price,
            duration,
            })
        }
    >
    Thêm Dịch Vụ
    </button>
</div>
);
}