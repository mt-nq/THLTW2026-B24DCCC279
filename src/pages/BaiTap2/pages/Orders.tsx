import React from 'react';
import { Table, Tag } from 'antd';
import { useModel } from 'umi';
import type { Order } from '../types';

const Orders: React.FC = () => {
	const model = useModel('BaiTap2.store') as
		| {
				orders: Order[];
		}
		| undefined;

	const orders: Order[] = model?.orders ?? [];

	return (
		<Table<Order>
			rowKey="id"
			dataSource={orders}
			columns={[
				{
					title: 'Mã đơn',
					dataIndex: 'id',
				},
				{
					title: 'Khách hàng',
					dataIndex: 'customerName',
				},
				{
					title: 'Số sản phẩm',
					render: (_, record) => record.products.length,
				},
				{
					title: 'Tổng tiền',
					dataIndex: 'totalAmount',
					render: (v: number) => v.toLocaleString('vi-VN'),
				},
				{
					title: 'Trạng thái',
					dataIndex: 'status',
					render: (status: Order['status']) => {
						const colorMap: Record<Order['status'], string> = {
							'Chờ xử lý': 'default',
							'Đang giao': 'blue',
							'Hoàn thành': 'green',
							'Đã hủy': 'red',
						};

						return <Tag color={colorMap[status]}>{status}</Tag>;
					},
				},
				{
					title: 'Ngày tạo',
					dataIndex: 'createdAt',
				},
			]}
		/>
	);
};

export default Orders;
