import React from "react"
import "./responses.css"
import logoImage from "../images/HoosHeardLogoDark.png"

export default function Responses() {
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
							<h2 className="text m-0 anonymous-text">ANONYMOUS</h2>
							<h2 className="text responses-to-text">RESPONSES TO...</h2>
							<div className="medium prompt-container">
								<h5 className="text p-3">
									This is a sample daily prompt This is a sample daily prompt This is a sample daily prompt This is a sample daily prompt This
									is a sample daily prompt This is a sample daily prompt This is a sample daily prompt This is a sample daily prompt This is a
									sample daily prompt This is a sample daily prompt This is a sample daily prompt This is a sample daily prompt
								</h5>
							</div>
						</div>
					</div>
					<div className="col-lg-7 h-100 lightest"></div>
				</div>
			</div>
		</>
	)
}
