import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

import "../styles/login.css"

const Signup = () => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [showError, setShowError] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")
	const navigate = useNavigate()

	const handleSignup = async (e) => {
		e.preventDefault()
		const errorMessage = validateUsername(username)
		if (errorMessage) {
			setErrorMessage(errorMessage)
			setShowError(true)
			return
		}

		if (password !== confirmPassword) {
			setErrorMessage("Passwords do not match")
			setShowError(true)
			return
		}

		try {
			await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/signup`, {
				username: username,
				password: password,
			})
			navigate("/login")
		} catch (error) {
			console.error("Error signing up:", error.response?.data?.error || error.message)
			setErrorMessage(error.response?.data?.error || "An error occurred")
			setShowError(true)
		}
	}

	return (
		<div className="container-fluid">
			<div className="row view-height">
				<div className="lightest shapedividers_com-5341"></div>
				<div className="col-xl-8 lightest landing-container">
					<h1 className="text-primary text-center title">Sign Up</h1>
					<form onSubmit={handleSignup} className="d-flex flex-column mx-auto w-75">
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
						<label htmlFor="confirmPassword" className="text-primary">
							Confirm Password
						</label>
						<input
							id="confirmPassword"
							className="custom-textarea mb-3"
							type="password"
							placeholder="Confirm Password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						<button type="submit" className="custom-btn mt-3">
							Sign Up
						</button>
						<div className="d-flex disclaimer mt-3 mx-2">
							<p>Already have an account? </p>
							<Link to="/login" className="disclaimer mx-1">
								<p>Login</p>
							</Link>
						</div>
					</form>
				</div>
				<div className="col-xl-4 d-none d-xl-block lightest shapedividers_com-1228"></div>
			</div>

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

const validateUsername = (username) => {
	const isValidLength = username.length >= 3 && username.length <= 20
	const hasNoSpaces = !/\s/.test(username)

	if (!isValidLength) {
		return "Username must be between 3 and 20 characters long"
	}
	if (!hasNoSpaces) {
		return "Username cannot contain spaces"
	}
	return ""
}

export default Signup
