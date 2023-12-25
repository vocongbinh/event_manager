import React from 'react';
import OrganizerProfile from '../OrganizerProfile/OrganizerProfile';
import FormHeader from '../../components/FormHeader';

const OrganizerWrapper = () => {
    return (
        <div>
            <FormHeader header="You need create your organizer profile first" />
            <OrganizerProfile />
        </div>
    );
};

export default OrganizerWrapper;
