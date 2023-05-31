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
      url: '/dashboard',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'tests',
      title: 'Tests',
      type: 'item',
      url: '/tests',
      icon: icons.FolderOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
