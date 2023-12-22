import React from "react"
import "./responses.css"
import logoImage from "../images/HoosHeardLogoDark.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle, faHeart, faComment } from "@fortawesome/free-solid-svg-icons"
import { faHeart as faUnliked, faComment as faUncommented } from "@fortawesome/free-regular-svg-icons"

export default function Responses() {
	const responseCards = testResponses.map((response) => {
		const timeAgo = calculateTimeAgo(response.timesstamp)
		const numLikes = nFormatter(response.likes, 1)
		const numComments = nFormatter(response.comments, 1)

		return (
			<div key={response.id} className="card mb-3">
				<div className="card-body">
					<div className="d-inline-flex align-items-center mb-3">
						<h5 className="m-0 text-primary">Anonymous</h5>
						<FontAwesomeIcon icon={faCircle} className="circle-icon" />
						<h6 className="m-0 text-secondary"> {timeAgo}</h6>
					</div>
					<p className="card-text">{response.text}</p>
					<div className="container-fluid">
						<div className="row">
							<div className="col-10"></div>
							<div className="col-1 p-0">
								<div className="d-flex flex-column">
									<FontAwesomeIcon icon={faUnliked} className="text-primary unliked" />
									<p className="m-0 text-primary text-center">{numLikes}</p>
								</div>
							</div>
							<div className="col-1 p-0">
								<div className="d-flex flex-column">
									<FontAwesomeIcon icon={faUncommented} className="text-primary" />
									<p className="m-0 text-primary text-center">{numComments}</p>
								</div>
							</div>
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

//https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900
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

const testResponses = [
	{
		id: 1,
		timesstamp: "2023-12-22T17:54:34.454Z",
		likes: 123,
		comments: 124100,
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
