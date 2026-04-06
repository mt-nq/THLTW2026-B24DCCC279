import { Question, ExamStructureItem } from "../types";

export function generateExam(
subjectId: string,
structure: ExamStructureItem[],
questions: Question[]
) {
let examQuestions: Question[] = [];

for (let item of structure) {

const filtered = questions.filter(q =>
    q.subjectId === subjectId &&
    q.blockId === item.blockId &&
    q.difficulty === item.difficulty
);

if (filtered.length < item.quantity) {
    throw new Error("Không đủ câu hỏi");
}

const shuffled = [...filtered].sort(() => 0.5 - Math.random());

examQuestions.push(...shuffled.slice(0, item.quantity));
}

return examQuestions;
}