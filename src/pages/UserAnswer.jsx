import React from "react"
import PromptSidebar from "../components/PromptSidebar"

export default function UserAnswer() {
	return (
		<>
			<div className="container-fluid">
				<div className="row view-height">
				<PromptSidebar displayText={"MY RESPONSE TO..."}/>
				</div>
			</div>
		</>
	)
}
