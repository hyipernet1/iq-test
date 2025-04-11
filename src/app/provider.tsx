'use client'

import { PropsWithChildren, useEffect } from 'react'
import { HighlightInit } from '@highlight-run/next/client'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
	getAccessToken,
	removeAccessToken,
	setAccessToken,
} from '@/services/auth/auth.helper'
import { authService } from '@/services/auth/auth.service'
import { useAuthStore } from '@/hooks/useAuthStore'

interface Props {
	refreshToken: string | undefined
}

const Provider: React.FC<PropsWithChildren<Props>> = ({
	children,
	refreshToken,
}) => {
	useEffect(() => {
		AOS.init({
			offset: 200,
		})

		const checkAuth = async () => {
			const accessToken = getAccessToken()
			if (refreshToken || accessToken) {
				try {
					const data = (await authService.refresh()).data
					if (data) {
						useAuthStore.setState({ user: data.user })
						setAccessToken(data.accessToken)
					} else {
						throw new Error('Failed to refresh token')
					}
				} catch (e) {
					await authService.logout()
					useAuthStore.setState({ user: null })
					removeAccessToken()
				}
			}
		}

		checkAuth()
	}, [])

	const queryClient = new QueryClient()
	return (
		<QueryClientProvider client={queryClient}>
			<HighlightInit
				projectId={'mem5m39g'}
				serviceName='my-nextjs-frontend'
				tracingOrigins
				networkRecording={{
					enabled: true,
					recordHeadersAndBody: true,
					urlBlocklist: [],
				}}
			/>
			{children}
		</QueryClientProvider>
	)
}

export default Provider
