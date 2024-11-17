'use client';

import { useStoreModal } from '@/hooks/use-store-modal';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import toast from 'react-hot-toast';

import Modal from '@/components/Modal';

export const StoreModal = () => {
	const storeModal = useStoreModal();

	const formSchema = z.object({
		storename: z.string().min(3, { message: 'Store name should be minimum of 3 characters' }),
	});

	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			storename: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setIsLoading(true);
			const response = (await axios.post('/api/stores/', values)).data;
			toast.success('Store Created');
			console.log(response);
		} catch (error) {
			toast.error('Something went wrong! Try again');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Modal
			title='Create a new store'
			description='Add a new store to manage the products and categories'
			isOpen={storeModal.isOpen}
			onClose={storeModal.onClose}>
			<div>
				<div className='space-y-4 pt-2 pb-4'>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name='storename'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name:</FormLabel>
										<FormControl>
											<Input disabled={isLoading} placeholder='Your Store Name...' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className='pt-6 space-x-2 flex items-center justify-end w-full'>
								<Button disabled={isLoading} type='button' variant={'outline'} size={'sm'}>
									Cancel
								</Button>
								<Button disabled={isLoading} type='submit' size={'sm'}>
									Continue
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</Modal>
	);
};
