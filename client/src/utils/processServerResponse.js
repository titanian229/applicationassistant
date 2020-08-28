const formatMessage = (message, variant) => {
    return {message, options: { key: message, variant }};
};

const processServerResponse = (serverResponse) => {
    if (!serverResponse) {
        return formatMessage('The server is not responding', 'error');
    }
    if (serverResponse.error) {
        return formatMessage(serverResponse.error, 'error');
    }
    if (serverResponse.message) {
        return formatMessage(serverResponse.message, serverResponse.messageType || 'success');
    }
    console.log('Error within processServerResponse');
    return 'Error';
};

export default processServerResponse;
