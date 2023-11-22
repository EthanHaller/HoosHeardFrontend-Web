import React from "react"
import { useAuth } from "./AuthProvider"
import { useNavigate } from "react-router-dom"

export default function Home() {
	const { user, logout } = useAuth()

	return (
		<>
			<h1>Home</h1>
			<h3>User Data:</h3>
			<p>{JSON.stringify(user)}</p>
			<button onClick={() => logout()}>Logout</button>
		</>
	)
}
