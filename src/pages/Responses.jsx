import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import useFetch from "../hooks/useFetch"
import PromptSidebar from "../components/promptSidebar/PromptSidebar"
import ResponseCard from "../components/responses/ResponseCard"

import "../styles/responses.css"
import MyResponse from "../components/responses/MyResponse"

export default function Responses() {
	const { user, userLoading, logout } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (!userLoading && !user) {
			navigate("/")
		} else if (!userLoading && !user.hasResponded) {
			navigate("/reveal")
		}
	}, [userLoading, user, navigate])

	const handleLogout = () => {
		logout()
		navigate("/")
	}

	const { data, isLoading, error } = useFetch("/prompts/latest")
	const { data: responseData, isLoading: isResponseLoading } = useFetch(`/responses/${user ? user.user._id : ""}`, !userLoading)
	const { data: myReponseData, isLoading: isMyResponseLoading} =useFetch(`/responses/mine/${user ? user.user._id : ""}`, !userLoading)
	const [sortOption, setSortOption] = useState("hot")

	const handleSort = (option) => {
		setSortOption(option)
	}

	let responses
	if (isResponseLoading || !responseData) {
		responses = { responses: [] }
	} else responses = responseData

	const responsesSorted = [...responses.responses].sort((a, b) => {
		if (sortOption === "recent") {
			return new Date(b.createdAt) - new Date(a.createdAt)
		} else {
			return b.numLikes - a.numLikes
		}
	})

	const responseCards = responsesSorted.map((response, index) => {
		return <ResponseCard response={response} key={response._id+index} />
	})

	return (
		<div className="responses-container">
			<div className="nav-buttons">
				<button className="logout-btn mx-2" onClick={() => handleLogout()} aria-labelledby="logout">
					<FontAwesomeIcon icon={faArrowRightFromBracket} className="fontawesome-btn" />
				</button>
			</div>
				<PromptSidebar displayText={"ANONYMOUS RESPONSES TO..."} data={data} isLoading={isLoading} error={error} />
				<div className="responses lightest">
					<span className="d-flex align-items-center mx-2 my-3">
						<button className={`text-primary sort-btn ${sortOption === "hot" ? "active" : ""} mx-2`} onClick={() => handleSort("hot")}>
							Hot
						</button>
						<p className="text-center p-0 m-0">|</p>
						<button className={`text-primary sort-btn ${sortOption === "recent" ? "active" : ""} mx-2`} onClick={() => handleSort("recent")}>
							Recent
						</button>
					</span>
					<MyResponse />
					{responseCards}
				</div>
		</div>
	)
}
