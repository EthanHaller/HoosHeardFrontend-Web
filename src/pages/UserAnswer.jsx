import React, { useState, useEffect } from "react"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import PromptSidebar from "../components/PromptSidebar"
import "../styles/useranswer.css"

export default function UserAnswer() {
	const { user, userLoading, login, logout } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (!userLoading) {
			if (!user) navigate("/")
			else if (user.hasResponded) navigate(`/responses/${user.responseId}`)
		}
	}, [userLoading, user, navigate])

	const handleLogout = () => {
		logout()
		navigate("/")
	}

	const { data, isLoading, error } = useFetch("/prompts/latest")

	const [showError, setShowError] = useState(false)
	const [showModal, setShowModal] = useState(false)
	const [text, setText] = useState("")

	const handleTextareaChange = (event) => {
		setText(event.target.value)
	}

	const handleConfirmSubmit = (event) => {
		event.preventDefault()
		setShowModal(false)

		axios
			.post(`${process.env.REACT_APP_BACKEND_URL}/responses/create`, {
				email: user.user.email,
				promptId: data._id,
				text: text,
			})
			.then((res) => {
				const newUser = user
				newUser["responseId"] = res.data.response._id
				newUser["hasResponded"] = true
				logout()
				login(newUser)
				setShowModal(false)
				navigate("/responses")
			})
			.catch((err) => {
				console.info(err)
				if (err.response.data.flagged) {
					setShowError(true)
				}
			})
	}

	return (
		<>
			<div className="container-fluid">
				<div className="nav-buttons my-3">
					<button className="logout-btn mx-2" onClick={() => handleLogout()} aria-labelledby="logout">
						<FontAwesomeIcon icon={faArrowRightFromBracket} className="fontawesome-btn" />
					</button>
				</div>
				<div className="row view-height">
					<PromptSidebar displayText={"MY RESPONSE TO..."} data={data} isLoading={isLoading} error={error} />
					<div className="col-lg-7 lightest d-flex flex-column">
						<div className="d-flex flex-column justify-content-center mt-5">
							<form className="d-flex flex-column mx-3 mb-5">
								<div className="form-group">
									<label htmlFor="userResponseTextarea" className="text-primary textarea-label">
										Your Response
									</label>
									<textarea
										className="custom-textarea"
										id="userResponseTextarea"
										rows="10"
										maxLength="1800"
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
												<h5 className="modal-title text-primary">Warning</h5>
											</div>
											<div className="modal-body text-primary lightest">
												Are you sure you are ready to submit your response? You will not be able to edit your response once you submit.
											</div>
											<div className="modal-footer lightest">
												<button
													type="button"
													className="custom-btn-secondary small"
													data-dismiss="modal"
													onClick={() => setShowModal(false)}
												>
													Cancel
												</button>
												<button type="submit" className="custom-btn small" onClick={handleConfirmSubmit}>
													Submit
												</button>
											</div>
										</div>
									</div>
								</div>
								<div className={`modal-backdrop fade ${showModal ? "show" : ""}`} style={{ display: showModal ? "block" : "none" }}></div>
							</form>
						</div>
						<div className={`modal fade ${showError ? "show" : ""}`} style={{ display: showError ? "block" : "none" }} tabIndex="-1" role="dialog">
							<div className="modal-dialog modal-dialog-centered" role="document">
								<div className="modal-content">
									<div className="modal-header dark">
										<h5 className="modal-title text-primary">Response Flagged</h5>
									</div>
									<div className="modal-body text-primary lightest">
										Your response has been flagged as potentially harmful and has not been submitted.
									</div>
									<div className="modal-footer lightest">
										<button type="button" className="custom-btn-secondary small" data-dismiss="modal" onClick={() => setShowError(false)}>
											Close
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className={`modal-backdrop fade ${showError ? "show" : ""}`} style={{ display: showError ? "block" : "none" }}></div>
					</div>
				</div>
			</div>
		</>
	)
}
