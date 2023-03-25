import React from 'react';
import LogInForms from "../components/LogInForms";
import {
    IonContent,
    IonPage,
} from "@ionic/react";

const LogIn: React.FC = () => {
    return (
        <IonPage>
             <IonContent>
                <LogInForms/>
            </IonContent>
        </IonPage>
    );
};

export default LogIn;