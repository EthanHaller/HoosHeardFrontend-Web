import React, { useState } from "react"
import PromptSidebar from "../components/PromptSidebar"
import useFetch from "../hooks/useFetch"

import "../styles/responses.css"
import ResponseCard from "../components/responses/ResponseCard"

export default function Responses() {
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
		return <ResponseCard response={response} key={response._id}/>
	})

	return (
		<>
			<div className="container-fluid">
				<div className="row view-height">
					<PromptSidebar displayText={"ANONYMOUS RESPONSES TO..."} data={data} isLoading={isLoading} error={error} />
					<div className="col-lg-7 h-100 lightest">
						<span className="d-flex align-items-center mt-2 mb-3">
							<button className={`btn ${sortOption === "hot" ? "active" : ""}`} onClick={() => handleSort("hot")}>
								Hot
							</button>
							<p className="text-center p-0 m-0">|</p>
							<button className={`btn ${sortOption === "recent" ? "active" : ""}`} onClick={() => handleSort("recent")}>
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
