// https://blog.logrocket.com/3-ways-implement-typing-animation-react/
import React, { useState, useEffect } from "react"

const BlinkingCursor = () => {
	const [isVisible, setIsVisible] = useState(true)

	useEffect(() => {
		const intervalId = setInterval(() => {
			setIsVisible((prevVisible) => !prevVisible)
		}, 500)

		return () => {
			clearInterval(intervalId)
		}
	}, [])

	return <span style={{ visibility: isVisible ? "visible" : "hidden" }}>_</span>
}

const Typewriter = ({ text, delay, showCursor }) => {
	const [currentText, setCurrentText] = useState("")
	const [currentIndex, setCurrentIndex] = useState(0)
	const [complete, setComplete] = useState(false)

	useEffect(() => {
		const typingInterval = setInterval(() => {
			if (currentIndex < text.length) {
				setCurrentText((prevText) => prevText + text[currentIndex])
				setCurrentIndex((prevIndex) => prevIndex + 1)
			} else {
				clearInterval(typingInterval)
				handleCompletion()
			}
		}, delay)

		return () => {
			clearInterval(typingInterval)
		}
	}, [currentIndex, delay, text])

	const handleCompletion = () => {
		setComplete(true)
	}

	return (
		<>
			<p className="landing-description">
				{currentText}
				{showCursor && complete && <BlinkingCursor />}
			</p>
		</>
	)
}

export default Typewriter
