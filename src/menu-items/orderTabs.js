import { FolderOutlined } from '@ant-design/icons';

const icons = {
  FolderOutlined
};

const orderTabs = {
  id: 'group-order-tabs',
  title: 'Current Order Tabs',
  type: 'group',
  children: [
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

export default orderTabs;
