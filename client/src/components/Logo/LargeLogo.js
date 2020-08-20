import React from 'react';
import { Typography } from '@material-ui/core';

const LargeLogo = (props) => {
    return (
        <div className={props.className}>
            <Typography variant="h6">Application Assistant</Typography>
        </div>
    );
};

export default LargeLogo;
