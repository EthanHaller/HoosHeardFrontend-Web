import React from "react"
import ResponseCards from "../components/responses/ResponseCards"
import PromptSidebar from "../components/PromptSidebar"
import useFetch from "../hooks/useFetch"

import "../styles/responses.css"

export default function Responses() {
	const { data, isLoading, error } = useFetch("/prompts/latest")

	return (
		<>
			<div className="container-fluid">
				<div className="row view-height">
					<PromptSidebar displayText={"ANONYMOUS RESPONSES TO..."} data={data} isLoading={isLoading} error={error}/>
					<div className="col-lg-7 h-100 lightest">
						<ResponseCards />
					</div>
				</div>
			</div>
		</>
	)
}
