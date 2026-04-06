import { useState } from "react";

export default function ReviewList({ reviews, employees, onReply }: any) {
  const [replyText, setReplyText] = useState<Record<string, string>>({});

  const findEmployeeName = (id: string) => {
    const emp = employees.find((e: any) => e.id === id);
    return emp ? emp.name : "(Không rõ)";
  };

  if (!reviews?.length) {
    return (
      <div className="review-list">
        <h3>Danh sách đánh giá</h3>
        <p>Chưa có đánh giá nào.</p>
      </div>
    );
  }

  return (
    <div className="review-list">
      <h3>Danh sách đánh giá</h3>
      {reviews.map((r: any) => (
        <div key={r.id} className="review-item">
          <div className="review-meta">
            <span className="review-rating">⭐ {r.rating}</span>
            <span className="review-employee">Nhân viên: {findEmployeeName(r.employeeId)}</span>
          </div>
          <div className="review-comment">{r.comment}</div>

          {r.reply ? (
            <div className="review-reply">
              <strong>Phản hồi:</strong> {r.reply}
            </div>
          ) : (
            <div className="review-reply-form">
              <input
                className="form-input"
                placeholder="Phản hồi (nhân viên)"
                value={replyText[r.id] ?? ""}
                onChange={(e) =>
                  setReplyText(prev => ({ ...prev, [r.id]: e.target.value }))
                }
              />
              <button
                className="form-button-small"
                onClick={() => {
                  const reply = replyText[r.id]?.trim();
                  if (!reply) return;
                  onReply(r.id, reply);
                  setReplyText(prev => ({ ...prev, [r.id]: "" }));
                }}
              >
                Phản hồi
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
