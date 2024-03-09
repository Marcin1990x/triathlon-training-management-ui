import { useState } from "react"

export const useListVisibility = () => {
    const [isListVisible, setIsListVisible] = useState(true)

    const setListVisibility = (isVisible) => {
        setIsListVisible(isVisible)
        console.log(isListVisible)
    }

    return {isListVisible, setListVisibility}
}

