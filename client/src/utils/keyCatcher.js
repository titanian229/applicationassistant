const keyCatcher = (callbackFunction, keyName) => (event) => {
    if (event.key === keyName) callbackFunction()
}

export default keyCatcher