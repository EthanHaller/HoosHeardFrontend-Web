import React, { useState } from "react"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { useNavigate } from "react-router-dom"

const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const navigate = useNavigate()

	const login = (data) => {
		setUser(data)
		if (data.hasResponded) navigate("/responses")
		else navigate("/reveal")
	}

	const logout = () => {
		setUser(null)
		navigate("/")
	}

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_AUTH_KEY}>{children}</GoogleOAuthProvider>
		</AuthContext.Provider>
	)
}

const useAuth = () => {
	const context = React.useContext(AuthContext)
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider")
	}
	return context
}

export { AuthProvider, useAuth }
