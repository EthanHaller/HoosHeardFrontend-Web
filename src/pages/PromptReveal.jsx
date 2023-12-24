import React from "react"
import logoImage from "../images/HoosHeardLogoDark.png"
import "../styles/reveal.css"

export default function PromptReveal() {
	return (
		<>
			<div>
				<div className="container-fluid view-height dark d-flex flex-column ">
					<div className="semicircle medium">
						<div className="logo">
							<img src={logoImage} alt="Logo" />
						</div>
					</div>
					<div className="d-flex justify-content-center align-items-center flex-grow-1">
						<h1 className="text-primary reveal-text">THE DAILY PROMPT IS...</h1>
					</div>
				</div>
				<div className="container-fluid view-height lightest d-flex flex-column">
					<div className="d-flex justify-content-center align-items-center flex-grow-1">
						<h2 className="text-primary text-center p-3" style={{ maxWidth: "75ch" }}>
							This is a sample daily prompt This is a sample daily prompt This is a sample daily prompt This is a sample daily prompt This is a
							sample daily prompt This is a sample daily prompt This is a sample daily prompt This is a sample daily prompt This is a sample daily
							prompt This is a sample daily prompt This is a sample daily prompt This is a sample daily prompt
						</h2>
					</div>
				</div>
			</div>
		</>
	)
}
