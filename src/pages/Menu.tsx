import React, {useState} from 'react';
import {
    IonContent,
    IonHeader,
    IonLabel,
    IonSegment,
    IonSegmentButton,
    IonToolbar,
    IonTitle,
    IonPage
} from "@ionic/react";

import Profile from "../components/Profile";
import Contacts from "../components/Contacts";
import {useLocation} from 'react-router-dom';

type StateType = {
    id: number;
    status: boolean;
}

const Menu: React.FC = () => {

    const [selectedOption, setSelectedOption] = useState('contacts');

    const location = useLocation<StateType>();
    const id = location.state?.id;
    const status = location.state?.status;

    return (< >
            <IonPage>
                <IonHeader>
                    <IonToolbar color={"danger"}>
                        <IonTitle slot={"start"}>DevChat</IonTitle>
                    </IonToolbar>
                    <IonSegment color={"danger"} value={selectedOption}
                                onIonChange={e => e.detail.value && setSelectedOption(e.detail.value)}>
                        <IonSegmentButton value="contacts">
                            <IonLabel>Contacts</IonLabel>
                        </IonSegmentButton>
                        <IonSegmentButton value="profile">
                            <IonLabel>Profile</IonLabel>
                        </IonSegmentButton>
                    </IonSegment>
                </IonHeader>
                <IonContent>
                    {selectedOption === 'contacts' && <Contacts id={id} status={status}/>}
                    {selectedOption === 'profile' && <Profile id={id} status={status}/>}
                </IonContent>
            </IonPage>
        </>
    );
};

export default Menu;
