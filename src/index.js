import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./AuthProvider"

import LandingPage from "./pages/LandingPage"
import Home from "./pages/Home"
import PromptReveal from "./pages/PromptReveal"
import Responses from "./pages/Responses"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<BrowserRouter>
		<AuthProvider>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/home" element={<Home />} />
				<Route path="/reveal" element={<PromptReveal />} />
				<Route path="/responses" element={<Responses />} />
			</Routes>
		</AuthProvider>
	</BrowserRouter>
)
