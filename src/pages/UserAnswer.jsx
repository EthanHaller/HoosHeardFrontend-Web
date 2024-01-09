import React, { useState } from "react"
import PromptSidebar from "../components/PromptSidebar"
import "../styles/useranswer.css"
import axios from "axios"
import { useAuth } from "../AuthProvider"
import { useNavigate } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import Comments from "./Comments"

export default function UserAnswer() {
	const { user } = useAuth()
	const navigate = useNavigate()

	if(user.hasResponded) {
		navigate(`/responses/${user.responseId}`)
	}

	const { data, isLoading, error } = useFetch("/prompts/latest")

	const [showModal, setShowModal] = useState(false)
	const [text, setText] = useState("")

	const handleTextareaChange = (event) => {
		setText(event.target.value)
	}

	const handleConfirmSubmit = (event) => {
		event.preventDefault()

		axios
			.post(`${"http://localhost:8080"}/responses/create`, {
				email: user.user.email,
				promptId: data._id,
				text: text,
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err))

		setShowModal(false)
		navigate("/responses")
	}

	return (
		<>
			<div className="container-fluid">
				<div className="row view-height">
					<PromptSidebar displayText={"MY RESPONSE TO..."} data={data} isLoading={isLoading} error={error} />
					<div className="col-lg-7 h-100 lightest d-flex flex-column justify-content-center">
						<form className="d-flex flex-column mx-3">
							<div className="form-group">
								<label htmlFor="userResponseTextarea" className="text-primary textarea-label">
									Your Answer
								</label>
								<textarea
									className="custom-textarea"
									id="userResponseTextarea"
									rows="12"
									onChange={handleTextareaChange}
								></textarea>
							</div>
							<button type="button" className="custom-btn align-self-end mt-1" onClick={() => setShowModal(true)}>
								Submit
							</button>
							<div
								className={`modal fade ${showModal ? "show" : ""}`}
								style={{ display: showModal ? "block" : "none" }}
								tabIndex="-1"
								role="dialog"
							>
								<div className="modal-dialog modal-dialog-centered" role="document">
									<div className="modal-content">
										<div className="modal-header dark">
											<h5 className="modal-title text-primary">Confirm Submission</h5>
											<button
												type="button"
												className="btn-close"
												data-dismiss="modal"
												aria-label="Close"
												onClick={() => setShowModal(false)}
											></button>
										</div>
										<div className="modal-body text-primary medium">Are you sure you are ready to submit your answer?</div>
										<div className="modal-footer medium">
											<button type="button" className="custom-btn" data-dismiss="modal" onClick={() => setShowModal(false)}>
												Cancel
											</button>
											<button type="submit" className="custom-btn" onClick={handleConfirmSubmit}>
												Submit
											</button>
										</div>
									</div>
								</div>
							</div>
							<div className={`modal-backdrop fade ${showModal ? "show" : ""}`} style={{ display: showModal ? "block" : "none" }}></div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}
