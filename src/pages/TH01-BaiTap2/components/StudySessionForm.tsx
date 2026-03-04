import { useState } from "react";
import { Form, Select, DatePicker, InputNumber, Input, Button, Space } from "antd";
import type { StudySession, Subject } from "../types";

interface Props {
  subjects: Subject[];
  onSubmit: (session: StudySession) => void;
  initial?: StudySession;
  onCancel?: () => void;
}

export default function StudySessionForm({ subjects, onSubmit, initial, onCancel }: Props) {
  const [subjectId, setSubjectId] = useState(initial?.subjectId || "");
  const [date, setDate] = useState(initial?.date || "");
  const [duration, setDuration] = useState(initial?.duration || 0);
  const [content, setContent] = useState(initial?.content || "");
  const [note, setNote] = useState(initial?.note || "");

  const handleSubmit = () => {
    if (!subjectId || !date || duration <= 0) return;

    onSubmit({
      id: initial?.id || crypto.randomUUID(),
      subjectId,
      date,
      duration,
      content,
      note,
    });

    // clear fields
    setSubjectId("");
    setDate("");
    setDuration(0);
    setContent("");
    setNote("");
    if (onCancel) onCancel();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit} style={{ marginBottom: 8 }}>
      <Form.Item label="Môn học" required>
        <Select
          placeholder="Chọn môn"
          onChange={(v) => setSubjectId(v)}
          value={subjectId || undefined}
        >
          {subjects.map((s) => (
            <Select.Option key={s.id} value={s.id}>
              {s.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Ngày giờ" required>
        <DatePicker
          showTime
          style={{ width: "100%" }}
          onChange={(val) => setDate(val ? val.toISOString() : "")}
        />
      </Form.Item>

      <Form.Item label="Thời lượng (phút)" required>
        <InputNumber
          min={1}
          value={duration}
          onChange={(v) => setDuration(v || 0)}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item label="Nội dung">
        <Input value={content} onChange={(e) => setContent(e.target.value)} />
      </Form.Item>

      <Form.Item label="Ghi chú">
        <Input value={note} onChange={(e) => setNote(e.target.value)} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {initial ? "Cập nhật lịch học" : "Thêm lịch học"}
        </Button>
      </Form.Item>
      {initial && onCancel && (
        <Form.Item>
          <Button onClick={handleCancel}>Hủy</Button>
        </Form.Item>
      )}
    </Form>
  );
}