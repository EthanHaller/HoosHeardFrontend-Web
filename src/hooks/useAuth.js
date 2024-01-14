// adapted from https://dayvster.com/blog/use-context-for-auth

import { useEffect, useState } from "react"
import { useUser } from "./useUser"
import { useLocalStorage } from "./useLocalStorage"

export const useAuth = () => {
	const { user, addUser, removeUser } = useUser()
	const { getItem } = useLocalStorage()
	const [userLoading, setUserLoading] = useState(true)

	useEffect(() => {
		const fetchUser = async () => {
			const storedUser = getItem("user")
			if (storedUser) {
				addUser(JSON.parse(storedUser))
			}
			setUserLoading(false)
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
