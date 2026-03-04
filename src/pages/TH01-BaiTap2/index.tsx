import { useEffect, useState } from "react";
import type { Subject, StudySession, MonthlyGoal } from "./types";
import { loadData, saveData, storageKeys } from "./utils/storage";

// components
import SubjectForm from "./components/SubjectForm";
import SubjectList from "./components/SubjectList";
import StudySessionForm from "./components/StudySessionForm";
import SessionList from "./components/SessionList";
import ProgressSummary from "./components/ProgressSummary";
import GoalForm from "./components/GoalForm";
import { Card, Space, Typography } from "antd";
const { Title } = Typography;

export default function TH01BaiTap2() {
const [subjects, setSubjects] = useState<Subject[]>([]);
const [sessions, setSessions] = useState<StudySession[]>([]);
const [goals, setGoals] = useState<MonthlyGoal[]>([]);

// editing state
const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
const [editingSession, setEditingSession] = useState<StudySession | null>(null);

useEffect(() => {
const loadedSubjects = loadData<Subject>(storageKeys.SUBJECT_KEY);
const loadedSessions = loadData<StudySession>(storageKeys.SESSION_KEY);
const loadedGoals = loadData<MonthlyGoal>(storageKeys.GOAL_KEY);

setSubjects(loadedSubjects);
setSessions(loadedSessions);
setGoals(loadedGoals);
}, []);

useEffect(() => {
saveData(storageKeys.SUBJECT_KEY, subjects);
}, [subjects]);

useEffect(() => {
saveData(storageKeys.SESSION_KEY, sessions);
}, [sessions]);

useEffect(() => {
    saveData(storageKeys.GOAL_KEY, goals);
}, [goals]);

// ----- handlers -------------------------------------------------------
const addSubject = (s: Subject) => setSubjects((prev) => [...prev, s]);
const updateSubject = (s: Subject) =>
    setSubjects((prev) => prev.map((x) => (x.id === s.id ? s : x)));
const deleteSubject = (id: string) =>
    setSubjects((prev) => prev.filter((x) => x.id !== id));

const addSession = (ses: StudySession) =>
    setSessions((prev) => [...prev, ses]);
const updateSession = (ses: StudySession) =>
    setSessions((prev) => prev.map((x) => (x.id === ses.id ? ses : x)));
const deleteSession = (id: string) =>
    setSessions((prev) => prev.filter((x) => x.id !== id));

const addGoal = (g: MonthlyGoal) => setGoals((prev) => [...prev, g]);

return (
  <div style={{ padding: 20 }}>
    <Title level={2}>Quản lý học tập</Title>

    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card title="Danh sách môn học" size="small">
        <SubjectForm
          onSubmit={editingSubject ? updateSubject : addSubject}
          initial={editingSubject ?? undefined}
          onCancel={() => setEditingSubject(null)}
        />
        <SubjectList
          subjects={subjects}
          onDelete={deleteSubject}
          onEdit={(s) => setEditingSubject(s)}
        />
      </Card>

      <Card title="Lịch học" size="small">
        <StudySessionForm
          subjects={subjects}
          onSubmit={editingSession ? updateSession : addSession}
          initial={editingSession ?? undefined}
          onCancel={() => setEditingSession(null)}
        />
        <SessionList
          sessions={sessions}
          subjects={subjects}
          onEdit={(s) => setEditingSession(s)}
          onDelete={deleteSession}
        />
      </Card>

      <Card title="Mục tiêu hàng tháng" size="small">
        <GoalForm subjects={subjects} onSubmit={addGoal} />
      </Card>

      <Card title="Tóm tắt tiến độ" size="small">
        <ProgressSummary sessions={sessions} goals={goals} />
      </Card>
    </Space>
  </div>
);
}