    import { useEffect, useState } from "react";
    import { Diploma, Decision, FieldConfig } from "../types";
    import { load, save } from "../utils/storage";

    export default function SearchPage() {
    const [fullData, setFullData] = useState<Diploma[]>([]);
    const [result, setResult] = useState<Diploma[]>([]);
    const [decisions, setDecisions] = useState<Decision[]>([]);
    const [fields, setFields] = useState<FieldConfig[]>([]);
    const [filters, setFilters] = useState<any>({});
    const [searchCount, setSearchCount] = useState(0);

    useEffect(() => {
        setFullData(load("diplomas"));
        setDecisions(load("decisions"));
        setFields(load("fields"));
    }, []);

    const search = () => {
        const filled = Object.values(filters).filter(v => v).length;
        
        if (filled < 2) {
            alert("Điền ít nhất 2 trường tìm kiếm");
            return;
        }

        const filtered = fullData.filter(d =>
            (!filters.soHieu || d.soHieu.includes(filters.soHieu)) &&
            (!filters.soVaoSo || d.soVaoSo.toString().includes(filters.soVaoSo)) &&
            (!filters.msv || d.msv.includes(filters.msv)) &&
            (!filters.hoTen || d.hoTen.includes(filters.hoTen)) &&
            (!filters.ngaySinh || d.ngaySinh.includes(filters.ngaySinh))
        );

        setResult(filtered);
        setSearchCount(filtered.length);

        // Ghi nhận lượt tra cứu cho mỗi quyết định được tìm thấy
        if (filtered.length > 0) {
            const decisionIds = new Set(filtered.map(d => d.decisionId));
            const updatedDecisions = decisions.map(d => 
                decisionIds.has(d.id) ? {...d, searchCount: d.searchCount + 1} : d
            );
            setDecisions(updatedDecisions);
            save("decisions", updatedDecisions);
        }
    };

    const getDecisionInfo = (id: string) => {
        return decisions.find(d => d.id === id);
    };

    return (
        <div className="th04-section">
            <h2>Tra cứu văn bằng</h2>
            
            <div className="th04-search-form">
                <div className="search-field">
                    <label>Số hiệu văn bằng</label>
                    <input 
                        placeholder="Nhập số hiệu" 
                        onChange={e => setFilters({...filters, soHieu: e.target.value})}
                    />
                </div>
                
                <div className="search-field">
                    <label>Số vào sổ</label>
                    <input 
                        placeholder="Nhập số vào sổ" 
                        onChange={e => setFilters({...filters, soVaoSo: e.target.value})}
                    />
                </div>
                
                <div className="search-field">
                    <label>Mã sinh viên</label>
                    <input 
                        placeholder="Nhập MSV" 
                        onChange={e => setFilters({...filters, msv: e.target.value})}
                    />
                </div>
                
                <div className="search-field">
                    <label>Họ tên</label>
                    <input 
                        placeholder="Nhập họ tên" 
                        onChange={e => setFilters({...filters, hoTen: e.target.value})}
                    />
                </div>
                
                <div className="search-field">
                    <label>Ngày sinh</label>
                    <input 
                        type="date"
                        onChange={e => setFilters({...filters, ngaySinh: e.target.value})}
                    />
                </div>
                
                <button className="btn-primary" onClick={search}>Tra cứu</button>
            </div>

            {searchCount > 0 && (
                <div className="search-summary">
                    Tìm thấy <strong>{searchCount}</strong> kết quả
                </div>
            )}

            {result.length > 0 && (
                <table className="th04-table">
                    <thead>
                        <tr>
                            <th>Số vào sổ</th>
                            <th>Số hiệu</th>
                            <th>MSV</th>
                            <th>Họ tên</th>
                            <th>Ngày sinh</th>
                            <th>Quyết định</th>
                            <th>Trích yếu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.map(item => {
                            const decision = getDecisionInfo(item.decisionId);
                            return (
                                <tr key={item.id}>
                                    <td>{item.soVaoSo}</td>
                                    <td>{item.soHieu}</td>
                                    <td>{item.msv}</td>
                                    <td>{item.hoTen}</td>
                                    <td>{item.ngaySinh}</td>
                                    <td>{decision?.soQuyetDinh}</td>
                                    <td>{decision?.trichYeu}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}

            {result.length === 0 && searchCount > 0 && (
                <div className="no-result">
                    Không tìm thấy kết quả phù hợp
                </div>
            )}
        </div>
    );
    }