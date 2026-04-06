import { useEffect, useState } from "react";
import { load, save, keys } from "../utils/storage";
import { KnowledgeBlock } from "../types";

export default function BlockManager() {

const [blocks,setBlocks] = useState<KnowledgeBlock[]>([]);
const [name,setName] = useState("");

useEffect(()=>{
setBlocks(load(keys.blocks));
},[]);

const add = () => {

const newBlock = {
    id: Date.now().toString(),
    name
};

const newList = [...blocks,newBlock];

setBlocks(newList);
save(keys.blocks,newList);

setName("");
};

return(
<div>

    <h2>Khối kiến thức</h2>

    <input
    value={name}
    onChange={e=>setName(e.target.value)}
    placeholder="Tên khối"
    />

    <button onClick={add}>Thêm</button>

    <ul>
    {blocks.map(b=>(
        <li key={b.id}>{b.name}</li>
    ))}
    </ul>

</div>
);
}