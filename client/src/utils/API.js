import axios from 'axios';

axios.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const originalRequest = error.config;
        let refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            return axios.post(`/auth/refresh_token`, { refreshToken: refreshToken }).then((res) => {
                if (res.status === 200) {
                    localStorage.setItem('accessToken', res.data.accessToken);
                    console.log('Access token refreshed!');
                    return axios(originalRequest);
                }
            });
        }
        return Promise.reject(error);
    }
);

const getRequest = async (url) => {
    return axios
        .get(url, {
            method: 'get',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                // authorization: localStorage.accessToken ? `Bearer ${localStorage.accessToken}` : '',
            },
        })
        .then((res) => res.data)
        .catch((err) => {
            console.log(err);

            if (err.response) return err.response.data;
        });
};

const putRequest = async (url, body) => {
    return axios
        .put(url, body, {
            method: 'put',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                // authorization: localStorage.accessToken ? `Bearer ${localStorage.accessToken}` : '',
            },
            // body: JSON.stringify(body),
        })
        .then((result) => result.data)
        .catch((err) => {
            console.log(err);

            if (err.response) return err.response.data;
        });
};

const postRequest = async (url, body) => {
    return axios
        .post(url, body, {
            method: 'post',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                // authorization: localStorage.accessToken ? `Bearer ${localStorage.accessToken}` : '',
            },
            // body: JSON.stringify(body),
        })
        .then((result) => result.data)
        .catch((err) => {
            console.log(err);

            if (err.response) return err.response.data;
        });
};

const deleteRequest = async (url) => {
    return axios
        .delete(url, {
            method: 'delete',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                // authorization: localStorage.accessToken ? `Bearer ${localStorage.accessToken}` : '',
            },
        })
        .then((result) => result.data)
        .catch((err) => {
            console.log(err);

            if (err.response) return err.response.data;
        });
};

export default {
    post: async (url, body) => {
        return axios
            .post(url, body, {
                method: 'post',
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    // authorization: localStorage.accessToken ? `Bearer ${localStorage.accessToken}` : '',
                },
                // body: JSON.stringify(body),
            })
            .then((result) => result.data)
            .catch((err) => {
                console.log(err);

                if (err.response) return err.response.data;
            });
    },
    put: async (url, body) => putRequest(url, body),

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
    // toggleTodo: async (id, toggleState) => putRequest('/api/todos/' + id, { completed: toggleState }),
    updateTodo: async (todo) => putRequest('/api/todos/' + todo._id, todo),
    deleteTodo: async (todoID, applicationID) => deleteRequest('/api/todos/' + todoID + '/' + applicationID),
    checkReminders: async () => getRequest('/api/todos/reminders'),

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
    checkAuthenticated: async () => getRequest('/authentication'),
    logout: async () => postRequest('/logout', {}),
};
