import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle, faHeart } from "@fortawesome/free-solid-svg-icons"
import { faHeart as faUnliked, faComment as faUncommented } from "@fortawesome/free-regular-svg-icons"

import "../../styles/responses.css"
import { useAuth } from "../../hooks/useAuth"
import axios from "axios"
import { Link } from "react-router-dom"

export default function ResponseCard({ response }) {
	const { user } = useAuth()
	const [isLiked, setisLiked] = useState(false)
	const [numLikes, setNumLikes] = useState(false)

	const handleLikeUnlike = (responseId) => {
		if (isLiked) {
			// unlike
			axios
				.post(`${process.env.REACT_APP_BACKEND_URL}/likes/unlike`, {
					email: user.user.email,
					responseId: responseId,
				})
				.then((res) => {
					setisLiked(false)
					setNumLikes(numLikes - 1)
				})
				.catch((err) => {
					console.error(err)
				})
		} else {
			// like
			axios
				.post(`${process.env.REACT_APP_BACKEND_URL}/likes/unlike`, {
					email: user.user.email,
					responseId: responseId,
				})
				.then((res) => {
					setisLiked(true)
					setNumLikes(numLikes + 1)
				})
				.catch((err) => {
					console.error(err)
				})
		}
	}

	const timeAgo = calculateTimeAgo(response.createdAt)
	const nLikes = nFormatter(numLikes)
	const nComments = nFormatter(response.numComments, 1)

	return (
		<div key={response._id} className="card mb-3">
			<div className="card-body">
				<div className="d-inline-flex align-items-center mb-3">
					<h5 className="m-0 text-primary">Anonymous</h5>
					<FontAwesomeIcon icon={faCircle} className="circle-icon" />
					<h6 className="m-0 text-secondary"> {timeAgo}</h6>
				</div>
				<p className="card-text text-primary">{response.text}</p>
				<div className="container-fluid">
					<div className="row">
						<div className="col-10"></div>
						<div className="col-1 p-0">
							<div className="d-flex flex-column">
								<button className="btn p-0" onClick={() => handleLikeUnlike(response._id)}>
									<FontAwesomeIcon icon={isLiked ? faHeart : faUnliked} className="text-primary" />
									<p className="m-0 text-primary text-center">{nLikes}</p>
								</button>
							</div>
						</div>
						<div className="col-1 p-0">
							<div className="d-flex flex-column">
								<Link to={`/responses/${response._id}`} className="d-flex justify-content-center">
									<button className="btn p-0">
										<FontAwesomeIcon icon={faUncommented} className="text-primary" />
									</button>
								</Link>
								<p className="m-0 text-primary text-center">{nComments}</p>
							</div>
						</div>
					</div>
				</div>
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

// https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900
function nFormatter(num, digits) {
	const lookup = [
		{ value: 1, symbol: "" },
		{ value: 1e3, symbol: "k" },
		{ value: 1e6, symbol: "M" },
		{ value: 1e9, symbol: "G" },
		{ value: 1e12, symbol: "T" },
		{ value: 1e15, symbol: "P" },
		{ value: 1e18, symbol: "E" },
	]
	const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
	var item = lookup
		.slice()
		.reverse()
		.find(function (item) {
			return num >= item.value
		})
	return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0"
}
