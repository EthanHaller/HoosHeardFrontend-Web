import React from "react"
import logoImage from "../images/HoosHeardLogoDark.png"
import "../styles/reveal.css"
import { Link } from "react-router-dom"
import Typewriter from "../components/landingPage/Typewriter"

export default function PromptReveal() {
	return (
		<>
			<div>
				<div className="container-fluid view-height dark d-flex flex-column shapedividers_com-3810">
					<div className="semicircle medium">
						<div className="logo">
							<img src={logoImage} alt="Logo" />
						</div>
					</div>
					<div className="d-flex justify-content-center align-items-center flex-grow-1">
						<h1 className="text-primary reveal-text">
							<Typewriter 
								text="THE DAILY PROMPT IS..."
								delay={10}
								showCursor={true}
							/>
						</h1>
					</div>
				</div>
				<div className="container-fluid view-height lightest d-flex flex-column">
					<div className="d-flex flex-column justify-content-center align-items-center flex-grow-1">
						<h2 className="text-primary text-center p-3" style={{ maxWidth: "75ch" }}>
							This is a sample daily prompt This is a sample daily prompt This is a sample daily prompt This is a sample daily prompt This is a
							sample daily prompt This is a sample daily prompt This is a sample daily prompt This is a sample daily prompt This is a sample daily
							prompt This is a sample daily prompt This is a sample daily prompt This is a sample daily prompt
						</h2>
						<Link className="" to="/my-answer">Write your response</Link>
					</div>
				</div>
			</div>
		</>
	)
}
