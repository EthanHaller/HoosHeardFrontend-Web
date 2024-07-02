import React, { useEffect } from "react"
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { AuthProvider } from "./auth/AuthContext"
import "bootstrap/dist/css/bootstrap.min.css"
import "./theme.css"

import LandingPage from "./pages/LandingPage"
import PromptReveal from "./pages/PromptReveal"
import Responses from "./pages/Responses"
import Comments from "./pages/Comments"
import UserAnswer from "./pages/UserAnswer"

export default function App() {
	return (
		<AuthProvider>
			<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_AUTH_KEY}>
				<BrowserRouter>
					<ScrollToTop />
					<Routes>
						<Route path="/" element={<LandingPage />} />
						<Route path="/reveal" element={<PromptReveal />} />
						<Route path="my-answer" element={<UserAnswer />} />
						<Route path="/responses" element={<Responses />} />
						<Route path="/responses/:id" element={<Comments />} />
					</Routes>
				</BrowserRouter>
			</GoogleOAuthProvider>
		</AuthProvider>
	)
}

function ScrollToTop() {
	const pathName = useLocation()

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [pathName])

	return null
}
