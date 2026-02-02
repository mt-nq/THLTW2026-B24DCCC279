import { Tabs } from 'antd';
import React from 'react';

import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Products from './pages/Products';

const { TabPane } = Tabs;

const Index: React.FC = () => {
	return (
		<Tabs defaultActiveKey='1'>
			<TabPane tab='Dashboard' key='1'>
				<Dashboard />
			</TabPane>

			<TabPane tab='Products' key='2'>
				<Products />
			</TabPane>

			<TabPane tab='Orders' key='3'>
				<Orders />
			</TabPane>
		</Tabs>
	);
};

export default Index;
