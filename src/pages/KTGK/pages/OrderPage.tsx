import { useState } from "react";
import { Order } from "../types/order";
import { customers } from "../data/customers";
import OrderTable from "../components/OrderTable";
import OrderForm from "../components/OrderForm";
import FilterBar from "../components/FilterBar";

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("");
  
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  const saveOrder = (o: Order) => {
    if (editingOrder) {
      setOrders(orders.map(order => order.id === o.id ? o : order));
      setEditingOrder(null);
    } else {
      setOrders([...orders, o]);
    }
  };

  const deleteOrder = (id: string) => {
    setOrders(orders.map(o =>
      o.id === id ? { ...o, status: "cancelled" } : o
    ));
  };

  let filtered = orders.filter(o => {
    const customer = customers.find(c => c.id === o.customerId);
    const customerName = customer ? customer.name.toLowerCase() : "";
    const searchLower = search.toLowerCase();
    
    return (o.id.toLowerCase().includes(searchLower) || customerName.includes(searchLower)) &&
           (status ? o.status === status : true);
  });

  if (sortBy) {
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === "date_asc") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === "date_desc") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === "total_asc") {
        return a.total - b.total;
      } else if (sortBy === "total_desc") {
        return b.total - a.total;
      }
      return 0;
    });
  }

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2 style={{ borderBottom: "2px solid #eee", paddingBottom: 10 }}>Hệ thống quản lý đơn hàng</h2>

      <FilterBar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <OrderForm 
        onSave={saveOrder} 
        orders={orders} 
        editingOrder={editingOrder} 
        onCancelEdit={() => setEditingOrder(null)} 
      />

      <OrderTable 
        orders={filtered} 
        onDelete={deleteOrder} 
        onEdit={(o) => setEditingOrder(o)}
      />
    </div>
  );
}