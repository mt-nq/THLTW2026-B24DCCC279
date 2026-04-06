import { useEffect,useState } from "react";
import { load,save,keys } from "../utils/storage";
import { Question, Subject, KnowledgeBlock, Difficulty } from "../types";

export default function QuestionManager(){

const [questions,setQuestions]=useState<Question[]>([]);
const [subjects,setSubjects]=useState<Subject[]>([]);
const [blocks,setBlocks]=useState<KnowledgeBlock[]>([]);

const [subjectId,setSubjectId]=useState("");
const [blockId,setBlockId]=useState("");
const [content,setContent]=useState("");
const [difficulty,setDifficulty]=useState<Difficulty>("de");

useEffect(()=>{
    setQuestions(load(keys.questions));
    setSubjects(load(keys.subjects));
    setBlocks(load(keys.blocks));
},[]);

const add=()=>{

    const newQuestion={
    id:Date.now().toString(),
    subjectId,
    blockId,
    content,
    difficulty
    };

    const newList=[...questions,newQuestion];

    setQuestions(newList);
    save(keys.questions,newList);

    setContent("");
};

return(

    <div>

    <h2>Câu hỏi</h2>

    <select onChange={e=>setSubjectId(e.target.value)}>
        <option>Chọn môn</option>
        {subjects.map(s=>(
        <option key={s.id} value={s.id}>{s.name}</option>
        ))}
    </select>

    <select onChange={e=>setBlockId(e.target.value)}>
        <option>Chọn khối</option>
        {blocks.map(b=>(
        <option key={b.id} value={b.id}>{b.name}</option>
        ))}
    </select>

    <select onChange={e=>setDifficulty(e.target.value as Difficulty)}>
        <option value="de">Dễ</option>
        <option value="trungbinh">Trung bình</option>
        <option value="kho">Khó</option>
        <option value="ratkho">Rất khó</option>
    </select>

    <input
        placeholder="Nội dung câu hỏi"
        value={content}
        onChange={e=>setContent(e.target.value)}
    />

    <button onClick={add}>Thêm</button>

    <ul>
        {questions.map(q=>(
        <li key={q.id}>{q.content}</li>
        ))}
    </ul>

    </div>

);
}