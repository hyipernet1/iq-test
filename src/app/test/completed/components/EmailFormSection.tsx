import Button from '@/components/ui/button'
import Input from '@/components/ui/input'

export const EmailFormSection = ({ handleSubmit, checkUser, register }: any) => (
	<>
		<h3 className='text-center mt-10 text-3xl inline-flex items-center gap-3'>
			Enter your email
		</h3>
		<form
			className='flex flex-col items-center gap-5 mt-5 w-[400px] max-[420px]:w-[300px]'
			onSubmit={handleSubmit(checkUser)}
		>
			<Input
				required
				{...register('email', { required: true })}
				type='email'
				placeholder='123@gmail.com'
				className='w-full'
			/>
			<Button type='submit'>Get Results</Button>
		</form>
	</>
)