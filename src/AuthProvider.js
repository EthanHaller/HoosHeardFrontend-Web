import React from "react"
import { GoogleOAuthProvider } from "@react-oauth/google"

const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
	console.log(process.env.REACT_APP_GOOGLE_AUTH_KEY)
	return (
		<AuthContext.Provider value={{}}>
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
