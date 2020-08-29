const getRequest = async (url) => {
    // let ret = await fetch(url)
    // console.log(ret)
    // ret = await ret.json()
    // console.log(ret)
    return fetch(url)
        .then((res) => res.json())
        .catch((err) => console.error(err));
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
};
