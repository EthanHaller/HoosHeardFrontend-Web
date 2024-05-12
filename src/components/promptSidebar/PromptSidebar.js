import "./proptSidebar.css"

export default function PromptSidebar({ displayText, data, isLoading, error }) {
	return (
		<div className="sidebar-container dark">
			<div className="semicircle medium">
				<h1 className="text-primary logo">"HoosHeard"</h1>
			</div>
			<div className="sidebar-content">
				<h2 className="text-primary sidebar-text">{displayText}</h2>
				<div className="medium prompt-container">
					{isLoading && <h5 className="text-primary p-3 prompt-text">loading...</h5>}
					{!isLoading && data && data.prompt && <h5 className="text-body p-3 prompt-text">{data.prompt.text}</h5>}
					{!isLoading && !data && <p>No prompt available</p>}
				</div>
			</div>
		</div>
	)
}
