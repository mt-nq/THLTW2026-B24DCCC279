export default function AppointmentList({ data, onUpdate }: any) {
return (
<div>
    <h3>Lịch hẹn</h3>
    {data.map((a: any) => (
    <div key={a.id}>
        {a.customer} - {a.status}
        <button onClick={() => onUpdate(a.id, "confirmed")}>✔</button>
        <button onClick={() => onUpdate(a.id, "completed")}>Done</button>
    </div>
    ))}
</div>
);
}