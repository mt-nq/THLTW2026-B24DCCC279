import { useEffect,useState } from "react";
import { load,save,keys } from "../utils/storage";
import { Subject,Question,Exam } from "../types";
import { generateExam } from "../utils/examGenerator";

export default function ExamGenerator(){

const [subjects,setSubjects]=useState<Subject[]>([]);
const [questions,setQuestions]=useState<Question[]>([]);

const [subjectId,setSubjectId]=useState("");
const [quantity,setQuantity]=useState(3);

useEffect(()=>{
    setSubjects(load(keys.subjects));
    setQuestions(load(keys.questions));
},[]);

const createExam=()=>{

    const random=questions
    .filter(q=>q.subjectId===subjectId)
    .sort(()=>0.5-Math.random())
    .slice(0,quantity);

    if(random.length<quantity){
    alert("Không đủ câu hỏi");
    return;
    }

    const newExam:Exam={
    id:Date.now().toString(),
    subjectId,
    questions:random
    };

    const exams=load<Exam>(keys.exams);

    save(keys.exams,[...exams,newExam]);

    alert("Tạo đề thành công");
};

return(

    <div>

    <h2>Tạo đề thi</h2>

    <select onChange={e=>setSubjectId(e.target.value)}>
        <option>Chọn môn</option>
        {subjects.map(s=>(
        <option key={s.id} value={s.id}>{s.name}</option>
        ))}
    </select>

    <input
        type="number"
        value={quantity}
        onChange={e=>setQuantity(Number(e.target.value))}
    />

    <button onClick={createExam}>Tạo đề</button>

    </div>

);
}