import React, { useState, useEffect } from "react"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { useNavigate } from "react-router-dom"

const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const navigate = useNavigate()

	const login = (userData) => {
		setUser(userData)
		localStorage.setItem("user", JSON.stringify(userData))
		navigate("/home")
	}

	const logout = () => {
		setUser(null)
		localStorage.removeItem("user")
		navigate("/")
	}

	useEffect(() => {
		const storedUser = JSON.parse(localStorage.getItem("user"))
		if (storedUser) {
			setUser(storedUser)
			localStorage.setItem("user", JSON.stringify(storedUser))
			navigate("/home")
		}
	}, [navigate])

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
