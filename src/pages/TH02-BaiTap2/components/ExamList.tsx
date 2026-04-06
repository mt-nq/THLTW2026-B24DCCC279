import { useEffect,useState } from "react";
import { load,keys } from "../utils/storage";
import { Exam } from "../types";

export default function ExamList(){

const [exams,setExams]=useState<Exam[]>([]);

useEffect(()=>{
    setExams(load(keys.exams));
},[]);

return(

    <div>

    <h2>Danh sách đề thi</h2>

    {exams.map(e=>(
        <div key={e.id}>

        <h3>Đề {e.id}</h3>

        <ul>
            {e.questions.map(q=>(
            <li key={q.id}>{q.content}</li>
            ))}
        </ul>

        </div>
    ))}

    </div>

);
}