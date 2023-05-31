import { DashboardOutlined, FolderOutlined } from '@ant-design/icons';

const icons = {
  DashboardOutlined,
  FolderOutlined
};

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'tests',
      title: 'Tests',
      type: 'collapse',
      url: null,
      icon: icons.FolderOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
