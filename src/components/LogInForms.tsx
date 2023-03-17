import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {login, updateUser} from "../Api"   ;
import {IonAlert, IonInput, IonItem, IonLabel, IonNote} from "@ionic/react";
import {LoginData, RegisterData} from "../interfaces" ;

type  StateType = {
    id: number;
    status: boolean
}

const LogInForms: React.FC = () => {

    let history = useHistory();

    const [showAlert, setShowAlert] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState<boolean>();
    const [activo, setActivo] = useState<RegisterData>({
        status: true,
    });
    const [formData, setFormData] = useState<LoginData>({
        correo: "", pass: ""
    });

    const validateEmail = (email: string) => {
        return email.match(
            /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        );
    };

    const validate = (ev: Event) => {
        const value = (ev.target as HTMLInputElement).value;
        setIsValid(undefined);
        if (value === '') return;
        validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);
    };

    const markTouched = () => {
        setIsTouched(true);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const data = await login(formData);

        if (data) {
            setActivo({status: true});
            await updateUser(data.data.data.user_id, activo)
            const state: StateType = {id: data.data.data.user_id, status: true};
            history.push({
                pathname: '/chat-online/',
                state: state
            });
            localStorage.setItem("token", data.data.token)
            setFormData({correo: '', pass: ''})
        }
    }

    return (<>
        <div className={"flex w-full h-screen"}>
            <div className={"w-full flex items-center justify-center lg:w-1/2"}>
                <div
                    className='w-11/12 max-w-[600px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100 max-sm:border-0'>
                    <div className='mt-8'>
                        <div className={"pb-10"}>
                            <h1 className={"text-4xl text-center font-bold"}>Welcome</h1>
                            <h2 className={"text-center text-lg"}>Enter your credentials</h2>
                        </div>
                        <div className='flex flex-col'>
                            <IonItem
                                className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}>
                                <IonLabel position={"floating"}> Email </IonLabel>
                                <IonInput type="email" maxlength={25} onIonInput={(event) => validate(event)}
                                          onIonBlur={() => markTouched()} value={formData.correo}
                                          onIonChange={(event) => setFormData({
                                              ...formData,
                                              correo: event.detail.value != undefined ? event.detail.value : ""
                                          })}></IonInput>
                                <IonNote slot="helper">Enter a valid email</IonNote>
                                {isSubmitted && formData.correo.trim() === "" &&
                                    <IonNote slot="error">Invalid email</IonNote>
                                }
                            </IonItem>
                        </div>
                        <div className='flex flex-col mt-4'>
                            <IonItem>
                                <IonLabel position={"floating"}>Password</IonLabel>
                                <IonInput type="password" value={formData.pass} onIonChange={(event) => setFormData({
                                    ...formData,
                                    pass: event.detail.value != undefined ? event.detail.value : ""
                                })}></IonInput>
                                <IonNote slot="helper">Enter your password</IonNote>
                            </IonItem>
                        </div>
                        <div className='mt-8 flex flex-col gap-y-4'>
                            <button onClick={(event) => handleSubmit(event)}
                                    className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-4 bg-gradient-to-r from-red-500 to-red-500 rounded-xl text-white font-bold text-lg'>Sign
                                in
                                <IonAlert
                                    isOpen={showAlert}
                                    onDidDismiss={() => setShowAlert(false)}
                                    header={'Credenciales Incorrectas'}
                                    message={'Ingresa las credenciales correctas'}
                                    buttons={['OK']}
                                />
                            </button>
                        </div>
                        <div className={"mt-3 flex flex-col gap-y-4"}>
                            <button
                                className='flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-4 rounded-xl text-gray-700 font-semibold text-lg border-2 border-gray-100 bg-gray-50'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z"
                                        fill="#EA4335"/>
                                    <path
                                        d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z"
                                        fill="#34A853"/>
                                    <path
                                        d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z"
                                        fill="#4A90E2"/>
                                    <path
                                        d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909  11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z"
                                        fill="#FBBC05"/>
                                </svg>
                                Google
                            </button>
                        </div>
                        <div className='mt-8 flex justify-center items-center'>
                            <p className='font-medium text-base'>Don't have an account ?</p>
                            <a href="/register">
                                <button
                                    className='ml-2 font-medium text-base text-violet-500'>Sign up
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={"hidden lg:flex h-full bg-no-repeat bg-[length:700px_700px] bg-center w-1/2 items-center justify-center bg-[url('/public/assets/img_login.svg')]"}>
            </div>
        </div>
    </>);
};

export default LogInForms;