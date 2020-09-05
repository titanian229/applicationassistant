import React from 'react';
import DescriptionIcon from '@material-ui/icons/DescriptionTwoTone';
import AssetListItem from '../AssetListItem';

const ResumeListItem = (props) => {
    const { resume, viewResume } = props;
    const { name, notes } = resume

    const viewItem = () => {
        viewResume(resume);
    };

    return (
        <AssetListItem
            primary={name}
            secondary={notes}
            icon={<DescriptionIcon />}
            deleteDialogDetails={{ text: 'Remove associated resume?' }}
            viewItem={Boolean(viewResume) ? viewItem : ''}
            asset={resume}
            {...props}
        />
    );
};

export default ResumeListItem;
