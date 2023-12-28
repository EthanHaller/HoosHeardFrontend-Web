import React from "react"
import axios from "axios"
import { GoogleLogin } from "@react-oauth/google"
import { useAuth } from "../AuthProvider"
import logoImage from "../images/HoosHeardLogoDark.png"
import "../styles/landingpage.css"

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
			<div className="landing-page">
				<div className="landing-content">
					<div className="logo">
						<img src={logoImage} alt="Logo" />
					</div>
					<p className="landing-description">
						Welcome to HoosHeard, where your voice takes center stage! Every day, you'll encounter a unique prompt that challenges your creativity,
						sparks your thoughts, and encourages self-expression. Answer the question to unlock a world of diverse responses, engage with others
						through likes and comments, and witness the power of individual expression. But here's the twist – once the day is over, yesterday's
						conversations vanish. Join HoosHeard for a daily dose of connection, creativity, and fleeting moments of shared insights. Your voice
						matters here.
					</p>
					<div className="google-login-btn">
						<GoogleLogin
							theme="outline"
							size="large"
							text="signin_with"
							shape="pill"
							logo_alignment="center"
							onSuccess={(credentialResponse) => {
								handleGoogleLogin(credentialResponse)
							}}
							onFailure={(error) => console.error("Google login error:", error)}
						/>
					</div>
				</div>
			</div>
		</>
	)
}
