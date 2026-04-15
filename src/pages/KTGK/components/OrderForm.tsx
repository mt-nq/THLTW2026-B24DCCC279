import { useState, useEffect } from "react";
import { Order, OrderItem } from "../types/order";
import { customers } from "../data/customers";
import { products } from "../data/products";

interface Props {
  onSave: (o: Order) => void;
  orders: Order[];
  editingOrder?: Order | null;
  onCancelEdit?: () => void;
}

export default function OrderForm({ onSave, orders, editingOrder, onCancelEdit }: Props) {
  const [id, setId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [status, setStatus] = useState<Order["status"]>("pending");
  const [items, setItems] = useState<OrderItem[]>([]);
  
  // temporary states for adding a new item
  const [tempProductId, setTempProductId] = useState("");
  const [tempQuantity, setTempQuantity] = useState(1);

  useEffect(() => {
    if (editingOrder) {
      setId(editingOrder.id);
      setCustomerId(editingOrder.customerId);
      setStatus(editingOrder.status);
      setItems(editingOrder.items);
    } else {
      setId("");
      setCustomerId("");
      setStatus("pending");
      setItems([]);
    }
  }, [editingOrder]);

  const handleAddItem = () => {
    if (!tempProductId || tempQuantity <= 0) return;
    
    // Check if product already in items, if so, add quantity
    const existingIndex = items.findIndex(item => item.productId === tempProductId);
    if (existingIndex >= 0) {
      const newItems = [...items];
      newItems[existingIndex].quantity += tempQuantity;
      setItems(newItems);
    } else {
      setItems([...items, { productId: tempProductId, quantity: tempQuantity }]);
    }
    setTempProductId("");
    setTempQuantity(1);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const handleSubmit = () => {
    if (!id || !customerId || items.length === 0) {
      alert("Không được để trống mã đơn, khách hàng, và phải có ít nhất 1 sản phẩm");
      return;
    }

    if (!editingOrder && orders.find(o => o.id === id)) {
      alert("Trùng mã đơn hàng");
      return;
    }

    const newOrder: Order = {
      id,
      customerId,
      date: editingOrder ? editingOrder.date : new Date().toISOString(),
      items: items,
      total: calculateTotal(),
      status: status,
    };

    onSave(newOrder);
    
    // Reset if adding new
    if (!editingOrder) {
      setId("");
      setCustomerId("");
      setItems([]);
      setStatus("pending");
    }
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: 15, marginBottom: 20, borderRadius: 8 }}>
      <h3>{editingOrder ? "Sửa đơn hàng" : "Thêm đơn hàng"}</h3>
      
      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <input 
          placeholder="Mã đơn" 
          value={id}
          onChange={(e) => setId(e.target.value)} 
          disabled={!!editingOrder}
          style={{ padding: 6 }}
        />
        
        <select value={customerId} onChange={(e) => setCustomerId(e.target.value)} style={{ padding: 6 }}>
          <option value="">Chọn khách hàng</option>
          {customers.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        
        <select value={status} onChange={(e) => setStatus(e.target.value as Order["status"])} style={{ padding: 6 }}>
          <option value="pending">Chờ xác nhận</option>
          <option value="shipping">Đang giao</option>
          <option value="completed">Hoàn thành</option>
          <option value="cancelled">Hủy</option>
        </select>
      </div>

      <div style={{ margin: "10px 0", border: "1px dashed #ccc", padding: 10, borderRadius: 4 }}>
        <h4>Sản phẩm trong đơn</h4>
        
        {items.length > 0 && (
          <table style={{ width: "100%", marginBottom: 10 }}>
            <thead>
              <tr style={{ textAlign: "left" }}>
                <th>Sản phẩm</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                const product = products.find(p => p.id === item.productId);
                return (
                  <tr key={index}>
                    <td>{product?.name}</td>
                    <td>{item.quantity}</td>
                    <td>{product ? (product.price * item.quantity).toLocaleString() : 0} đ</td>
                    <td>
                      <button onClick={() => handleRemoveItem(index)} style={{ color: "red" }}>Xóa</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <select value={tempProductId} onChange={(e) => setTempProductId(e.target.value)} style={{ padding: 6 }}>
            <option value="">Chọn sản phẩm</option>
            {products.map(p => (
              <option key={p.id} value={p.id}>{p.name} - {p.price.toLocaleString()} đ</option>
            ))}
          </select>
          <input
            type="number"
            min="1"
            value={tempQuantity}
            onChange={(e) => setTempQuantity(Number(e.target.value))}
            style={{ width: 60, padding: 6 }}
          />
          <button onClick={handleAddItem} style={{ padding: "6px 12px" }}>Thêm SP</button>
        </div>
        
        <div style={{ marginTop: 15 }}>
          <strong>Tổng tiền dự kiến: {calculateTotal().toLocaleString()} đ</strong>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={handleSubmit} style={{ padding: "8px 16px", background: "blue", color: "white", border: "none" }}>
          {editingOrder ? "Cập nhật đơn hàng" : "Lưu đơn hàng"}
        </button>
        {editingOrder && (
          <button onClick={onCancelEdit} style={{ padding: "8px 16px" }}>Hủy sửa</button>
        )}
      </div>
    </div>
  );
}