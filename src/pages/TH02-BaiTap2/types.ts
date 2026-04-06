export interface KnowledgeBlock {
id: string;
name: string;
}

export interface Subject {
id: string;
code: string;
name: string;
credits: number;
}

export type Difficulty = "de" | "trungbinh" | "kho" | "ratkho";

export interface Question {
id: string;
subjectId: string;
blockId: string;
content: string;
difficulty: Difficulty;
}

export interface ExamStructureItem {
blockId: string;
difficulty: Difficulty;
quantity: number;
}

export interface Exam {
id: string;
subjectId: string;
questions: Question[];
}