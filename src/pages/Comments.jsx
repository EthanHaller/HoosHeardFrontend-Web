import React, { useState } from "react"
import PromptSidebar from "../components/PromptSidebar"
import CommentCard from "../components/comments/CommentCard"
import useFetch from "../hooks/useFetch"
import { useParams, Link, useNavigate } from "react-router-dom"
import ResponseCard from "../components/responses/ResponseCard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "../styles/comments.css"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "../AuthProvider"
import axios from "axios"

export default function Comments() {
	const { user } = useAuth()
	const navigate = useNavigate()
	const params = useParams()
	const id = params.id

	const { data, isLoading, error } = useFetch("/prompts/latest")
	const { data: responseData, isLoading: responseLoading, error: responseError } = useFetch(`/responses/${id}`)
	const { data: commentsData, isLoading: commentsLoading, error: commentsError } = useFetch(`/comments/${id}`)

	const [text, setText] = useState("")

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
			.then((res) => console.log(res))
			.catch((err) => console.log(err))

		navigate(0)
	}

	if (isLoading || !responseData || !commentsData) {
		return (
			<>
				<p>Loading...</p>
			</>
		)
	}

	console.info(responseData)
	console.info(commentsData)

	const comments = commentsData.comments.map((comment) => {
		return <CommentCard comment={comment} />
	})

	return (
		<>
			<div className="container-fluid">
				<div className="row view-height">
					<PromptSidebar displayText={"ANONYMOUS RESPONSES TO..."} data={data} isLoading={isLoading} error={error} />
					<div className="col-lg-7 lightest">
						<Link to={"/responses"} className="p-3">
							<FontAwesomeIcon icon={faChevronLeft} className="back-btn my-3" />
						</Link>
						<ResponseCard response={responseData.response} />
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
