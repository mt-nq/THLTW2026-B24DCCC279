export default function Report({ apps, services, employees }: any) {
  const formatCurrency = (value: number) =>
    value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";

  const completedApps = apps.filter((a: any) => a.status === "completed");

  // 1) Số lượng lịch theo ngày và theo tháng
  const countByDay: Record<string, number> = {};
  const countByMonth: Record<string, number> = {};

  completedApps.forEach((a: any) => {
    const date = new Date(a.date);
    if (Number.isNaN(date.valueOf())) return;

    const dayKey = date.toISOString().slice(0, 10); // YYYY-MM-DD
    const monthKey = dayKey.slice(0, 7); // YYYY-MM

    countByDay[dayKey] = (countByDay[dayKey] || 0) + 1;
    countByMonth[monthKey] = (countByMonth[monthKey] || 0) + 1;
  });

  // 2) Doanh thu theo dịch vụ
  const revenueByService: Record<string, number> = {};
  completedApps.forEach((a: any) => {
    const s = services.find((x: any) => x.id === a.serviceId);
    if (!s) return;
    revenueByService[s.name] = (revenueByService[s.name] || 0) + s.price;
  });

  // 3) Doanh thu & đánh giá trung bình theo nhân viên
  const revenueByEmployee: Record<string, number> = {};
  const ratingStatsByEmployee: Record<string, { sum: number; count: number }> = {};

  completedApps.forEach((a: any) => {
    const empId = a.employeeId;
    const service = services.find((x: any) => x.id === a.serviceId);
    if (service) {
      revenueByEmployee[empId] = (revenueByEmployee[empId] || 0) + service.price;
    }
  });

  const reviewsByEmployee = (reviews: any[]) => {
    reviews.forEach((r: any) => {
      const empId = r.employeeId;
      if (!ratingStatsByEmployee[empId]) {
        ratingStatsByEmployee[empId] = { sum: 0, count: 0 };
      }
      ratingStatsByEmployee[empId].sum += r.rating || 0;
      ratingStatsByEmployee[empId].count += 1;
    });
  };

  // Pull reviews from localStorage via window (same as existing ReviewList state)
  const storedReviews = (window as any).localStorage ? JSON.parse(window.localStorage.getItem("r") || "[]") : [];
  reviewsByEmployee(storedReviews);

  const findEmployeeName = (id: string) => {
    const emp = employees.find((e: any) => e.id === id);
    return emp ? emp.name : "(Không rõ)";
  };

  return (
    <div className="report">
      <h3>Thống kê</h3>

      <section className="report-section">
        <h4>Số lượng lịch hẹn</h4>
        <div className="report-grid">
          <div>
            <strong>Theo ngày</strong>
            {Object.entries(countByDay)
              .sort(([a], [b]) => (a < b ? 1 : -1))
              .map(([day, count]) => (
                <div key={day}>
                  {day}: {count}
                </div>
              ))}
          </div>

          <div>
            <strong>Theo tháng</strong>
            {Object.entries(countByMonth)
              .sort(([a], [b]) => (a < b ? 1 : -1))
              .map(([month, count]) => (
                <div key={month}>
                  {month}: {count}
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="report-section">
        <h4>Doanh thu</h4>
        <div className="report-grid">
          <div>
            <strong>Theo dịch vụ</strong>
            {Object.entries(revenueByService).map(([name, revenue]) => (
              <div key={name}>
                {name}: {formatCurrency(revenue)}
              </div>
            ))}
          </div>

          <div>
            <strong>Theo nhân viên</strong>
            {Object.entries(revenueByEmployee).map(([empId, revenue]) => (
              <div key={empId}>
                {findEmployeeName(empId)}: {formatCurrency(revenue)}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="report-section">
        <h4>Đánh giá trung bình theo nhân viên</h4>
        {Object.entries(ratingStatsByEmployee).map(([empId, stats]) => (
          <div key={empId}>
            {findEmployeeName(empId)}: {(stats.sum / stats.count).toFixed(1)} ⭐ ({stats.count} đánh giá)
          </div>
        ))}
      </section>
    </div>
  );
}