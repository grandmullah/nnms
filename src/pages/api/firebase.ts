
import {initializeApp,cert, getApps, } from "firebase-admin/app";
const serviceAccount:string = require('./collins2-cd213-firebase-adminsdk-y50vm-62e28d6bea.json');

let App: any | undefined
if ( !getApps().length ) {

    App  = initializeApp({
        credential: cert(serviceAccount),
        databaseURL:'https://collins2-cd213-default-rtdb.firebaseio.com/'
    })
    
    
 }
 export  default App
