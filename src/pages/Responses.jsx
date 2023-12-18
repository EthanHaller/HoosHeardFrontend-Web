import React from "react"
import { useAuth } from "../AuthProvider"

export default function Responses() {
	const { user } = useAuth()

	return (
		<>
			<h1>Responses</h1>
			<h3>User Data:</h3>
			<p>{JSON.stringify(user)}</p>
		</>
	)
}
