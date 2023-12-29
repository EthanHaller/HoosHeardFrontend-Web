import React, { useEffect, useState } from "react"
import useFetch from "../../hooks/useFetch"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle, faHeart } from "@fortawesome/free-solid-svg-icons"
import { faHeart as faUnliked, faComment as faUncommented } from "@fortawesome/free-regular-svg-icons"

import "../../styles/responses.css"
import { useAuth } from "../../AuthProvider"
import axios from "axios"

export default function ResponseCards() {
	const { user } = useAuth()
	const [sortOption, setSortOption] = useState("hot")
	const { data: responseData, isLoading: isResponseLoading, error: responseError } = useFetch("/responses/")

	const [likeData, setLikeData] = useState([])
	useEffect(() => {
		axios.get(`${process.env.REACT_APP_BACKEND_URL}/likes/`, {
			params: { email: user.user.email }
		})
		.then(res => setLikeData(res.data))
		.catch(err => console.error(err))
	},[user.user.email])

	const [liked, setLiked] = useState(new Set(likeData.likes))

	const handleLikeUnlike = (responseId) => {
		const nextSet = new Set(liked)
		if (liked.has(responseId)) {
			// unlike
			axios.post(`${process.env.REACT_APP_BACKEND_URL}/likes/unlike`, {
				email: user.user.email,
				responseId: responseId
			})
			.then(res => {
				console.log(res)
				nextSet.delete(responseId)
			})
			.catch(err => {
				console.error(err)
			})
		} else {
			// like
			axios.post(`${process.env.REACT_APP_BACKEND_URL}/likes/unlike`, {
				email: user.user.email,
				responseId: responseId
			})
			.then(res => {
				console.log(res)
				nextSet.add(responseId)
			})
			.catch(err => {
				console.error(err)
			})
		}
		setLiked(nextSet)
	}

	const handleSort = (option) => {
		setSortOption(option)
	}

	if (isResponseLoading || !responseData) {
		return <p>Loading responses...</p>
	}

	const responsesSorted = [...responseData.responses].sort((a, b) => {
		if (sortOption === "recent") {
			return new Date(b.timestamp) - new Date(a.timestamp)
		} else {
			return b.likes - a.likes
		}
	})

	const responseCards = responsesSorted.map((response) => {
		const timeAgo = calculateTimeAgo(response.createdAt)
		const numLikes = nFormatter(response.likes, 1)
		const numComments = nFormatter(response.comments, 1)
		const isLiked = liked.has(response._id)

		return (
			<div key={response._id} className="card mb-3">
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
									<button className="btn p-0" onClick={() => handleLikeUnlike(response._id)}>
										<FontAwesomeIcon icon={isLiked ? faHeart : faUnliked} className="text-primary" />
										<p className="m-0 text-primary text-center">{numLikes}</p>
									</button>
								</div>
							</div>
							<div className="col-1 p-0">
								<div className="d-flex flex-column">
									<button className="btn p-0">
										<FontAwesomeIcon icon={faUncommented} className="text-primary" />
										<p className="m-0 text-primary text-center">{numComments}</p>
									</button>
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
			<span className="d-flex align-items-center mt-2 mb-3">
				<button className={`btn ${sortOption === "hot" ? "active" : ""}`} onClick={() => handleSort("hot")}>
					Hot
				</button>
				<p className="text-center p-0 m-0">|</p>
				<button className={`btn ${sortOption === "recent" ? "active" : ""}`} onClick={() => handleSort("recent")}>
					Recent
				</button>
			</span>
			<div>{responseCards}</div>
		</>
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
