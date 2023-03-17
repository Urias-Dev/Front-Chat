import React, {useEffect, useState} from 'react' ;
import avatar from '../assets/img/avatar.png'
import {io} from 'socket.io-client'
import {
    IonFooter,
    IonAvatar,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonRow,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonInput,
    IonIcon,
    IonPage,
    IonFabButton,
} from "@ionic/react";


import {sendOutline} from "ionicons/icons" ;
import {Message} from "../interfaces"  ;
import {useLocation} from 'react-router-dom';
import {findChat, getChatId, sendMessage} from "../Api";

type  StateType = {
    name: string;
    id1: number;
    id2: number;
}

const Conversation: React.FC = () => {

    const socket = io('http://localhost:3000');

    const location = useLocation<StateType>();
    const name = location.state?.name;
    const id1 = location.state?.id1;
    const id2 = location.state?.id2;

    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState("")
    const [fecha, setFecha] = useState("")

    const datos = async () => {

        findChat(id1, id2).then(response => {
            setMessages(response.data)
        })
    }

    useEffect(() => {
        datos();
        const receiveMessage = (message: Message) => {
            findChat(id1, id2).then(response => {
                setMessages([...response.data])
            })
        };

        socket.on('message', receiveMessage)

        return () => {
            socket.off('message', receiveMessage)
            socket.off('disconnect')
        }

    }, [])

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const currentDate = new Date();
        const currentDateFormatted = currentDate.toLocaleDateString('en-US');
        const ChatId = await getChatId(id1, id2)

        const newMessage: Message = {
            contenido: message,
            id_usuario_env: id1,
            id_conversacion: ChatId,
            fecha: currentDateFormatted
        }
        sendMessage(newMessage).then(response => {
                socket.emit('message', newMessage.contenido)
                setMessage("")
            }
        )
    }
    return (<>
            <IonPage>
                <IonHeader>
                    <IonToolbar color={"danger"}>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref={"/chat-online/"}/>
                        </IonButtons>
                        <IonAvatar slot={"start"}>
                            <img className={"p-2"} src={avatar} alt=""/>
                        </IonAvatar>
                        <div>
                            <IonTitle>{name}</IonTitle>
                            <h2 className="ml-5"> Online </h2>
                        </div>
                    </IonToolbar>
                </IonHeader>
                <IonContent scrollEvents={true} color={"light"}>
                    <IonGrid>
                        {messages.map((object, index) => (
                            <IonRow key={index}>
                                <IonCol size={"8"} offset={object.id_usuario_env === id1 ? "4" : "0"}
                                        className={`p-2 border rounded-2xl ${object.id_usuario_env === id1 ? "bg-gradient-to-r from-orange-500 to-green-500 mt-4 whitespace-pre-wrap text-white" : "bg-gradient-to-r from-pink-500 to-purple-500 mt-4 whitespace-pre-wrap text-white"}`}>
                                    <div className={"flex justify-start"}>
                                        <span>{object.contenido}</span>
                                    </div>
                                    <div className={"flex justify-end"}><br/>
                                        <span>{object.fecha}</span>
                                    </div>
                                </IonCol>
                            </IonRow>
                        ))}
                    </IonGrid>
                </IonContent>
                <IonFooter class={"ion-no-border"} color={"light"}>
                    <form onSubmit={handleSubmit}>
                        <IonToolbar color={"light"}>
                            <IonInput name={"message"}
                                      className={"border border-red-500 rounded-full"}
                                      value={message}
                                      onIonChange={(event) => setMessage(event.detail.value != undefined ? event.detail.value : "")}
                                      placeholder="message" class={"ion-text-center"}></IonInput>
                            <button slot={"end"} type={"submit"} onClick={(e) => handleSubmit(e)}>
                                <IonFabButton size={"small"} color={"danger"}>
                                    <IonIcon icon={sendOutline}></IonIcon>
                                </IonFabButton>
                            </button>
                        </IonToolbar>
                    </form>
                </IonFooter>
            </IonPage>
        </>
    );
};

export default Conversation;
