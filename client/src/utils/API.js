const getRequest = async (url) => {
    // let ret = await fetch(url)
    // console.log(ret)
    // ret = await ret.json()
    // console.log(ret)
    return fetch(url)
        .then((res) => res.json())
        .catch((err) => console.error(err));
};

const putRequest = async (url, body) => {
    return fetch(url, {
        method: 'put',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            // Session: localStorage.session ? localStorage.session : '',
        },
        body: JSON.stringify(body),
    })
        .then((result) => result.json())
        .catch((err) => console.log(err));
};

const postRequest = async (url, body) => {
    return fetch(url, {
        method: 'post',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            // Session: localStorage.session ? localStorage.session : '',
        },
        body: JSON.stringify(body),
    })
        .then((result) => result.json())
        .catch((err) => console.log(err));
};

const deleteRequest = async (url) => {
    return fetch(url, {
        method: 'delete',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            // Session: localStorage.session ? localStorage.session : '',
        },
    })
        .then((result) => result.json())
        .catch((err) => console.log(err));
};

export default {
    post: async (url, body) => {
        return fetch(url, {
            method: 'post',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                // Session: localStorage.session ? localStorage.session : '',
            },
            body: JSON.stringify(body),
        })
            .then((result) => result.json())
            .catch((err) => console.log(err));
    },
    getResumes: async () => getRequest('/api/resumes'),
    getContacts: async () => getRequest('/api/contacts'),
    getApplications: async () => getRequest('/api/applications'),
    getApplication: async (id) => getRequest('/api/applications/' + id),
    getApplicationContacts: async (id) => getRequest(`/api/applications/${id}/contacts`),
    toggleTodo: async (id, toggleState) => putRequest('/api/todos/' + id, { completed: toggleState }),
    addTodo: async (todo, applicationID) => postRequest('/api/todos', { todo, applicationID }),
    deleteTodo: async (todoID, applicationID) => deleteRequest('/api/todos/' + todoID + '/' + applicationID),
    updateTodo: async (todo) => putRequest('/api/todos/' + todo._id, todo),
    updateApplication: async (id, body) => putRequest('/api/applications/' + id, body),
    updateContact: async (id, body) => putRequest('/api/contacts/' + id, body),
    deleteContact: async (id, applicationID) => deleteRequest('/api/contacts/' + id),
    updateResume: async (id, body) => putRequest('/api/resumes/' + id, body),
    deleteResume: async (id, applicationID) => deleteRequest('/api/resumes/' + id + '/' + applicationID),
    associateContact: async (applicationID, contactID, itemAction) =>
        putRequest(`/api/applications/associateItem/${applicationID}`, {
            itemType: 'contacts',
            itemID: contactID,
            itemAction,
        }),
};
