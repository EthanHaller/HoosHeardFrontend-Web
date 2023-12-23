import React from "react"
import logoImage from "../images/HoosHeardLogoDark.png"
import ResponseCards from "../components/responses/ResponseCards"

import "../styles/responses.css"


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
					<div className="col-lg-7 h-100 lightest">
						<span className="d-flex align-items-center mt-2 mb-3">
							<button className="btn">
								Hot
							</button>
							<p className="text-center p-0 m-0">|</p>
							<button className="btn">
								Recent
							</button>
						</span>
						<ResponseCards />
					</div>
				</div>
			</div>
		</>
	)
}