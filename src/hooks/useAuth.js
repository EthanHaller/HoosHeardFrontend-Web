// adapted from https://dayvster.com/blog/use-context-for-auth

import { useEffect } from "react"
import { useUser } from "./useUser"
import { useLocalStorage } from "./useLocalStorage"
import { useNavigate } from "react-router-dom"

export const useAuth = () => {
	const { user, addUser, removeUser } = useUser()
	const { getItem } = useLocalStorage()

	useEffect(() => {
		const user = getItem("user")
		if (user) {
			addUser(JSON.parse(user))
		}
	}, [])

	const login = (user) => {
		addUser(user)
	}

	const logout = () => {
		removeUser()
	}

	return { user, login, logout }
}
