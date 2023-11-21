import React from "react"
import { GoogleLogin } from "@react-oauth/google"

export default function LandingPage() {

	const handleGoogleLogin = (credentialResponse) => {
		console.log(credentialResponse)
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