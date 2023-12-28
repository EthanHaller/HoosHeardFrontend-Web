import { useState, useEffect } from "react"
import axios from "axios"

const useFetch = (endpoint, body) => {
	const [data, setData] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)

			try {
				const response = await axios.get(process.env.REACT_APP_BACKEND_URL + endpoint, body)
				setData(response.data)
				setIsLoading(false)
			} catch (error) {
				setError(error)
				console.log(error)
			} finally {
				setIsLoading(false)
			}
		}
		fetchData()
	}, [body, endpoint])

	return { data, isLoading, error }
}

export default useFetch
