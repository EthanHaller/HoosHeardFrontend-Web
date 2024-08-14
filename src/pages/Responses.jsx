import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import useFetch from "../hooks/useFetch"
import PromptSidebar from "../components/promptSidebar/PromptSidebar"
import ResponseCard from "../components/responses/ResponseCard"
import MyResponse from "../components/responses/MyResponse"

import "../styles/responses.css"

export default function Responses() {
	const { user, userLoading, logout } = useAuth()
	const navigate = useNavigate()
	const [responses, setResponses] = useState([])
	const [page, setPage] = useState(1)
	const [sortOption, setSortOption] = useState("hot")

	useEffect(() => {
		if (!userLoading && !user) {
			navigate("/")
		} else if (!userLoading && !user.hasResponded) {
			navigate("/reveal")
		}
	}, [userLoading, user, navigate])

	const handleLogout = async () => {
		navigate("/")
		await logout()
	}

	const { data: promptData, isLoading: isPromptLoading, error: promptError } = useFetch("/prompts/latest")
	const {
		data: responseData,
		isLoading: isResponseLoading,
		error: responseError,
	} = useFetch(`/responses/${user ? user.user._id : ""}?page=${page}&sort=${sortOption}`, !userLoading)

	useEffect(() => {
		if (responseData && responseData.responses) {
			setResponses((prevResponses) => [...prevResponses, ...responseData.responses])
		}
	}, [responseData])

	const handleSort = (option) => {
		setSortOption(option)
		setResponses([])
		setPage(1)
	}

	const handleScroll = (e) => {
		const { offsetHeight, scrollTop, scrollHeight } = e.target
		if (offsetHeight + scrollTop >= scrollHeight) {
			setPage((prevPage) => prevPage + 1)
		}
	}

	const responseCards = responses.map((response, index) => {
		return <ResponseCard response={response} key={response._id + index} />
	})

	return (
		<div className="responses-container">
			<PromptSidebar displayText={"ANONYMOUS RESPONSES TO..."} data={promptData} isLoading={isPromptLoading} error={promptError} />
			<div className="responses lightest" onScroll={handleScroll}>
				<span className="d-flex align-items-center mx-2 my-3">
					<div className="sort-buttons">
						<button className={`text-primary sort-btn ${sortOption === "hot" ? "active" : ""} mx-2`} onClick={() => handleSort("hot")}>
							Hot
						</button>
						<p className="text-center p-0 m-0">|</p>
						<button className={`text-primary sort-btn ${sortOption === "recent" ? "active" : ""} mx-2`} onClick={() => handleSort("recent")}>
							Recent
						</button>
					</div>
					<div className="nav-buttons">
						<button className="logout-btn mx-2" onClick={handleLogout} aria-labelledby="logout">
							<FontAwesomeIcon icon={faArrowRightFromBracket} className="fontawesome-btn" />
						</button>
					</div>
				</span>
				<MyResponse />
				{responseCards}
			</div>
		</div>
	)
}
