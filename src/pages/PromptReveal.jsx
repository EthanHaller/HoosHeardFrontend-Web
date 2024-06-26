import React, { useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "../hooks/useAuth"
import useFetch from "../hooks/useFetch"
import logoImage from "../images/HoosHeardLogoDark.png"
import "../styles/reveal.css"

export default function PromptReveal() {
	const { user, userLoading, logout } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (!userLoading && !user) {
			navigate("/")
		}
	}, [userLoading, user, navigate])

	const { data } = useFetch("/prompts/latest")

	const promptContainerRef = useRef(null)
	const handleScroll = () => {
		if (promptContainerRef.current) {
			promptContainerRef.current.scrollIntoView({ behavior: "smooth" })
		}
	}

	return (
		<>
			<div>
				<div className="view-height dark d-flex flex-column shapedividers_com-3810">
					<div className="d-flex justify-content-end align-items-center medium logout-bar">
						<button className="logout-btn mt-3 mx-3" onClick={() => logout()} aria-labelledby="logout">
							<FontAwesomeIcon icon={faArrowRightFromBracket} className="fontawesome-btn" />
						</button>
					</div>
					<div className="semicircle medium">
						<h1 className="text-primary logo">"HoosHeard"</h1>
					</div>
					<div className="d-flex flex-column align-items-center flex-grow-1">
						<h2 className="text-primary reveal-text text-center">THE DAILY PROMPT IS...</h2>
						<div className="d-flex jusitfy-content-center align-items-center mt-3 bounce-animation" onClick={() => handleScroll()}>
							<FontAwesomeIcon icon={faChevronDown} className="text-primary" />
							<h3 className="text-primary px-2">Scroll to view</h3>
							<FontAwesomeIcon icon={faChevronDown} className="text-primary" />
						</div>
					</div>
				</div>
				<div className="container-fluid view-height lightest d-flex flex-column" ref={promptContainerRef}>
					<div className="d-flex flex-column justify-content-center align-items-center flex-grow-1">
						<h2 className="text-primary text-center p-3 prompt-reveal-text">{data && data.prompt.text}</h2>
						<Link className="custom-btn mt-5" to="/my-answer">
							Write your response
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}
