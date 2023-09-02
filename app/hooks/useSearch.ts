import { videoApi } from '@/store/api/video.api'
import { useState, ChangeEvent } from 'react'
import { useDebounce } from './useDebounce'

export const useSearch = () => {
	const [searchTerm, setSearchTerm] = useState<string>('')
	const debounceSearch = useDebounce(searchTerm, 500)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { data, isSuccess } = videoApi.useGetVideosBySearchTermQuery(debounceSearch, {
		skip: !debounceSearch,
		selectFromResult: ({ data, ...rest }) => ({
			data: data?.slice(0, 4),
			...rest,
		}),
	})

	return {
		data,
		isSuccess,
		handleSearch,
		searchTerm
	}
}
