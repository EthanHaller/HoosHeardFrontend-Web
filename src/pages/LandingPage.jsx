import React from "react"
import { Link } from "react-router-dom"
import Typewriter from "../components/landingPage/Typewriter"
import "../styles/landingpage.css"

export default function LandingPage() {
	return (
		<>
			<div className="container-fluid">
				<div className="row view-height">
					<div className="lightest shapedividers_com-5341"></div>
					<div className="col-xl-8 lightest landing-container">
						<div className="top-row text-primary landing-logo d-flex w-100">
							"<Typewriter text={'HoosHeard"'} delay={75} />
						</div>
						<div className="middle-row">
							<p className="landing-description mb-0">
								Welcome to HoosHeard, an anonymous social media platform designed to help your voice be heard! Every day, you are presented with
								a thought-provoking question to answer. The catch? You must submit your response before you can see all other anonymous
								responses. Join HoosHeard to share, connect, and be heard!
							</p>
						</div>
						<div className="bottom-row">
							<div>
								<Link to="/login">
									<button className="custom-btn small">Login</button>
								</Link>
								<Link to="/signup">
									<button className="custom-btn-secondary small">Signup</button>
								</Link>
							</div>
							<p className="disclaimer mt-3">We will not share your information with anyone.</p>
						</div>
					</div>
					<div className="col-xl-4 d-none d-xl-block lightest shapedividers_com-1228"></div>
				</div>
			</div>
		</>
	)
}
