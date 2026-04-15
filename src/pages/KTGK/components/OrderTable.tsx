import { Order } from "../types/order";
import { customers } from "../data/customers";

interface Props {
  orders: Order[];
  onDelete: (id: string) => void;
  onEdit: (o: Order) => void;
}

export default function OrderTable({ orders, onDelete, onEdit }: Props) {
  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "Chờ xác nhận";
      case "shipping": return "Đang giao";
      case "completed": return "Hoàn thành";
      case "cancelled": return "Hủy";
      default: return status;
    }
  };

  return (
    <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse", border: "1px solid #ddd" }}>
      <thead>
        <tr style={{ background: "#f5f5f5" }}>
          <th style={{ padding: 8 }}>Mã</th>
          <th style={{ padding: 8 }}>Khách</th>
          <th style={{ padding: 8 }}>Ngày</th>
          <th style={{ padding: 8 }}>Tổng tiền</th>
          <th style={{ padding: 8 }}>Trạng thái</th>
          <th style={{ padding: 8 }}>Hành động</th>
        </tr>
      </thead>

      <tbody>
        {orders.length === 0 && (
          <tr>
            <td colSpan={6} style={{ textAlign: "center", padding: 16 }}>Không có đơn hàng nào</td>
          </tr>
        )}
        {orders.map((o) => {
          const customer = customers.find(c => c.id === o.customerId);
          return (
            <tr key={o.id}>
              <td style={{ padding: 8 }}>{o.id}</td>
              <td style={{ padding: 8 }}>{customer ? customer.name : o.customerId}</td>
              <td style={{ padding: 8 }}>{new Date(o.date).toLocaleString()}</td>
              <td style={{ padding: 8 }}>{o.total.toLocaleString()} đ</td>
              <td style={{ padding: 8 }}>{getStatusText(o.status)}</td>
              <td style={{ padding: 8 }}>
                <button onClick={() => onEdit(o)} style={{ marginRight: 8, padding: "4px 8px" }}>
                  Sửa
                </button>
                {o.status === "pending" && (
                  <button 
                    onClick={() => {
                      if (window.confirm("Bạn có chắc muốn hủy đơn hàng này?")) {
                        onDelete(o.id);
                      }
                    }}
                    style={{ padding: "4px 8px", color: "red" }}
                  >
                    Hủy
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}