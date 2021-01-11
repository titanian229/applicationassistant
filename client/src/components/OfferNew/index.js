import React from 'react';
import {
    Button,
    Grid,
    FormGroup,
    FormControlLabel,
    Switch,
} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import InputField from '../InputField';
import { useGlobalStore } from '../GlobalStore';

const OfferNew = (props) => {
    const { saveOffer, offerValues, handleChange } = props;
    const [, , { sendMessage }] = useGlobalStore();

    const handleSave = () => {
        if (offerValues.date === null) {
            sendMessage('Offer requires a date', { variant: 'error', key: 'missingdate' });
            return;
        }
        saveOffer(offerValues);
    };

    const handleCancel = () => saveOffer();

    return (
        <>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    margin="normal"
                    id="offer-date-picker"
                    label="Offer Date"
                    format="dd/MM/yyyy"
                    value={offerValues.date}
                    onChange={handleChange('date', 'date')}
                    inputVariant="outlined"
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </MuiPickersUtilsProvider>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            checked={offerValues.accepted}
                            onChange={handleChange('accepted', 'check')}
                            name="Accepted?"
                        />
                    }
                    label="Accepted"
                />
            </FormGroup>
 
            <InputField type="number" name="salary" label="Salary" {...{ values: offerValues, handleChange }} />
            <InputField multiline rows={3} name="notes" label="Notes" {...{ values: offerValues, handleChange }} />
            <Grid container justify="center">
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </Grid>
        </>
    );
};

export default OfferNew;
