import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import axios from "axios"

import "../styles/login.css"

const Login = () => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [showError, setShowError] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")
	const { login } = useAuth()
	const navigate = useNavigate()

	const handleLogin = async (e) => {
		e.preventDefault()

		if (!username || !password) {
			setErrorMessage("Username and password are required")
			setShowError(true)
			return
		}

		try {
			const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
				username: username,
				password: password,
			})

			console.info(response)
			login(response.data)
			if (response.data.hasResponded) {
				navigate("/responses")
			} else {
				navigate("/reveal")
			}
		} catch (error) {
			console.error("Error logging in:", error.response?.data?.error || error.message)
			setErrorMessage(error.response?.data?.error || "An error occurred during login")
			setShowError(true)
		}
	}

	return (
		<div className="medium d-flex flex-column mt-3">
			<h1 className="text-primary text-center title">Login</h1>
			<form onSubmit={handleLogin} className="dark d-flex flex-column col-12 col-md-8 col-lg-6 mx-auto p-5 rounded">
				<label htmlFor="username" className="text-primary">
					Username
				</label>
				<input
					id="username"
					className="custom-textarea mb-3"
					type="text"
					placeholder="Username"
					value={username}
					maxLength={20}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<label htmlFor="password" className="text-primary">
					Password
				</label>
				<input
					id="password"
					className="custom-textarea mb-3"
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit" className="custom-btn mt-3">
					Log In
				</button>
				<div className="d-flex disclaimer mt-3 mx-2">
					<p>Don't have an account? </p>
					<Link to="/signup" className="disclaimer mx-1"><p>Signup</p></Link>
				</div>
			</form>

			<div className={`modal fade ${showError ? "show" : ""}`} style={{ display: showError ? "block" : "none" }} tabIndex="-1" role="dialog">
				<div className="modal-dialog modal-dialog-centered" role="document">
					<div className="modal-content">
						<div className="modal-header dark">
							<h5 className="modal-title text-primary">Error</h5>
						</div>
						<div className="modal-body text-primary lightest">{errorMessage}</div>
						<div className="modal-footer lightest">
							<button type="button" className="custom-btn-secondary small" onClick={() => setShowError(false)}>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className={`modal-backdrop fade ${showError ? "show" : ""}`} style={{ display: showError ? "block" : "none" }}></div>
		</div>
	)
}

export default Login
