import React, { useState, useEffect } from 'react';
import { Grid, List, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddButton from '../AddButton';
import DoubleArrowOutlinedIcon from '@material-ui/icons/DoubleArrowOutlined';
import DoneAllOutlinedIcon from '@material-ui/icons/DoneAllOutlined';
// import AssetListItem from '../AssetListItem';
import OfferListItem from '../OfferListItem';
import OfferNew from '../OfferNew'

import { useGlobalStore } from '../GlobalStore';

const useStyles = makeStyles((theme) => ({
    spaceTop: {
        marginTop: theme.spacing(1),
    },
    title: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1),
    },
}));

const newOfferValues = {
    date: null,
    notes: '',
    salary: '',
    accepted: false,
};

const OfferSection = (props) => {
    const { offers, addOffer, removeOffer, updateOffer } = props;
    const [offerNewOpen, setOfferNewOpen] = useState(false);
    const [offerValues, setOfferValues] = useState(newOfferValues);
    const [, dispatch, { processServerResponse, API, formatDate, changeHandler }] = useGlobalStore();
    const handleChange = changeHandler(offerValues, setOfferValues);
    const classes = useStyles();


    const handleRemove = (offer) => () => {
        removeOffer(offer)
    };

    const handleEdit = (offer) => () => {
        setOfferValues(offer)
        setOfferNewOpen(true)
    }

    const handleAdd = () => {
        setOfferNewOpen(true)
    };

    const saveOffer = (offer) => {
        setOfferNewOpen(false);
        setOfferValues(newOfferValues);

        if (!offer) {
            return;
        }

        addOffer(offer);
    };



    return (
        <Grid container direction="column">
            <Typography className={classes.title} variant="h6" align='center'>
                Offers
            </Typography>
            <List dense>
                {offers.map((offer, index) => (
                    <OfferListItem
                        key={offer._id || index}
                        icon={offer.accepted ? <DoneAllOutlinedIcon /> : <DoubleArrowOutlinedIcon />}
                        handleRemove={handleRemove(offer)}
                        handleEdit={handleEdit(offer)}
                        {...offer}
                    />
                ))}
            </List>
            {/* <Button onClick={() => setResumesChooserOpen(true)}>Add Resume</Button> */}
            {!offerNewOpen && <AddButton onClick={handleAdd} />}
            {offerNewOpen && <OfferNew saveOffer={saveOffer} offerValues={offerValues} handleChange={handleChange} />}
        </Grid>
    );
};

export default OfferSection;
