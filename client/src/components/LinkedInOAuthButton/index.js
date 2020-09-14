import React, { useEffect } from 'react';
import LinkedInButtonImage from './linkedinbutton.png';
import Button from '@material-ui/core/Button';

const API_URL = window.location.protocol + '//' + window.location.host.replace('localhost:3000', 'localhost:3001');

let oAuthWindow;
let oAuthPending = false;

function OAuth({ loginComplete, ...rest }) {
    useEffect(() => {
        window.addEventListener(
            'message',
            function (event) {
                if (
                    !(
                        event &&
                        event.data &&
                        typeof event.data === 'string' &&
                        event.data.substr(0, 1) === '{' &&
                        event.data.substr(-1, 1) === '}'
                    )
                )
                    return;

                const loginData = JSON.parse(event.data);
                if (oAuthWindow) oAuthWindow.close();
                if (loginComplete) loginComplete(loginData);
            },
            false
        );
        //eslint-disable-next-line
    }, []);

    function openOAuth() {
        if (oAuthPending) return;

        const width = 600,
            height = 600;
        const left = window.innerWidth / 2 - width / 2;
        const top = window.innerHeight / 2 - height / 2;
        const url = `${API_URL}/oauth/linkedin`;
        oAuthWindow = window.open(
            url,
            '',
            `toolbar=no, location=no, directories=no, status=no, menubar=no, 
          scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
          height=${height}, top=${top}, left=${left}`
        );

        oAuthPending = true;
        // monitor popup
        checkPopup();
    }

    function checkPopup() {
        const check = setInterval(() => {
            if (!oAuthWindow || oAuthWindow.closed || oAuthWindow.closed === undefined) {
                clearInterval(check);
                oAuthPending = false;
            }
        }, 1000);
    }

    return (
        <Button
            {...rest}
            style={{ verticalAlign: 'middle' }}
            onClick={() => openOAuth()}
            color="primary"
            aria-label="login with linkedin"
        >
            <img src={LinkedInButtonImage} style={{ width: '200px', height: 'auto' }} />
        </Button>
    );
}

export default OAuth;
