import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import useFetch from "../hooks/useFetch"
import PromptSidebar from "../components/promptSidebar/PromptSidebar"
import CommentCard from "../components/comments/CommentCard"
import ResponseCard from "../components/responses/ResponseCard"
import axios from "axios"

import "../styles/comments.css"

export default function Comments() {
	const { user, userLoading, logout } = useAuth()
	const navigate = useNavigate()
	const params = useParams()
	const id = params.id
	const [comments, setComments] = useState([])
	const [page, setPage] = useState(1)
	const [text, setText] = useState("")
	const [showError, setShowError] = useState(false)

	useEffect(() => {
		if (!userLoading && !user) {
			navigate("/")
		} else if (!userLoading && !user.hasResponded) {
			navigate("/reveal")
		}
	}, [userLoading, user, navigate])

	const { data, isLoading, error } = useFetch("/prompts/latest", !userLoading)
	const { data: responseData, isLoading: responseLoading } = useFetch(`/responses/one/${user ? user.user._id : ""}/${id}`, !userLoading)

	const { data: commentsData } = useFetch(`/comments/${id}?page=${page}&`, !userLoading)

	useEffect(() => {
		if (commentsData && commentsData.comments) {
			setComments((prevComments) => [...prevComments, ...commentsData.comments])
		}
	}, [commentsData])

	let sidebarText = "ANONYMOUS RESPONSE TO..."
	if (user && user.hasResponded && user.responseId === id) {
		sidebarText = "MY RESPONSE TO..."
	}

	const handleTextareaChange = (event) => {
		setText(event.target.value)
	}

	const handleConfirmSubmit = (event) => {
		event.preventDefault()

		axios
			.post(`${process.env.REACT_APP_BACKEND_URL}/comments/create`, {
				email: user.user.email,
				responseId: responseData.response._id,
				text: text,
			})
			.then((res) => {
				console.log(res)
				navigate(0)
			})
			.catch((err) => {
				console.info(err)
				if (err.response.data.flagged) {
					setShowError(true)
				}
			})
	}

	const handleLogout = () => {
		logout()
		navigate("/")
	}

	const handleScroll = (e) => {
		const { offsetHeight, scrollTop, scrollHeight } = e.target
		if (offsetHeight + scrollTop >= scrollHeight) {
			setPage((prevPage) => prevPage + 1)
		}
	}

	let commentsCards = comments.map((comment) => {
		return <CommentCard comment={comment} key={comment._id} />
	})

	if (comments.length === 0) {
		commentsCards = <h5 className="text-primary">Be the first to comment!</h5>
	}

	return (
		<div className="comments-container">
			<PromptSidebar displayText={sidebarText} data={data} isLoading={isLoading} error={error} />
			<div className="comments lightest" onScroll={handleScroll}>
				<span className="d-flex align-items-center">
					<Link to={"/responses"} className="p-3">
						<FontAwesomeIcon icon={faChevronLeft} className="fontawesome-btn" />
					</Link>
					<div className="nav-buttons my-3">
						<button className="logout-btn mx-2" onClick={() => handleLogout()} aria-labelledby="logout">
							<FontAwesomeIcon icon={faArrowRightFromBracket} className="fontawesome-btn" />
						</button>
					</div>
				</span>
				{responseLoading ? (
					<p>Loading...</p>
				) : (
					<ResponseCard
						response={responseData?.response}
						username={user && user.hasResponded && user.responseId === id ? "My Response" : "Anonymous"}
					/>
				)}
				<form className="d-flex flex-column">
					<div className="form-group">
						<label htmlFor="userResponseTextarea" className="text-primary comment-textarea-label">
							Write a comment...
						</label>
						<textarea className="comment-textarea" id="userResponseTextarea" rows="2" maxLength="1800" onChange={handleTextareaChange}></textarea>
					</div>
					<button type="submit" className="custom-btn align-self-end mt-1" onClick={handleConfirmSubmit}>
						Submit
					</button>
				</form>
				<h3 className="text-primary mt-2">Comments</h3>
				<div className="comment-card-container">{commentsCards}</div>
				<div className={`modal fade ${showError ? "show" : ""}`} style={{ display: showError ? "block" : "none" }} tabIndex="-1" role="dialog">
					<div className="modal-dialog modal-dialog-centered" role="document">
						<div className="modal-content">
							<div className="modal-header dark">
								<h5 className="modal-title text-primary">Comment Flagged</h5>
							</div>
							<div className="modal-body text-primary lightest">
								Your comment has been flagged as potentially harmful and has not been submitted.
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
	)
}
