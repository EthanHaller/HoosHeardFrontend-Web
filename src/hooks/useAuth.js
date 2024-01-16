// adapted from https://dayvster.com/blog/use-context-for-auth

import { useEffect, useState } from "react"
import { useUser } from "./useUser"
import { useLocalStorage } from "./useLocalStorage"
import axios from "axios"

export const useAuth = () => {
	const { user, addUser, removeUser } = useUser()
	const { getItem } = useLocalStorage()
	const [userLoading, setUserLoading] = useState(true)

	useEffect(() => {
		const fetchUser = async () => {
			const storedUser = getItem("user")
			if (storedUser) {
				const jsonUser = await JSON.parse(storedUser)
				axios
					.get(`${process.env.REACT_APP_BACKEND_URL}/auth/getuser/${jsonUser._id}`)
					.then((res) => {
						addUser(res.data)
						setUserLoading(false)
					})
					.catch((err) => {
						console.error(err)
						setUserLoading(false)
					})
			} else {
				axios
					.get(`${process.env.REACT_APP_BACKEND_URL}/prompts/latest`)
					.then((res) => {
					})
					.catch((err) => {
					})
			}
		}

		fetchUser()
	}, [])

	const login = (user) => {
		addUser(user)
	}

	const logout = () => {
		removeUser()
	}

	return { user, userLoading, login, logout }
}
