import React, { useState } from "react"
import PromptSidebar from "../components/PromptSidebar"
import useFetch from "../hooks/useFetch"
import { useParams, Link } from "react-router-dom"
import ResponseCard from "../components/responses/ResponseCard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import "../styles/comments.css"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"

export default function Comments() {
	const params = useParams()
	const id = params.id

	const { data, isLoading, error } = useFetch("/prompts/latest")
	const { data: responseData, isLoading: responseLoading, error: responseError } = useFetch(`/responses/${id}`)

	if (isLoading || !responseData || responseData.length === 0) {
		return (
			<>
				<p>Loading...</p>
			</>
		)
	}

	console.info(responseData)

	return (
		<>
			<div className="container-fluid">
				<div className="row view-height">
					<PromptSidebar displayText={"ANONYMOUS RESPONSES TO..."} data={data} isLoading={isLoading} error={error} />
					<div className="col-lg-7 h-100 lightest">
						<Link to={"/responses"} className="p-3">
							<FontAwesomeIcon icon={faChevronLeft} className="back-btn my-3" />
						</Link>
						<ResponseCard response={responseData.response} />
					</div>
				</div>
			</div>
		</>
	)
}
