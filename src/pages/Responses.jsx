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
						<div className="d-flex justify-content-center">
							<h2 className="text" style={{ fontSize: "5rem", maxWidth: "100%" }}>
								ANONYMOUS
							</h2>
						</div>
					</div>
					<div className="col-lg-7 h-100 lightest"></div>
				</div>
			</div>
		</>
	)
}
