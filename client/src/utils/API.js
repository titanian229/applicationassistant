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
    //Applications
    getApplication: async (id) => getRequest('/api/applications/' + id),
    getApplications: async () => getRequest('/api/applications'),
    getApplicationItems: async (id, itemType) => getRequest(`/api/applications/${id}/${itemType}`),
    updateApplication: async (id, body) => putRequest('/api/applications/' + id, body),
    deleteApplication: async (id) => deleteRequest('/api/applications/' + id),

    //Resumes
    getResumes: async () => getRequest('/api/resumes'),
    updateResume: async (id, body) => putRequest('/api/resumes/' + id, body),
    deleteResume: async (id) => deleteRequest('/api/resumes/' + id),

    //Contacts
    getContact: async (id) => getRequest('/api/contacts/' + id),
    getContacts: async () => getRequest('/api/contacts'),
    updateContact: async (id, body) => putRequest('/api/contacts/' + id, body),
    deleteContact: async (id) => deleteRequest('/api/contacts/' + id),

    //Interviews
    updateInterview: async (applicationID, interviewID, interview) =>
        putRequest(`/api/applications/${applicationID}/interviewsArray/${interviewID}`, interview),
    deleteInterview: async (applicationID, interviewID) =>
        deleteRequest(`/api/applications/${applicationID}/interviewsArray/${interviewID}`),

    //Todos
    getTodos: async () => getRequest('/api/todos'),
    getTodosSorted: async () => getRequest('/api/todos/sorted'),
    addTodo: async (todo, parentID) => postRequest('/api/todos', { todo, parentID }),
    toggleTodo: async (id, toggleState) => putRequest('/api/todos/' + id, { completed: toggleState }),
    updateTodo: async (todo) => putRequest('/api/todos/' + todo._id, todo),
    deleteTodo: async (todoID, applicationID) => deleteRequest('/api/todos/' + todoID + '/' + applicationID),

    //General
    associateItem: async (applicationID, itemID, itemAction, itemType) =>
        putRequest(`/api/applications/associateItem/${applicationID}`, {
            itemType,
            itemID,
            itemAction,
        }),
    updateItem: async (applicationID, item, itemType) =>
        putRequest(`/api/applications/${applicationID}/${itemType}/${item._id}`, item),
    removeItem: async (applicationID, itemID, itemType) =>
        deleteRequest(`/api/applications/${applicationID}/${itemType}/${itemID}`),
};
