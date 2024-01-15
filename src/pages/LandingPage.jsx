import React from "react"
import axios from "axios"
import { GoogleLogin } from "@react-oauth/google"
import { useAuth } from "../hooks/useAuth"
import logoImage from "../images/HoosHeardLogoDark.png"
import "../styles/landingpage.css"
import Typewriter from "../components/landingPage/Typewriter"
import { useNavigate } from "react-router-dom"

export default function LandingPage() {
	const { user, login } = useAuth()
	const navigate = useNavigate()

	const handleGoogleLogin = (credentialResponse) => {
		axios
			.post(`${process.env.REACT_APP_BACKEND_URL}/auth/google/login`, credentialResponse, {
				"Content-Type": "application/json",
			})
			.then((res) => {
				login(res.data)
				if (res.data.hasResponded) navigate("/responses")
				else navigate("/reveal")
			})
	}

	return (
		<>
			<div className="container-fluid">
				<div className="row view-height">
					<div className="col-xl-8 lightest d-flex flex-column justify-content-center align-items-center">
						<div className="top-row">
							<div className="landing-logo">
								<img src={logoImage} alt="Logo" />
							</div>
						</div>
						<div className="middle-row">
							<p className="landing-description">
								<Typewriter
									text="Welcome to HoosHeard, a unique social media platform designed for daily self-expression! Every day, users are presented with a thought-provoking question to answer. The catch? Users must submit their responses before gaining access to all other anonymous user responses. The conversations are transient, as each day brings a new question, making it an ever-evolving space for authentic and dynamic interactions. Join HoosHeard to embrace the joy of sharing, connecting, and exploring the myriad voices within our community. "
									delay={5}
									showCursor={true}
								/>
							</p>
						</div>
						<div className="bottom-row">
							<div className="google-login-btn mt-4">
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
					<div className="col-xl-4 lightest shapedividers_com-1228"></div>
				</div>
			</div>
		</>
	)
}
