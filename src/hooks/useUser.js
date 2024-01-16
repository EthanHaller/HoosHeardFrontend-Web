// adapted from https://dayvster.com/blog/use-context-for-auth

import { useContext } from "react"
import { AuthContext } from "../auth/AuthContext"
import { useLocalStorage } from "./useLocalStorage"

export const useUser = () => {
	const { user, setUser } = useContext(AuthContext)
	const { setItem } = useLocalStorage()

	const addUser = (user) => {
		setUser(user)
		setItem("user", JSON.stringify(user.user))
	}

	const removeUser = () => {
		setUser(null)
		setItem("user", "")
	}

	return { user, addUser, removeUser }
}
