import React, { useState } from "react"
import PromptSidebar from "../components/PromptSidebar"
import "../styles/useranswer.css"

export default function UserAnswer() {
	const [showModal, setShowModal] = useState(false)

	const handleShowModal = () => setShowModal(true)
	const handleCloseModal = () => setShowModal(false)

	const handleConfirmSubmit = () => {
		// Implement your actual submit logic here
		// For example, you can make an API request to submit the user's response
		// After successful submission, you can close the modal and perform any additional actions
		handleCloseModal()
	}

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
							<button type="button" className="custom-btn align-self-end mt-1" onClick={handleShowModal}>
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
												onClick={handleCloseModal}
											></button>
										</div>
										<div className="modal-body text-primary medium">Are you sure you are ready to submit your answer?</div>
										<div className="modal-footer medium">
											<button type="button" className="custom-btn" data-dismiss="modal" onClick={handleCloseModal}>
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
