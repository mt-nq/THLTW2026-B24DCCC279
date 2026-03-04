const SUBJECT_KEY = "subjects";
const SESSION_KEY = "sessions";
const GOAL_KEY = "goals";

export const loadData = <T>(key: string): T[] => {
const data = localStorage.getItem(key);
return data ? JSON.parse(data) : [];
};

export const saveData = <T>(key: string, data: T[]) => {
localStorage.setItem(key, JSON.stringify(data));
};

export const storageKeys = {
SUBJECT_KEY,
SESSION_KEY,
GOAL_KEY,
};