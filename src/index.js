import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./AuthProvider"

import LandingPage from "./pages/LandingPage"
import Home from "./pages/Home"
import PromptReveal from "./pages/PromptReveal"
import Responses from "./pages/Responses"
import Comments from "./pages/Comments"

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './theme.css'
import UserAnswer from "./pages/UserAnswer"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<BrowserRouter>
		<AuthProvider>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/home" element={<Home />} />
				<Route path="/reveal" element={<PromptReveal />} />
				<Route path="my-answer" element={<UserAnswer />} />
				<Route path="/responses" element={<Responses />} />
				<Route path="/responses/:id" element={<Comments />} />
			</Routes>
		</AuthProvider>
	</BrowserRouter>
)
