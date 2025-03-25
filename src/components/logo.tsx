import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
	className?: string
}

const Logo: React.FC<LogoProps> = ({ className }) => {
	return (
		<div className={clsx('flex items-center gap-2', className)}>
			<Link href='/'>
				<div className='relative w-52 h-16'>
					<Image
						src={'/logo.png'}
						fill
            sizes='100%, 100%'
						alt={'Logo'}
						className='object-cover'
					/>
				</div>
				<h1 className='font-black text-3xl hidden'>LOGO</h1>
			</Link>
		</div>
	)
}

export default Logo
