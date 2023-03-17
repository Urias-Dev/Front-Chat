import React from 'react';
import {
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonRefresher,
    IonRefresherContent,
    IonPage,
    RefresherEventDetail,
} from "@ionic/react";

import RegisterForms from "../components/RegisterForms";

const Register: React.FC = () => {

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        setTimeout(() => {
            event.detail.complete();
        }, 2000);
    }

    return (<>
            <IonPage>
                <IonHeader class="ion-no-border">
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="login"/>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent scrollEvents={false}>
                    <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                        <IonRefresherContent refreshingSpinner="bubbles">
                        </IonRefresherContent>
                    </IonRefresher>
                    <div className={" w-full h-screen"}>
                        <div className={"w-full flex items-center justify-center   max-sm:h-4/5 "}>
                            <RegisterForms/>
                        </div>
                    </div>
                </IonContent>
            </IonPage>
        </>
    );
};

export default Register;