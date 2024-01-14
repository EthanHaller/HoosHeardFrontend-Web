import React, { useEffect, useState } from "react"
import PromptSidebar from "../components/PromptSidebar"
import CommentCard from "../components/comments/CommentCard"
import useFetch from "../hooks/useFetch"
import { useParams, Link, useNavigate } from "react-router-dom"
import ResponseCard from "../components/responses/ResponseCard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "../styles/comments.css"
import { faChevronLeft, faUserPen, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "../hooks/useAuth"
import axios from "axios"

export default function Comments() {
	const { user, userLoading, logout } = useAuth()
	const navigate = useNavigate()
	const params = useParams()
	const id = params.id
	const [text, setText] = useState("")

	useEffect(() => {
		if (!userLoading) {
			if (!user) navigate("/")
			else if (!user.hasResponded) navigate("/reveal")
		}
	}, [userLoading, user, navigate])

	const { data, isLoading, error } = useFetch("/prompts/latest", !userLoading)
	const { data: responseData, isLoading: responseLoading, error: responseError } = useFetch(`/responses/one/${user ? user.user._id : ""}/${id}`, !userLoading)
	const { data: commentsData, isLoading: commentsLoading, error: commentsError } = useFetch(`/comments/${id}`, !userLoading)

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
			.post(`${"http://localhost:8080"}/comments/create`, {
				email: user.user.email,
				responseId: responseData.response._id,
				text: text,
			})
			.then((res) => {
				console.log(res)
				navigate(0)
			})
			.catch((err) => console.log(err))
	}

	let comments
	if (isLoading || !responseData || !commentsData) {
		comments = { comments: [] }
	} else comments = commentsData

	comments = comments.comments.map((comment) => {
		return <CommentCard comment={comment} key={comment._id} />
	})

	return (
		<>
			<div className="container-fluid">
				<div className="row view-height">
					<PromptSidebar displayText={sidebarText} data={data} isLoading={isLoading} error={error} />
					<div className="col-lg-7 lightest">
						<span className="d-flex align-items-center">
							<Link to={"/responses"} className="p-3">
								<FontAwesomeIcon icon={faChevronLeft} className="fontawesome-btn" />
							</Link>
							<span className="flex-grow-1"></span>
							<Link to={`/responses/${user ? user.responseId : ""}`} aria-labelledby="My Answer" className="mx-2">
								<FontAwesomeIcon icon={faUserPen} className="fontawesome-btn" />
							</Link>
							<button className="logout-btn mx-2" onClick={() => logout()} aria-labelledby="logout">
								<FontAwesomeIcon icon={faArrowRightFromBracket} className="fontawesome-btn" />
							</button>
						</span>
						{responseLoading ? <p>Loading...</p> : <ResponseCard response={responseData?.response} />}
						<form className="d-flex flex-column">
							<div className="form-group">
								<label htmlFor="userResponseTextarea" className="text-primary comment-textarea-label">
									Write a comment...
								</label>
								<textarea className="comment-textarea" id="userResponseTextarea" rows="2" onChange={handleTextareaChange}></textarea>
							</div>
							<button type="submit" className="custom-btn align-self-end mt-1" onClick={handleConfirmSubmit}>
								Submit
							</button>
						</form>
						<h3 className="text-primary mt-2">Comments</h3>
						<div className="comments-container">{comments}</div>
					</div>
				</div>
			</div>
		</>
	)
}
