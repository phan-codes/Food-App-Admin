import { LayoutProps } from '@/types';

const AuthLayout = ({ children }: LayoutProps) => {
	return <div className='flex items-center justify-center h-full'>{children}</div>;
};

export default AuthLayout;
