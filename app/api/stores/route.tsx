import { db } from '@/lib/firebase';
import { auth } from '@clerk/nextjs/server';
import { addDoc, serverTimestamp, collection, updateDoc, doc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
	try {
		const { userId } = await auth();
		const body = await req.json();

		if (!userId) {
			return new NextResponse('Unauthorized', { status: 400 });
		}

		const { storename } = body;

		if (!storename) {
			return new NextResponse('Store Name is missing', { status: 400 });
		}

		const storeData = {
			storename,
			userId,
			createdAt: serverTimestamp(),
		};

		// Add the data to the firestore and retrieve it's reference id
		const storeRef = await addDoc(collection(db, 'stores'), storeData);

		// Get reference id
		const id = storeRef.id;

		await updateDoc(doc(db, 'stores', id), {
			...storeData,
			id,
			updatedAt: serverTimestamp(),
		});

		return NextResponse.json({ id, ...storeData });
	} catch (error) {
		console.log(`STORES_POST: ${error}`);
		return new NextResponse('Internal Server Error:', { status: 500 });
	}
};
