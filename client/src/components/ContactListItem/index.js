import React from 'react';

import PersonIcon from '@material-ui/icons/Person';
import AssetListItem from '../AssetListItem';

const ContactListItem = (props) => {
    const { contact, viewContact } = props;
    const { name, roleTitle } = contact;

    const viewItem = () => {
        viewContact(contact);
    };

    return (
        <AssetListItem
            primary={name}
            secondary={roleTitle}
            icon={<PersonIcon />}
            deleteDialogDetails={{ text: 'Remove associated contact?' }}
            viewItem={Boolean(viewContact) ? viewItem : ''}
            asset={contact}
            {...props}
        />
    );
};

export default ContactListItem;
