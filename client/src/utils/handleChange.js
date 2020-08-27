const changeHandler = (values, setValues) => (prop, type = 'text') => {
    switch (type) {
        case 'text':
            return (event) => setValues({ ...values, [prop]: event.target.value });
            break;
        case 'date':
            return (date) => setValues({ ...values, [prop]: date });
            break;
        case 'check':
            return (event) => setValues({ ...values, [prop]: event.target.checked });
            break;
        case 'select':
            return (event) => setValues({ ...values, [prop]: event.target.value });
            break;
        default:
            console.log('Handle change handler had no case');
            break;
    }
};

export default changeHandler;
