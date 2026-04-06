import { useEffect, useState } from "react";
import { load, save, keys } from "../utils/storage";
import { Subject } from "../types";

export default function SubjectManager(){

const [subjects,setSubjects] = useState<Subject[]>([]);
const [code,setCode] = useState("");
const [name,setName] = useState("");
const [credits,setCredits] = useState(3);

useEffect(()=>{
setSubjects(load(keys.subjects));
},[]);

const add = ()=>{

const newSubject={
    id:Date.now().toString(),
    code,
    name,
    credits
};

const newList=[...subjects,newSubject];

setSubjects(newList);
save(keys.subjects,newList);

setCode("");
setName("");
};

return(
<div>

    <h2>Môn học</h2>

    <input
    placeholder="Mã môn"
    value={code}
    onChange={e=>setCode(e.target.value)}
    />

    <input
    placeholder="Tên môn"
    value={name}
    onChange={e=>setName(e.target.value)}
    />

    <input
    type="number"
    value={credits}
    onChange={e=>setCredits(Number(e.target.value))}
    />

    <button onClick={add}>Thêm</button>

    <ul>
    {subjects.map(s=>(
        <li key={s.id}>
        {s.code} - {s.name} ({s.credits} tín chỉ)
        </li>
    ))}
    </ul>

</div>
);
}