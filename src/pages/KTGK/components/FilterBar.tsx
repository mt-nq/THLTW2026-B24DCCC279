

interface Props {
  search: string;
  setSearch: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
}

export default function FilterBar({ search, setSearch, status, setStatus, sortBy, setSortBy }: Props) {
  return (
    <div style={{ marginBottom: 20, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
      <input
        placeholder="Tìm kiếm mã hoặc tên khách..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: 8, minWidth: 200 }}
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ padding: 8 }}>
        <option value="">Tất cả trạng thái</option>
        <option value="pending">Chờ xác nhận</option>
        <option value="shipping">Đang giao</option>
        <option value="completed">Hoàn thành</option>
        <option value="cancelled">Hủy</option>
      </select>
      
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: 8 }}>
        <option value="">Sắp xếp mặc định</option>
        <option value="date_desc">Ngày đặt (Mới nhất)</option>
        <option value="date_asc">Ngày đặt (Cũ nhất)</option>
        <option value="total_desc">Tổng tiền (Cao đến thấp)</option>
        <option value="total_asc">Tổng tiền (Thấp đến cao)</option>
      </select>
    </div>
  );
}