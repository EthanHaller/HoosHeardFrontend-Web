import { useState, useEffect } from "react"
import axios from "axios"

const useFetch = (endpoint, shouldFetch = true) => {
	const [data, setData] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			if (!shouldFetch) {
				setIsLoading(false)
				return
			}

			setIsLoading(true)

			try {
				const response = await axios.get(process.env.REACT_APP_BACKEND_URL + endpoint)
				setData(response.data)
			} catch (error) {
				setError(error)
				console.log(error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [endpoint, shouldFetch])

	return { data, isLoading, error }
}

export default useFetch
