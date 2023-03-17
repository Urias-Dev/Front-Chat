import React, {useState} from 'react';
import {
    IonButton,
    IonButtons,
    IonCheckbox, IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonModal, IonTitle,
    IonToolbar
} from "@ionic/react";

import {createUser} from "../Api";
import {useHistory} from "react-router-dom";
import {RegisterData} from "../interfaces";
import Terminosycondiciones from "./terminosycondiciones";

const RegisterForms: React.FC = () => {

    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const [terminos, setTerminos] = useState(false);
    const [formData, setFormData] = useState<RegisterData>({
        nombre: '',
        apellido_p: '',
        apellido_m: '',
        pass: '',
        correo: '',
        foto: '',
        status: false,
    });

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const data = await createUser(formData);

        if (data) {
            console.log(data.data.data)
            history.push('/login')
        }
    }

    const datos = (nombre: string, Apellido_p: string, Apellido_m: string, Pass: string, Correo: string, Foto: string) => {
        console.log(nombre, Apellido_p, Apellido_m, Pass, Correo, Foto)
    }

    return (
        <div
            className='w-11/12 max-w-[950px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100 max-sm:border-0'>
            <div>
                <h1 className='text-4xl max-sm:text-2xl text-center'>Register</h1>
            </div>
            <div className='mt-8'>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col'>
                        <IonItem>
                            <IonLabel position={"floating"}>Name</IonLabel>
                            <IonInput type="text" clearInput={true} maxlength={25} value={formData.nombre}
                                      onIonChange={(event) => setFormData({
                                          ...formData,
                                          nombre: event.detail.value != undefined ? event.detail.value : ""
                                      })}></IonInput>
                        </IonItem>
                    </div>
                    <div className='flex flex-col mt-4'>
                        <IonItem>
                            <IonLabel position={"floating"}>Last Name P</IonLabel>
                            <IonInput type="text" clearInput={true} maxlength={25} value={formData.apellido_p}
                                      onIonChange={(event) => setFormData({
                                          ...formData,
                                          apellido_p: event.detail.value != undefined ? event.detail.value : ""
                                      })}></IonInput>
                        </IonItem>
                    </div>
                    <div className='flex flex-col mt-4'>
                        <IonItem>
                            <IonLabel position={"floating"}>Last Name M</IonLabel>
                            <IonInput type="text" clearInput={true} maxlength={25} value={formData.apellido_m}
                                      onIonChange={(event) => setFormData({
                                          ...formData,
                                          apellido_m: event.detail.value != undefined ? event.detail.value : ""
                                      })}></IonInput>
                        </IonItem>
                    </div>
                    <div className='flex flex-col mt-4'>
                        <IonItem>
                            <IonLabel position={"floating"}>Password</IonLabel>
                            <IonInput type="password" clearInput={true} maxlength={25} value={formData.pass}
                                      onIonChange={(event) => setFormData({
                                          ...formData,
                                          pass: event.detail.value != undefined ? event.detail.value : ""
                                      })}></IonInput>
                        </IonItem>
                    </div>
                    <div className='flex flex-col mt-4'>
                        <IonItem>
                            <IonLabel position={"floating"}>Email</IonLabel>
                            <IonInput type="text" clearInput={true} maxlength={25} value={formData.correo}
                                      onIonChange={(event) => setFormData({
                                          ...formData,
                                          correo: event.detail.value != undefined ? event.detail.value : ""
                                      })}></IonInput>
                        </IonItem>
                    </div>
                    <div className='flex flex-col mt-4'>
                        <IonItem>
                            <IonLabel position={"floating"}>Foto</IonLabel>
                            <IonInput type="text" clearInput={true} maxlength={25} value={formData.foto}
                                      onIonChange={(event) => setFormData({
                                          ...formData,
                                          foto: event.detail.value != undefined ? event.detail.value : ""
                                      })}></IonInput>
                        </IonItem>
                    </div>
                    <div className={"flex flex-col mt-4"}>
                        <IonItem>
                            <IonCheckbox onIonChange={e => setTerminos(e.detail.checked)}
                                         onClick={() => setShowModal(true)}></IonCheckbox>
                            <IonLabel className={"ml-3"}>Aceptar términos y condiciones</IonLabel>
                        </IonItem>
                    </div>
                    <div className='mt-8 flex flex-col gap-y-4'>
                        <button type={"submit"} disabled={!terminos}
                                className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-4 bg-gradient-to-r from-red-500 to-red-500 rounded-xl text-white font-bold text-lg'>Sign
                            Up
                        </button>
                        <IonModal isOpen={showModal}>
                            <IonHeader>
                                <IonToolbar>
                                    <IonTitle slot={"start"}> Terminos y condiciones </IonTitle>
                                    <IonButtons slot={"end"}>
                                        <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
                                    </IonButtons>
                                </IonToolbar>
                            </IonHeader>
                            <IonContent className={"ion-padding"}>
                                <Terminosycondiciones/>
                            </IonContent>
                        </IonModal>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForms;