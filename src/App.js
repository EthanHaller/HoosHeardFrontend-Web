import React, { useEffect } from "react"
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import { AuthProvider } from "./auth/AuthContext"
import "bootstrap/dist/css/bootstrap.min.css"
import "./theme.css"

import LandingPage from "./pages/LandingPage"
import PromptReveal from "./pages/PromptReveal"
import Responses from "./pages/Responses"
import Comments from "./pages/Comments"
import UserAnswer from "./pages/UserAnswer"
import Signup from "./pages/Signup"
import Login from "./pages/Login"

export default function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<ScrollToTop />
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
					<Route path="/reveal" element={<PromptReveal />} />
					<Route path="my-answer" element={<UserAnswer />} />
					<Route path="/responses" element={<Responses />} />
					<Route path="/responses/:id" element={<Comments />} />
				</Routes>
			</BrowserRouter>
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
