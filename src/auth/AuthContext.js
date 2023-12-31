import React, { useState } from "react"

export const AuthContext = React.createContext({
	user: null,
	setUser: () => {},
})

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)

	return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}
