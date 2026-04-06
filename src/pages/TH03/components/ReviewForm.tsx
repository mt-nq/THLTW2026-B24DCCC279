import { useState } from "react";

export default function ReviewForm({ apps, onAdd }: any) {
const [rating, setRating] = useState(5);
const [comment, setComment] = useState("");

return (
<div className="review-form">
    <h3>Đánh giá dịch vụ</h3>
    {apps
    .filter((a: any) => a.status === "completed")
    .map((a: any) => (
        <div key={a.id} className="review-item">
            <h4>Khách hàng: {a.customer}</h4>

            <div className="form-group">
                <label className="form-label">Đánh giá (1-5 sao):</label>
                <input
                    className="form-input"
                    type="number"
                    placeholder="5"
                    value={rating}
                    onChange={e => setRating(+e.target.value)}
                    min="1"
                    max="5"
                />
                <small className="form-hint">Đánh giá chất lượng dịch vụ từ 1 đến 5 sao</small>
            </div>

            <div className="form-group">
                <label className="form-label">Nhận xét:</label>
                <textarea
                    className="form-textarea"
                    placeholder="Nhập nhận xét của bạn..."
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    rows={3}
                />
            </div>

            <button
                className="form-button"
                onClick={() =>
                onAdd({
                    id: Date.now().toString(),
                    appointmentId: a.id,
                    employeeId: a.employeeId,
                    rating,
                    comment,
                })
                }
            >
                Gửi đánh giá
            </button>
        </div>
    ))}
</div>
);
}