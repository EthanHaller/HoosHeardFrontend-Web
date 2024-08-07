import React from "react"
import axios from "axios"
import { GoogleLogin } from "@react-oauth/google"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import Typewriter from "../components/landingPage/Typewriter"
import "../styles/landingpage.css"

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
			.catch((err) => console.error(err))
	}

	return (
		<>
			<div className="container-fluid">
				<div className="row view-height">
					<div className="lightest shapedividers_com-5341"></div>
					<div className="col-xl-8 lightest landing-container">
						<div className="top-row">
							<div className="text-primary landing-logo">
								"<Typewriter text={'HoosHeard"'} delay={75} />
							</div>
						</div>
						<div className="middle-row">
							<p className="landing-description mx-4 mb-0">
								Welcome to HoosHeard, an anonymous social media platform designed to help your voice be heard! Every day, you are presented with a
								thought-provoking question to answer. The catch? You must submit your response before you can see all other anonymous
								responses. Join HoosHeard to share, connect, and be heard!
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
							<p className="disclaimer mt-3">We will not share your information with anyone.</p>
						</div>
					</div>
					<div className="col-xl-4 d-none d-xl-block lightest shapedividers_com-1228"></div>
				</div>
			</div>
		</>
	)
}
