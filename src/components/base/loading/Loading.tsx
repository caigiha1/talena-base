import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function Loading({
  isLoading,
  children,
}: Readonly<{
  isLoading: boolean;
  children?: React.ReactNode;
}>) {
  const antIcon = (
    <LoadingOutlined spin onPointerEnter={undefined} onPointerLeave={undefined} />
  );

  return (
    <Spin indicator={antIcon} spinning={isLoading}>
      {children}
    </Spin>
  );
}
