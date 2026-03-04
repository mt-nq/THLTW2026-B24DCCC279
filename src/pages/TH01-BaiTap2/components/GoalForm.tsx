import { useState } from "react";
import { Form, Select, InputNumber, DatePicker, Button } from "antd";
import type { MonthlyGoal, Subject } from "../types";

interface Props {
  subjects: Subject[];
  onSubmit: (goal: MonthlyGoal) => void;
}

export default function GoalForm({ subjects, onSubmit }: Props) {
  const [month, setMonth] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [target, setTarget] = useState(0);

  const handleSubmit = () => {
    if (!month || target <= 0) return;

    onSubmit({
      id: crypto.randomUUID(),
      month,
      subjectId: subjectId || undefined,
      targetMinutes: target,
    });

    setMonth("");
    setSubjectId("");
    setTarget(0);
  };

  return (
    <Form layout="inline" onFinish={handleSubmit} style={{ marginBottom: 8 }}>
      <Form.Item>
        <DatePicker
          picker="month"
          onChange={(val) => setMonth(val ? val.format("YYYY-MM") : "")}
          value={month ? undefined : undefined}
          placeholder="Tháng"
        />
      </Form.Item>
      <Form.Item>
        <Select
          style={{ width: 150 }}
          placeholder="Tổng tất cả"
          onChange={(v) => setSubjectId(v)}
          value={subjectId || undefined}
        >
          <Select.Option value="">Tổng tất cả</Select.Option>
          {subjects.map((s) => (
            <Select.Option key={s.id} value={s.id}>
              {s.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <InputNumber
          min={1}
          placeholder="Mục tiêu (phút)"
          value={target}
          onChange={(v) => setTarget(v || 0)}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Đặt mục tiêu
        </Button>
      </Form.Item>
    </Form>
  );
}