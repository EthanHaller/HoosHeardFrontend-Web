import React from "react"
import { GoogleLogin } from "@react-oauth/google"
import axios from "axios"

export default function LandingPage() {
	const handleGoogleLogin = (credentialResponse) => {
		console.log(process.env.REACT_APP_BACKEND_URL)
		axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/google/login`, credentialResponse, {
			"Content-Type": "application/json",
		})
		.then(res => console.log(res))
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
