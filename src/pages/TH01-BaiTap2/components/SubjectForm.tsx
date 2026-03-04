import { useState } from "react";
import { Form, Input, Button } from "antd";
import type { Subject } from "../types";

interface Props {
  onSubmit: (subject: Subject) => void;
  initial?: Subject;
  onCancel?: () => void;
}

export default function SubjectForm({ onSubmit, initial, onCancel }: Props) {
  const [name, setName] = useState(initial?.name || "");

  const handleSubmit = () => {
    if (!name.trim()) return;

    onSubmit({
      id: initial?.id || crypto.randomUUID(),
      name,
    });
    setName("");
    if (onCancel) onCancel();
  };

  const handleCancel = () => {
    setName("");
    if (onCancel) onCancel();
  };

  return (
    <Form layout="inline" onFinish={handleSubmit} style={{ marginBottom: 8 }}>
      <Form.Item>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên môn học"
          style={{ width: 200 }}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {initial ? "Cập nhật" : "Thêm"}
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