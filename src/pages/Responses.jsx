import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightFromBracket, faUserPen } from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import useFetch from "../hooks/useFetch"
import PromptSidebar from "../components/PromptSidebar"
import ResponseCard from "../components/responses/ResponseCard"

import "../styles/responses.css"

export default function Responses() {
	const { user, userLoading, logout } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (!userLoading && !user) {
			navigate("/")
		}
		else if (!userLoading && !user.hasResponded) {
			navigate("/reveal")
		}
	}, [userLoading, user, navigate])

	const handleLogout = () => {
		logout()
		navigate("/")
	}

	const { data, isLoading, error } = useFetch("/prompts/latest")
	const { data: responseData, isLoading: isResponseLoading } = useFetch(`/responses/${user ? user.user._id : ""}`, !userLoading)
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

	const responseCards = responsesSorted.map((response) => {
		return <ResponseCard response={response} key={response._id} />
	})

	return (
		<>
			<div className="container-fluid">
				<div className="nav-buttons my-3">
					<Link to={`/responses/${user ? user.responseId : ""}`} aria-labelledby="My Answer" className="mx-2">
						<FontAwesomeIcon icon={faUserPen} className="fontawesome-btn" />
					</Link>
					<button className="logout-btn mx-2" onClick={() => handleLogout()} aria-labelledby="logout">
						<FontAwesomeIcon icon={faArrowRightFromBracket} className="fontawesome-btn" />
					</button>
				</div>
				<div className="row view-height">
					<PromptSidebar displayText={"ANONYMOUS RESPONSES TO..."} data={data} isLoading={isLoading} error={error} />
					<div className="col-lg-7 lightest">
						<span className="d-flex align-items-center mx-2 my-3">
							<button className={`text-primary sort-btn ${sortOption === "hot" ? "active" : ""} mx-2`} onClick={() => handleSort("hot")}>
								Hot
							</button>
							<p className="text-center p-0 m-0">|</p>
							<button className={`text-primary sort-btn ${sortOption === "recent" ? "active" : ""} mx-2`} onClick={() => handleSort("recent")}>
								Recent
							</button>
						</span>
						{responseCards}
					</div>
				</div>
			</div>
		</>
	)
}
