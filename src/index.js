import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "./LandingPage"
import { AuthProvider } from "./AuthProvider"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<AuthProvider>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LandingPage />} />
			</Routes>
		</BrowserRouter>
	</AuthProvider>
)
