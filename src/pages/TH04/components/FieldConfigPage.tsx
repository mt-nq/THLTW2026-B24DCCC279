import { useEffect, useState } from "react";
import { FieldConfig } from "../types";
import { load, save } from "../utils/storage";

export default function FieldConfigPage() {
const [data, setData] = useState<FieldConfig[]>([]);
const [name, setName] = useState("");
const [type, setType] = useState("string");
const [editId, setEditId] = useState<string | null>(null);
const [editName, setEditName] = useState("");
const [editType, setEditType] = useState("string");

useEffect(() => {
    setData(load("fields"));
}, []);

const add = () => {
    if (!name.trim()) return alert("Nhập tên trường");
    
    const newItem: FieldConfig = {
    id: Date.now().toString(),
    name,
    type: type as any,
    };

    const newData = [...data, newItem];
    setData(newData);
    save("fields", newData);
    setName("");
};

const edit = (item: FieldConfig) => {
    setEditId(item.id);
    setEditName(item.name);
    setEditType(item.type);
};

const saveEdit = () => {
    const newData = data.map(i => i.id === editId ? {id: i.id, name: editName, type: editType as any} : i);
    setData(newData);
    save("fields", newData);
    setEditId(null);
};

const delete_ = (id: string) => {
    if (window.confirm("Chắc chắn xóa?")) {
        const newData = data.filter(i => i.id !== id);
        setData(newData);
        save("fields", newData);
    }
};

return (
    <div className="th04-section">
        <h2>Cấu hình biểu mẫu</h2>
        
        {editId ? (
            <div className="th04-form">
                <input 
                    value={editName} 
                    onChange={e => setEditName(e.target.value)} 
                    placeholder="Tên trường"
                />
                <select value={editType} onChange={e => setEditType(e.target.value)}>
                    <option value="string">String</option>
                    <option value="number">Number</option>
                    <option value="date">Date</option>
                </select>
                <button className="btn-save" onClick={saveEdit}>Lưu</button>
                <button className="btn-cancel" onClick={() => setEditId(null)}>Hủy</button>
            </div>
        ) : (
            <div className="th04-form">
                <input 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder="Tên trường"
                />
                <select value={type} onChange={e => setType(e.target.value)}>
                    <option value="string">String</option>
                    <option value="number">Number</option>
                    <option value="date">Date</option>
                </select>
                <button onClick={add}>Thêm trường</button>
            </div>
        )}

        <table className="th04-table">
            <thead>
                <tr>
                    <th>Tên trường</th>
                    <th>Kiểu dự liệu</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                {data.map(item => (
                    <tr key={item.id}>
                        <td>
                            {editId === item.id ? (
                                <input value={editName} onChange={e => setEditName(e.target.value)} />
                            ) : (
                                item.name
                            )}
                        </td>
                        <td>
                            {editId === item.id ? (
                                <select value={editType} onChange={e => setEditType(e.target.value)}>
                                    <option value="string">String</option>
                                    <option value="number">Number</option>
                                    <option value="date">Date</option>
                                </select>
                            ) : (
                                item.type
                            )}
                        </td>
                        <td>
                            {editId === item.id ? (
                                <>
                                    <button className="btn-save" onClick={saveEdit}>Lưu</button>
                                    <button className="btn-cancel" onClick={() => setEditId(null)}>Hủy</button>
                                </>
                            ) : (
                                <>
                                    <button className="btn-edit" onClick={() => edit(item)}>Sửa</button>
                                    <button className="btn-delete" onClick={() => delete_(item.id)}>Xóa</button>
                                </>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
}