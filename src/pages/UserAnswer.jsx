import React from "react"
import PromptSidebar from "../components/PromptSidebar"
import "../styles/useranswer.css"

export default function UserAnswer() {
	return (
		<>
			<div className="container-fluid">
				<div className="row view-height">
					<PromptSidebar displayText={"MY RESPONSE TO..."} />
					<div className="col-lg-7 h-100 lightest d-flex flex-column justify-content-center">
						<form className="d-flex flex-column mx-3">
							<div className="form-group">
								<label htmlFor="userResponseTextarea" className="text-primary textarea-label">
									Your Answer
								</label>
								<textarea className="form-control custom-textarea" id="userResponseTextarea" rows="12"></textarea>
							</div>
							<button type="submit" className="custom-btn align-self-end text-primary mt-1">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}
