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
						<div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "calc(100% - 8em)" }}>
							<h2 className="text m-0" style={{ fontSize: "5vw", maxWidth: "100%", letterSpacing: ".7rem" }}>
								ANONYMOUS
							</h2>
							<h2 className="text" style={{ fontSize: "3.75vw", maxWidth: "100%", letterSpacing: ".5rem"}}>
								RESPONSES TO...
							</h2>
						</div>
					</div>
					<div className="col-lg-7 h-100 lightest"></div>
				</div>
			</div>
		</>
	)
}
