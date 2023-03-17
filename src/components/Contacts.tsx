import React, {useEffect, useState} from 'react';
import avatar from '../assets/img/avatar.png'
import {
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    IonBadge, IonSearchbar, IonPage
} from "@ionic/react";
import {findUser} from "../Api";
import {getId} from "../interfaces" ;
import {useHistory} from "react-router-dom";

type StateType = {
    name: string;
    id1: number
    id2: number;
}

const Contacts: React.FC<getId> = (props) => {

    let history = useHistory();

    let [users, setUsers] = useState([])
    let [results, setResults] = useState([])

    const datos = async () => {
        const data = await findUser();
        setUsers(data)
        setResults(data)
    }

    useEffect(() => {
        datos()
    }, []);

    const handleChange = (ev: Event) => {
        let query = "";
        const target = ev.target as HTMLIonSearchbarElement;
        if (target) query = target.value!.toLowerCase();
        setResults(users.filter((object: any) => object.nombre.toLowerCase().indexOf(query) > -1));
    }

    const handleSubmit = (name: string, id2: number) => {
        const state: StateType = {name: name, id1: props.id, id2: id2};
        history.push({
            pathname: '/chat/',
            state: state
        });
    }

    return (<>
            <IonPage>
                <div className={"mt-5"}>
                    <IonSearchbar class={"ion-no-padding"} color={"light"} debounce={1000}
                                  onIonChange={(ev) => handleChange(ev)}></IonSearchbar>
                </div>
                <IonContent>
                    <IonList lines={"none"}>
                        {results.filter((user: any) => user.user_id !== props.id)
                            .map((objects: any) =>
                                <IonItem onClick={() => handleSubmit(objects.nombre, objects.user_id)}
                                         key={objects.user_id}>
                                    <IonAvatar slot={"start"}>
                                        <img src={avatar} alt=""/>
                                    </IonAvatar>
                                    <IonLabel>
                                        <h2>{objects.nombre}</h2>
                                        <h3>{objects.apellido_p}</h3>
                                    </IonLabel>
                                    <IonBadge slot={"end"} className={"rounded-full p-2"} color={"danger"}>
                                        {objects.status === props.status ? "Online" : ""}
                                    </IonBadge>
                                </IonItem>
                            )}
                    </IonList>
                </IonContent>
            </IonPage>
        </>
    );
};

export default Contacts;