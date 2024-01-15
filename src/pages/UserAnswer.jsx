import React, { useState, useEffect } from "react"
import PromptSidebar from "../components/PromptSidebar"
import "../styles/useranswer.css"
import axios from "axios"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"

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
			.then((res) => {
				console.log(res)
				const newUser = user
				newUser["responseId"] = res.data.response._id
				newUser["hasResponded"] = true
				logout()
				login(newUser)
				setShowModal(false)
				navigate("/responses")
			})
			.catch((err) => console.log(err))
	}

	return (
		<>
			<div className="container-fluid">
				<div className="row view-height">
					<PromptSidebar displayText={"MY RESPONSE TO..."} data={data} isLoading={isLoading} error={error} />
					<div className="col-lg-7 h-100 lightest d-flex flex-column">
						<span className="d-flex justify-content-end my-3 mx-2">
							<button className="logout-btn mx-2" onClick={() => handleLogout()} aria-labelledby="logout">
								<FontAwesomeIcon icon={faArrowRightFromBracket} className="fontawesome-btn" />
							</button>
						</span>
						<div className="d-flex flex-column justify-content-center h-100">
							<form className="d-flex flex-column mx-3">
								<div className="form-group">
									<label htmlFor="userResponseTextarea" className="text-primary textarea-label">
										Your Answer
									</label>
									<textarea className="custom-textarea" id="userResponseTextarea" rows="12" maxLength="300" onChange={handleTextareaChange}></textarea>
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
									<div className="modal-dialog modal-dialog-centered modal-lg" role="document">
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
											<div className="modal-body text-primary lightest">Are you sure you are ready to submit your answer?</div>
											<div className="modal-footer lightest">
												<button type="button" className="custom-btn-secondary" data-dismiss="modal" onClick={() => setShowModal(false)}>
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
			</div>
		</>
	)
}
