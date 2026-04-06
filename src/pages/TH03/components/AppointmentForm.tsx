import { useState } from "react";
import { calcEnd, isConflict } from "../utils/helpers";
import { Appointment } from "../types";

export default function AppointmentForm({
employees,
services,
apps,
onAdd,
}: any) {
const [customer, setCustomer] = useState("");
const [emp, setEmp] = useState("");
const [ser, setSer] = useState("");
const [date, setDate] = useState("");
const [start, setStart] = useState("");

const handle = () => {
const service = services.find((s: any) => s.id === ser);
if (!service) return;

const end = calcEnd(start, service.duration);

const newApp: Appointment = {
    id: Date.now().toString(),
    customer,
    employeeId: emp,
    serviceId: ser,
    date,
    start,
    end,
    status: "pending",
};

if (isConflict(newApp, apps)) return alert("Trùng!");

onAdd(newApp);
};

return (
<div className="appointment-form">
    <h3 className="form-title">Đặt Lịch Hẹn</h3>

    <div className="form-group">
        <label className="form-label">Tên Khách:</label>
        <input
            className="form-input"
            placeholder="Ví dụ: Nguyễn Văn A"
            value={customer}
            onChange={e => setCustomer(e.target.value)}
        />
        <small className="form-hint">Nhập họ và tên đầy đủ của khách hàng</small>
    </div>

    <div className="form-group">
        <label className="form-label">Nhân Viên:</label>
        <select
            className="form-select"
            value={emp}
            onChange={e => setEmp(e.target.value)}
        >
            <option value="">Chọn nhân viên</option>
            {employees.map((e: any) => (
                <option key={e.id} value={e.id}>{e.name}</option>
            ))}
        </select>
        <small className="form-hint">Chọn nhân viên sẽ thực hiện dịch vụ</small>
    </div>

    <div className="form-group">
        <label className="form-label">Dịch Vụ:</label>
        <select
            className="form-select"
            value={ser}
            onChange={e => setSer(e.target.value)}
        >
            <option value="">Chọn dịch vụ</option>
            {services.map((s: any) => (
                <option key={s.id} value={s.id}>{s.name}</option>
            ))}
        </select>
        <small className="form-hint">Chọn loại dịch vụ bạn muốn đặt lịch</small>
    </div>

    <div className="form-group">
        <label className="form-label">Ngày:</label>
        <input
            className="form-input"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            placeholder="Chọn ngày"
        />
        <small className="form-hint">Chọn ngày bạn muốn đặt lịch</small>
    </div>

    <div className="form-group">
        <label className="form-label">Giờ Bắt Đầu:</label>
        <input
            className="form-input"
            type="time"
            value={start}
            onChange={e => setStart(e.target.value)}
            placeholder="Chọn giờ"
        />
        <small className="form-hint">Chọn thời gian bắt đầu (VD: 09:00)</small>
    </div>

    <button className="form-button" onClick={handle}>Đặt Lịch</button>
</div>
);
}