import logoImage from "../images/HoosHeardLogoDark.png"

export default function PromptSidebar({displayText}) {
	return (
		<div className="col-lg-5 h-100 dark d-flex flex-column">
			<div className="semicircle medium">
				<div className="logo">
					<img src={logoImage} alt="Logo" />
				</div>
			</div>
			<div className="d-flex flex-column justify-content-center align-items-center flex-grow-1">
                <div className="flex-grow-1"></div>
                <h2 className="text-primary sidebar-text">{displayText}</h2>
				<div className="medium prompt-container">
					<h5 className="text-primary p-3">
						This is a sample daily prompt This is a sample daily prompt This is a sample daily prompt This is a sample daily prompt This is a sample
						daily prompt This is a sample daily prompt This is a sample daily prompt This is a sample daily prompt This is a sample daily prompt
						This is a sample daily prompt This is a sample daily prompt This is a sample daily prompt
					</h5>
				</div>
                <div className="flex-grow-1"></div>
			</div>
		</div>
	)
}
