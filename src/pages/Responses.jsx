import React from "react"
import ResponseCards from "../components/responses/ResponseCards"

import "../styles/responses.css"
import PromptSidebar from "../components/PromptSidebar"


export default function Responses() {
	return (
		<>
			<div className="container-fluid">
				<div className="row view-height">
					<PromptSidebar displayText={"ANONYMOUS RESPONSES TO..."}/>
					<div className="col-lg-7 h-100 lightest">
						<ResponseCards />
					</div>
				</div>
			</div>
		</>
	)
}