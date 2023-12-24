import React from "react"
import { useAuth } from "../AuthProvider"
import { Link } from "react-router-dom"

export default function Home() {
	const { user, logout } = useAuth()

	return (
		<>
			<h1>Home</h1>
			<h3>User Data:</h3>
			<p>{JSON.stringify(user)}</p>
			<Link to='/responses'>User reponses</Link>
			<Link to='/reveal'>Prompt Reveal</Link>
			<button onClick={() => logout()}>Logout</button>
		</>
	)
}
