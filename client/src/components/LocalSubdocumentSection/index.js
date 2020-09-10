import React, { useState, useEffect } from 'react';
import { Grid, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddButton from '../AddButton';
import AssetListItem from '../AssetListItem'
import { useGlobalStore } from '../GlobalStore';

const LocalSubdocumentSection = (props) => {
    // THIS IS IN THE FORMAT OF FUTURE COMPONENT LOCAL SUBDOCUMENT ARRAY
    const { items, addItem, removeItem, updateItem, details } = props;
    // Details is an object, with format
    // { listItem: {primary, secondary, icon}, name, newItemVals, viewItemVals }

    const [viewItemOpen, ]

    // const [contactsChooserOpen, setContactsChooserOpen] = useState(false);
    // const [contactNewOpen, setContactNewOpen] = useState(false);
    // const [contactViewOpen, setContactViewOpen] = useState(false);
    // const [viewContactItem, setViewContactItem] = useState({});
    // const [editContactItem, setEditContactItem] = useState({});
    // const [, dispatch, { processServerResponse, API }] = useGlobalStore();

    useEffect(() => {
        console.log('items have changed');
    }, [items]);



    return (
        <Grid container direction="column">
            <List dense>
                {items.map((item, index) => (
                    <OfferListItem
                        key={offer._id}
                        handleRemove={applicationParent ?  : ''}
                        viewContact={viewContact}
                        contact={contact}
                        avatarClassName={avatarClasses[colours[index % colours.length]]}
                    />
                    <AssetListItem
            primary={item[details.listItem.primary]}
            secondary={item[details.listItem.secondary]}
            icon={details.listItem.icon}
            deleteDialogDetails={{ text: `Delete ${details.listItem.name}?` }}
            viewItem={Boolean(viewContact) ? viewItem : ''}
            asset={item}
            {...props}
        />
                ))}
            </List>
            {/* <Button onClick={() => setResumesChooserOpen(true)}>Add Resume</Button> */}
            <AddButton onClick={handleAdd} pageAdd={! Boolean(applicationParent)} />
            <ContactChooser open={contactsChooserOpen} onClose={saveContact} />
            <ContactNew
                open={contactNewOpen}
                saveContact={saveContact}
                existingContact={editContactItem}
                deleteContact={deleteContact}
            />
            <ContactViewDialog
                open={contactViewOpen}
                onClose={() => setContactViewOpen(false)}
                contact={viewContactItem}
                deleteContact={deleteContact}
                handleEdit={editContact}
                handleDissociate={applicationParent ? handleDissociateContact : null}
            />
        </Grid>
    );
};

export default OffersSection;
