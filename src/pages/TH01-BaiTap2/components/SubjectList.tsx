import { List, Button, Space } from "antd";
import type { Subject } from "../types";

interface Props {
  subjects: Subject[];
  onDelete: (id: string) => void;
  onEdit?: (subject: Subject) => void;
}

export default function SubjectList({ subjects, onDelete, onEdit }: Props) {
  return (
    <List
      size="small"
      bordered
      dataSource={subjects}
      renderItem={(s) => (
        <List.Item
          actions={[
            onEdit && (
              <Button
                key="edit"
                type="link"
                onClick={() => onEdit(s)}
              >
                Sửa
              </Button>
            ),
            <Button
              key="delete"
              type="link"
              danger
              onClick={() => onDelete(s.id)}
            >
              Xóa
            </Button>,
          ]}
        >
          {s.name}
        </List.Item>
      )}
    />
  );
}