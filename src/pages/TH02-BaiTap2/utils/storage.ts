export const keys = {
subjects: "subjects",
blocks: "blocks",
questions: "questions",
exams: "exams"
};

export function load<T>(key: string): T[] {
const data = localStorage.getItem(key);
return data ? JSON.parse(data) : [];
}

export function save<T>(key: string, data: T[]) {
localStorage.setItem(key, JSON.stringify(data));
}