const changeHandler = (values, setValues) => (prop, type = 'text') => {
    switch (type) {
        case 'text':
            return (event) => setValues({ ...values, [prop]: event.target.value });
        case 'date':
            return (date) => setValues({ ...values, [prop]: date });
        case 'check':
            return (event) => setValues({ ...values, [prop]: event.target.checked });
        case 'select':
            return (event) => setValues({ ...values, [prop]: event.target.value });
        default:
            console.log('Handle change handler had no case');
            break;
    }
};

export default changeHandler;
