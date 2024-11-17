import { Timestamp } from 'firebase/firestore';

export interface Store {
	id: string;
	storename: string;
	userId: string;
	createdAt: Timestamp;
	upDatedAt: Timestamp;
}
