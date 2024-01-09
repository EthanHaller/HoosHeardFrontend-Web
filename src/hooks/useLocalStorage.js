// adapted from https://dayvster.com/blog/use-context-for-auth

import { useState } from "react"

export const useLocalStorage = () => {
	const [value, setValue] = useState(null)

	const setItem = (k, v) => {
		localStorage.setItem(k, v)
		setValue(v)
	}

	const getItem = (k) => {
		const v = localStorage.getItem(k)
		setValue(v)
		return v
	}

	const removeItem = (k) => {
		localStorage.removeItem(k)
		setValue(null)
	}

	return { value, setItem, getItem, removeItem }
}
