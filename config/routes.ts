export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},
	{
		path: '/todo-list',
		name: 'TodoList',
		icon: 'OrderedListOutlined',
		component: './TodoList',
	},
	{
		path: '/baitap1',
		name: 'BaiTap1',
		icon: 'OrderedListOutlined',
		component: './BaiTap1',
	},

	{
		path: '/baitap2',
		name: 'BaiTap2',
		icon: 'OrderedListOutlined',
		component: './BaiTap2',
	},
	{
		path: '/th01-baitap1',
		name: 'TH01-BaiTap1',
		icon: 'OrderedListOutlined',
		component: './TH01-BaiTap1',
	},
	{
		path: '/th01-baitap2',
		name: 'TH01-BaiTap2',
		icon: 'OrderedListOutlined',
		component: './TH01-BaiTap2',
	},
	{
		path: '/th02-baitap1',
		name: 'TH02-BaiTap1',
		icon: 'OrderedListOutlined',
		component: './TH02-BaiTap1',
	},
	{
		path: '/th02-baitap2',
		name: 'TH02-BaiTap2',
		icon: 'OrderedListOutlined',
		component: './TH02-BaiTap2',
	},
	{
		path: '/th03',
		name: 'TH03',
		icon: 'OrderedListOutlined',
		component: './TH03',
	},
	{
		path: '/th04',
		name: 'TH04',
		icon: 'OrderedListOutlined',
		component: './TH04',
	},
	{
		path: '/th05',
		name: 'TH05',
		icon: 'OrderedListOutlined',
		component: './TH05',
	},
	{
		path: '/th06',
		name: 'TH06',
		icon: 'OrderedListOutlined',
		component: './TH06',
	},
	{
		path: '/ktgk',
		name: 'KTGK',
		icon: 'OrderedListOutlined',
		component: './KTGK',
	},
	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
];
