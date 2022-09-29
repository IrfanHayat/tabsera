import React, { useEffect, useState } from 'react'
import localStorage from 'localStorage'
function getLocalStorage(key, value) {
    let item = localStorage.getItem(key)
    if (item) return item
    return value
}

function UseLocalStorage({ key, value }) {
    const [updateValue, setUpdateValue] = useState(() => getLocalStorage(key, value))
    useEffect(() => {

        localStorage.setItem(key, JSON.stringify(value))

    }, [updateValue])

    return [updateValue, setUpdateValue]
}

export default UseLocalStorage