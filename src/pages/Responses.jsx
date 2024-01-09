import React, { useState } from "react"
import PromptSidebar from "../components/PromptSidebar"
import useFetch from "../hooks/useFetch"
import ResponseCard from "../components/responses/ResponseCard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import "../styles/responses.css"
import { Link } from "react-router-dom"
import { faArrowRightFromBracket, faUserPen } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "../AuthProvider"

export default function Responses() {
	const { user, logout } = useAuth()

	const { data, isLoading, error } = useFetch("/prompts/latest")
	const { data: responseData, isLoading: isResponseLoading, error: responseError } = useFetch("/responses/")
	const [sortOption, setSortOption] = useState("hot")

	const handleSort = (option) => {
		setSortOption(option)
	}

	if (isResponseLoading || !responseData) {
		return <p>Loading responses...</p>
	}

	const responsesSorted = [...responseData.responses].sort((a, b) => {
		if (sortOption === "recent") {
			return new Date(b.createdAt) - new Date(a.createdAt)
		} else {
			return b.likes - a.likes
		}
	})

	const responseCards = responsesSorted.map((response) => {
		return <ResponseCard response={response} key={response._id} />
	})

	return (
		<>
			<div className="container-fluid">
				<div className="row view-height">
					<PromptSidebar displayText={"ANONYMOUS RESPONSES TO..."} data={data} isLoading={isLoading} error={error} />
					<div className="col-lg-7 lightest">
						<span className="d-flex align-items-center mx-2 my-3">
							<button className={`sort-btn ${sortOption === "hot" ? "active" : ""} mx-2`} onClick={() => handleSort("hot")}>
								Hot
							</button>
							<p className="text-center p-0 m-0">|</p>
							<button className={`sort-btn ${sortOption === "recent" ? "active" : ""} mx-2`} onClick={() => handleSort("recent")}>
								Recent
							</button>
							<span className="flex-grow-1"></span>
							<Link to={"/my-answer"} aria-labelledby="My Answer" className="mx-2">
								<FontAwesomeIcon icon={faUserPen} className="fontawesome-btn"/>
							</Link>
							<button className="logout-btn mx-2" onClick={() => logout()}>
								<FontAwesomeIcon icon={faArrowRightFromBracket} className="fontawesome-btn"/>
							</button>
						</span>
						{responseCards}
					</div>
				</div>
			</div>
		</>
	)
}
