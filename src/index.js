import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./AuthProvider"

import LandingPage from "./LandingPage"
import Home from "./Home"
import { ProtectedRoute } from "./ProtectedRoute"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<BrowserRouter>
		<AuthProvider>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route
					path="/home"
					element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</AuthProvider>
	</BrowserRouter>
)
