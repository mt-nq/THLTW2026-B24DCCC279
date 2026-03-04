import { Card, Tag, Space } from "antd";
import type { StudySession, MonthlyGoal } from "../types";

interface Props {
  sessions: StudySession[];
  goals: MonthlyGoal[];
}

export default function ProgressSummary({ sessions, goals }: Props) {
  const calculateTotal = (month: string, subjectId?: string) => {
    return sessions
      .filter((s) => s.date.startsWith(month))
      .filter((s) => !subjectId || s.subjectId === subjectId)
      .reduce((sum, s) => sum + s.duration, 0);
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {goals.map((g) => {
        const total = calculateTotal(g.month, g.subjectId);
        const completed = total >= g.targetMinutes;

        return (
          <Card key={g.id} size="small">
            <Space>
              <span>Tháng {g.month}</span>
              <Tag color={completed ? "green" : "orange"}>
                {total}/{g.targetMinutes} phút
              </Tag>
              <Tag color={completed ? "green" : "red"}>
                {completed ? "Hoàn thành" : "Chưa đạt"}
              </Tag>
            </Space>
          </Card>
        );
      })}
    </Space>
  );
}