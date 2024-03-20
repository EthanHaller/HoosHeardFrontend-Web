import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"

import "../../styles/responses.css"
import { useAuth } from "../../hooks/useAuth"

export default function CommentCard({ comment }) {
	const { user } = useAuth()

	const timeAgo = calculateTimeAgo(comment.createdAt)

	return (
		<div key={comment._id} className="card mb-3">
			<div className="card-body">
				<div className="d-inline-flex align-items-center mb-3">
					<h5 className="m-0 text-primary">Anonymous</h5>
					<FontAwesomeIcon icon={faCircle} className="circle-icon" />
					<h6 className="m-0 text-secondary"> {timeAgo}</h6>
				</div>
				<p className="card-text text-body">{comment.text}</p>
			</div>
		</div>
	)
}

function calculateTimeAgo(timestamp) {
	const now = new Date()
	const posted = new Date(timestamp)

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
