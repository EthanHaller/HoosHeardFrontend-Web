import useFetch from "../hooks/useFetch"
import logoImage from "../images/HoosHeardLogoDark.png"

export default function PromptSidebar({ displayText }) {
	const { data, isLoading, error } = useFetch("/prompts/latest")

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
					{isLoading && <h5 className="text-primary p-3 prompt-text">loading...</h5>}
					{!isLoading && data && data.prompt && <h5 className="text-primary p-3 prompt-text">{data.prompt.text}</h5>}
					{!isLoading && !data && <p>No prompt available</p>}
				</div>
				<div className="flex-grow-1"></div>
			</div>
		</div>
	)
}
