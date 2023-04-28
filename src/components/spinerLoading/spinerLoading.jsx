import { Spin, Space } from 'antd';

import './spinerLoading.css';
import 'antd/dist/reset.css';

export const SpinerLoading = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <div className="example">
      <Spin tip="Loading..." size="large"/>
    </div>
  </Space>
);

