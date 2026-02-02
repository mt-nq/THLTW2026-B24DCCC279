import { Button, message, Popconfirm, Table } from 'antd';
import { useModel } from 'umi';
import type { SanPham } from '../models/sanpham';

interface Props {
	duLieu: SanPham[];
}

const BangSanPham = ({ duLieu }: Props) => {
	const { xoaSanPham } = useModel('BaiTap1.sanpham');

	const { suaSanPham } = useModel('BaiTap1.sanpham');

	const cot = [
		{
			title: 'STT',
			dataIndex: 'id',
		},
		{
			title: 'Tên sản phẩm',
			dataIndex: 'ten',
		},
		{
			title: 'Giá (VNĐ)',
			dataIndex: 'gia',
			render: (gia: number) => gia.toLocaleString(),
		},
		{
			title: 'Số lượng',
			dataIndex: 'soLuong',
		},
		{
			title: 'Thao tác',
			render: (_: unknown, record: SanPham) => (
				<>
					<Popconfirm
						title='Bạn có chắc chắn muốn xóa?'
						onConfirm={() => {
							xoaSanPham(record.id);
							message.success('Xóa sản phẩm thành công');
						}}
					>
						<Button type='link' danger>
							Xóa
						</Button>
					</Popconfirm>

					<Popconfirm
						title='Bạn có chắc muốn sửa?'
						onConfirm={() => {
							suaSanPham(record.id, { ...record, soLuong: record.soLuong + 1 });
							message.success('Sửa sản phẩm thành công');
						}}
					>
						<Button type='link'>Sửa</Button>
					</Popconfirm>
				</>
			),
		},
	];

	return <Table<SanPham> rowKey='id' columns={cot} dataSource={duLieu} />;
};

export default BangSanPham;
