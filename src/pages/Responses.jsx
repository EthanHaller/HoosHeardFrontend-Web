import React from "react"
import "./responses.css"
import logoImage from "../images/HoosHeardLogoDark.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle, faHeart, faComment } from "@fortawesome/free-solid-svg-icons"
import { faHeart as faUnliked, faComment as faUncommented } from '@fortawesome/free-regular-svg-icons'

export default function Responses() {
	const responseCards = testResponses.map((response) => {
		const timeAgo = calculateTimeAgo(response.timesstamp)
		return (
			<div key={response.id} className="card mb-3">
				<div className="card-body">
					<div className="d-inline-flex align-items-center mb-3">
						<h5 className="m-0 text-primary">Anonymous</h5>
						<FontAwesomeIcon icon={faCircle} className="circle-icon" />
						<h6 className="m-0 text-secondary"> {timeAgo}</h6>
					</div>
					<p className="card-text">{response.text}</p>
					<div className="d-flex justify-content-end align-items-end">
						<div className="d-flex flex-column mx-2">
							<FontAwesomeIcon icon={faUnliked} className="text-primary unliked"/>
							<p className="m-0 text-primary">{response.likes}</p>
						</div>
						<div className="d-flex flex-column mx-2">
							<FontAwesomeIcon icon={faUncommented} className="text-primary"/>
							<p className="m-0 text-primary">{response.comments}</p>
						</div>
					</div>
				</div>
			</div>
		)
	})

	return (
		<>
			<div className="container-fluid">
				<div className="row" style={{ height: "100vh" }}>
					<div className="col-lg-5 h-100 dark">
						<div className="semicircle medium">
							<div className="logo">
								<img src={logoImage} alt="Logo" />
							</div>
						</div>
						<div className="d-flex flex-column justify-content-center align-items-center prompt-display-container">
							<h2 className="text-primary m-0 anonymous-text">ANONYMOUS</h2>
							<h2 className="text-primary responses-to-text">RESPONSES TO...</h2>
							<div className="medium prompt-container">
								<h5 className="text-primary p-3">
									This is a sample daily prompt This is a sample daily prompt This is a sample daily prompt This is a sample daily prompt This
									is a sample daily prompt This is a sample daily prompt This is a sample daily prompt This is a sample daily prompt This is a
									sample daily prompt This is a sample daily prompt This is a sample daily prompt This is a sample daily prompt
								</h5>
							</div>
						</div>
					</div>
					<div className="col-lg-7 h-100 lightest">{responseCards}</div>
				</div>
			</div>
		</>
	)
}

function calculateTimeAgo(timesstamp) {
	const now = new Date()
	const posted = new Date(timesstamp)

	var ms_Min = 60 * 1000
	var ms_Hour = ms_Min * 60

	const diff = now - posted

	if (diff < ms_Min) {
		if (Math.round(diff / 1000) === 1) return Math.round(diff / 1000) + " second ago"
		return Math.round(diff / 1000) + " seconds ago"
	} else if (diff < ms_Hour) {
		if (Math.round(diff / ms_Min) === 1) return Math.round(diff / ms_Min) + " minute ago"
		return Math.round(diff / ms_Min) + " minutes ago"
	} else {
		if (Math.round(diff / ms_Hour) === 1) return Math.round(diff / ms_Hour) + " hour ago"
		return Math.round(diff / ms_Hour) + " hours ago"
	}
}

const testResponses = [
	{
		id: 1,
		timesstamp: "2023-12-22T17:54:34.454Z",
		likes: 123,
		comments: 124,
		text: "this is a sample response",
	},
	{
		id: 2,
		timesstamp: "2023-12-22T16:54:34.454Z",
		likes: 123,
		comments: 124,
		text: "this is another sample response",
	},
	{
		id: 3,
		timesstamp: "2023-12-22T15:54:34.454Z",
		likes: 123,
		comments: 124,
		text: "woah look at this response",
	},
]
