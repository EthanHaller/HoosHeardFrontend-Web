import React from "react"
import axios from "axios"
import { GoogleLogin } from "@react-oauth/google"
import { useAuth } from "./AuthProvider"

export default function LandingPage() {
	const { login } = useAuth()

	const handleGoogleLogin = (credentialResponse) => {
		axios
			.post(`${process.env.REACT_APP_BACKEND_URL}/auth/google/login`, credentialResponse, {
				"Content-Type": "application/json",
			})
			.then((res) => {
				login(res.data.user)
			})
	}

	return (
		<>
			<h1>Landing Page</h1>
			<GoogleLogin
				onSuccess={(credentialResponse) => {
					handleGoogleLogin(credentialResponse)
				}}
				onFailure={(error) => console.error("Google login error:", error)}
			/>
		</>
	)
}
