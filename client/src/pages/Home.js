import React from 'react';
import { Button } from '@material-ui/core';
import { useGlobalStore } from '../components/GlobalStore';
const Application = () => {
    const [, dispatch] = useGlobalStore();
    return (
        <div>
            <Button
                onClick={() => {
                    dispatch({ do: 'displayMessage', message: { text: 'Testing yay' } });
                }}
            >
                Message
            </Button>
        </div>
    );
};

export default Application;
