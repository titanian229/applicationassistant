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
    getResumes: async () => getRequest('/api/resumes'),
    getContacts: async () => getRequest('/api/contacts'),
};
