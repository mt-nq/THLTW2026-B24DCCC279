import { List, Button } from "antd";
import type { StudySession, Subject } from "../types";

interface Props {
sessions: StudySession[];
subjects: Subject[];
onEdit?: (session: StudySession) => void;
onDelete?: (id: string) => void;
}

export default function SessionList({ sessions, subjects, onEdit, onDelete }: Props) {
return (
<List
    size="small"
    bordered
    dataSource={sessions}
    renderItem={(s) => {
    const subj = subjects.find((x) => x.id === s.subjectId);
    return (
        <List.Item
        actions={[
            ...(onEdit
            ? [
                <Button
                    key="edit"
                    type="link"
                    onClick={() => onEdit(s)}
                >
                    Sửa
                </Button>,
                ]
            : []),
            ...(onDelete
            ? [
                <Button
                    key="del"
                    type="link"
                    danger
                    onClick={() => onDelete(s.id)}
                >
                    Xóa
                </Button>,
                ]
            : []),
        ]}
        >
        <div>
            <strong>{s.date}</strong> &ndash; {subj?.name || "(chưa chọn)"} –{' '}
            {s.duration} phút
        </div>
        </List.Item>
    );
    }}
/>
);
}
