import React, {useEffect, useState} from 'react' ;
import {
    IonAvatar, IonButtons,
    IonContent, IonFabButton, IonFooter,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel, IonList, IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react"  ;

 import  avatar  from     '../assets/img/avatar.png'
 import {createOutline, logOutOutline, sendOutline} from "ionicons/icons"   ;
import {useHistory} from "react-router-dom";
import {createUser, finUserById, updateUser} from "../Api";
import {getId, RegisterData} from "../interfaces";


       const  Profile  : React.FC  <getId >  = ({user_id  }) =>        {




           const [data,   setData   ] = useState<RegisterData  > (  {
               user_id:  '',
               nombre: '',
               apellido_p: '',
               correo: '',
             });




                  let   navigate  =  useHistory    ( ) ;

              const   handleSubmit    =()   => {
                       localStorage.removeItem( 'token'       )
                    navigate.push('/login'  )
                  }

                const   getData  =     ()    =>    {


                    finUserById ( user_id  )  .then    (response      =>   {
                        setData    (  {user_id: response.data.data.user_id, nombre : response. data.data.nombre  , apellido_p:   response.data.data.apellido_p   ,  correo:  response.data.data.correo     }   )

                  }   )
              }


                 useEffect(() =>      {
                      getData  ();
                     }   ,   []  )


           const   update  =   (event : any )  => {
               event.preventDefault();


                updateUser   ( user_id,  data     )

                   .then(response =>   {
                       console.log(response.data);
                   })
                   .catch(error => {
                       console.log(error);
                   } );
           }



           return  (< >

                 <IonPage>


                   <IonContent >
                     <div   className={"m-10 " } >
                         <IonToolbar  >
                            <div  className ={"flex  ion-justify-content-center  "    } >
                                <  IonAvatar  >
                                      <img   src={  avatar    }      alt=""/>
                                  </IonAvatar >
                            </div>
                         </IonToolbar>
                        </div>
                       <div   className ={ "m-5"  }   >
                           <form  >






                               <IonItem  lines={  "none" }      >
                                    <IonLabel position={"fixed"     }     className={"max-sm:text-center  "  }  >    Name:     </IonLabel >
                                     <IonInput  type="text"    maxlength={25 } value={ data.nombre    }    onIonChange ={(event) => setData ({...data,  nombre: event.detail.value != undefined ? event.detail.value : ""})} > </IonInput>
                                      <IonIcon icon={createOutline  }></IonIcon>
                               </IonItem>

                            <IonItem   lines={"none"}  >
                              <IonLabel position={"fixed"      }  className={"max-sm:text-center   "}> Last Name : </IonLabel>
                              <IonInput   type="text"    maxlength={ 25  }    value ={  data.apellido_p }   onIonChange  ={(event) => setData ({... data,  apellido_p: event.detail.value != undefined ? event.detail.value : ""})} > </IonInput>
                                <IonIcon icon={createOutline  }></IonIcon>

                            </IonItem>

                            <IonItem  lines={ "none"}  >

                              <IonLabel position={"fixed"   }  className={"max-sm:text-center   " }>Email: </IonLabel>
                              <IonInput   type="email"      maxlength={25 }  value ={data.correo   }     onIonChange ={(event) => setData({ ...data,  correo : event.detail.value != undefined ? event.detail.value : ""})}>  </IonInput>
                              <IonIcon icon={createOutline   }> </IonIcon>
                          </IonItem >

                             </form   >
                           <div className={"flex   justify-center "} >

                             <button type={"submit"  } onClick={update }
                                    className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4   bg-gradient-to-r from-cyan-500 to-blue-500  rounded-xl text-white font-bold text-lg'> Update
                           </button>

                           </div>

                       </div>

             </IonContent   >

                <IonFooter class = {"ion-no-border" }>
                    <div className= { "flex ion-justify-content-end  mb-10 mr-3  "}  >
                         <button   onClick={() => handleSubmit () } >
                            <IonFabButton size={"small"} color={ "primary" }  >
                                <IonIcon  icon= {logOutOutline   }  ></IonIcon>
                            </IonFabButton>
                        </button>
                    </div>
                </IonFooter>

            </IonPage >


        </>
    );
};

export default Profile;