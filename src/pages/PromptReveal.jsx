import React, { useRef } from "react"
import logoImage from "../images/HoosHeardLogoDark.png"
import "../styles/reveal.css"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

export default function PromptReveal() {
	const promptContainerRef = useRef(null)

	const handleScroll = () => {
		if (promptContainerRef.current) {
			promptContainerRef.current.scrollIntoView({ behavior: "smooth" })
		}
	}

	return (
		<>
			<div>
				<div className="container-fluid view-height dark d-flex flex-column shapedividers_com-3810">
					<div className="semicircle medium">
						<div className="logo">
							<img src={logoImage} alt="Logo" />
						</div>
					</div>
					<div className="d-flex flex-column justify-content-center align-items-center flex-grow-1">
						<h1 className="text-primary reveal-text">THE DAILY PROMPT IS...</h1>
						<div className="d-flex jusitfy-content-center align-items-center mt-3 bounce-animation" onClick={() => handleScroll()}>
							<FontAwesomeIcon icon={faChevronDown} className="text-primary" />
							<h3 className="text-primary px-2">Scroll to view</h3>
							<FontAwesomeIcon icon={faChevronDown} className="text-primary" />
						</div>
					</div>
				</div>
				<div className="container-fluid view-height lightest d-flex flex-column" ref={promptContainerRef}>
					<div className="d-flex flex-column justify-content-center align-items-center flex-grow-1">
						<h2 className="text-primary text-center p-3" style={{ maxWidth: "75ch" }}>
							This is a sample daily prompt This is a sample daily prompt This is a sample daily prompt This is a sample daily prompt This is a
							sample daily prompt This is a sample daily prompt This is a sample daily prompt This is a sample daily prompt This is a sample daily
							prompt This is a sample daily prompt This is a sample daily prompt This is a sample daily prompt
						</h2>
						<Link className="custom-btn" to="/my-answer">
							Write your response
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}
