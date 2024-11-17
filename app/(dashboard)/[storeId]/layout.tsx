import { db } from '@/lib/firebase';
import { DashboardLayoutProps } from '@/types';
import { auth } from '@clerk/nextjs/server';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { redirect } from 'next/navigation';
import { Store } from '@/type-db';

const DashboardLayout = async ({ children, params }: DashboardLayoutProps) => {
	const { storeId } = params;
	const { userId } = await auth();

	if (!userId) {
		redirect('/sign-in');
	}

	const storeSnap = await getDocs(
		query(collection(db, 'stores'), where('userId', '==', userId), where('id', '==', storeId))
	);

	let store;

	storeSnap.forEach((doc) => {
		store = doc.data() as Store;
	});

	if (!store) {
		redirect('/');
	}

	return (
		<>
			This is the NavBar: {storeId}
			{children}
		</>
	);
};

export default DashboardLayout;
