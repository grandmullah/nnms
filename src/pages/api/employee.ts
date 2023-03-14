// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { auth } from 'firebase-admin'
import App from './firebase'



type Data ={ avatar: string; name: string; job: string; email: string; phone: string }

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
 
    const jj: Data[] = []
    auth(App).listUsers(1000,)
    .then((listUsersResult) => {
      listUsersResult.users.forEach((userRecord) => {
          //  console.log(userRecord.customClaims?.role)
         let user :Data = {
          avatar:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
          name:userRecord.displayName || '',
          job:userRecord.customClaims?.role || '',
          email:userRecord.email || '',
          phone:userRecord.phoneNumber || ''
         }
         jj.push(user)
      });
      
    }).then(()=> {
      return res.status(200).json({
        jj
      })
    })

    .catch((error) => {
      console.log('Error listing users:', error);
      return res.send(400)
    });
  
  

 
}
