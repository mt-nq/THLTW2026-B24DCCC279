import { useState } from 'react';
import { Card, Button, InputNumber, Typography } from 'antd';

const { Title, Text } = Typography;

const DoanSoGame = () => {
const [soNgauNhien, setSoNgauNhien] = useState<number>(1);
const [soLanConLai, setSoLanConLai] = useState(10);
const [thongBao, setThongBao] = useState<string>('');

const batDau = () => {
const random = Math.floor(Math.random() * 100) + 1;
setSoNgauNhien(random);
setSoLanConLai(10);
setThongBao('Game bắt đầu! Hãy đoán số từ 1 đến 100.');
};

const xuLyDoan = (value: number | null) => {
if (!value) return;
if (soLanConLai <= 0) return;

if (value < soNgauNhien) {
    setThongBao('Bạn đoán quá thấp!');
} else if (value > soNgauNhien) {
    setThongBao('Bạn đoán quá cao!');
} else {
    setThongBao('Chúc mừng! Bạn đã đoán đúng!');
    return;
}

const conLai = soLanConLai - 1;
setSoLanConLai(conLai);

if (conLai === 0) {
    setThongBao(`Bạn đã hết lượt! Số đúng là ${soNgauNhien}`);
}
};

return (
<div style={{ display: 'flex', justifyContent: 'center', marginTop: 80 }}>
    <Card style={{ width: 350, textAlign: 'center' }}>
    <Title level={4}>Đoán số (1 - 100)</Title>

    <p>Bạn còn {soLanConLai} lượt</p>

    <InputNumber
        min={1}
        max={100}
        style={{ width: '100%', marginBottom: 10 }}
        onPressEnter={(e: any) => xuLyDoan(Number(e.target.value))}
    />

    <Button type="primary" block onClick={batDau}>
        Bắt đầu lại
    </Button>

    <div style={{ marginTop: 15 }}>
        <Text>{thongBao}</Text>
    </div>
    </Card>
</div>
);
};

export default DoanSoGame;