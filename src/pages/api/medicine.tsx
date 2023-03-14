// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { auth , database } from 'firebase-admin'
import App from './firebase'



type Data ={ avatar: string; name: string; job: string; email: string; phone: string }

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {hospital}  = req.query

    
   
    const db = database(App);
    const ref = db.ref(`medicine/${hospital}`);
    
    // Attach an asynchronous callback to read the data at our posts reference
    ref.on('value', (snapshot) => {
     return  res.status(200).json({
        data: snapshot.val()
      })
    }, (errorObject) => {
      console.log('The read failed: ' + errorObject.name);
      return res.send(400)
    }); 
  

}
