export interface Subject {
id: string;
name: string;
}

export interface StudySession {
id: string;
subjectId: string;
date: string; // ISO string
duration: number; // phút
content: string;
note?: string;
}

export interface MonthlyGoal {
id: string;
month: string; // ví dụ: "2026-03"
subjectId?: string; // nếu null thì là tổng toàn bộ
targetMinutes: number;
}