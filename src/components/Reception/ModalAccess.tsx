import { Group, Button, Text, NumberInput, TextInput } from '@mantine/core';
import { openConfirmModal, closeAllModals, openModal } from '@mantine/modals';
import { DocumentReference, getFirestore, getDoc } from "firebase/firestore";
import {app} from '../../firebase'
const db = getFirestore(app)
import { doc, updateDoc } from "firebase/firestore";
import React from 'react';
import { accessProps } from './search';

export const  RequestAccess =({hospital,user,phoneNumber}:accessProps)=> {
    const [value, setValue] = React.useState(1080);

    const tryOTP = async() => {
        // event.preventDefault()
        console.log(value)
         if(value === 1080){
            const pRef:DocumentReference = doc(db, "patients", user);
            const docSnap = await getDoc(pRef);
            let gg:Array<string> =   (docSnap.data()?.access)
            let gp = [...gg,hospital]
            // Set the "capital" field of the city 'DC'
            await updateDoc(pRef, {
            access:gp
            });
            closeAllModals()
                // console.log('hapa', gp)
         }else{
            console.log('wrong number')
         }

    }
  return (
    <Group position="center">
      <Button
        onClick={() =>
          openConfirmModal({
            title: 'Please confirm your action',
            closeOnConfirm: false,
            labels: { confirm: 'Proceed ', cancel: 'Close ' },
            children: (
              <Text size="sm">
                This will send a One Time Password to the user Phone Number <strong>{phoneNumber}</strong> . Please
                click one of these buttons to proceed.
              </Text>
            ),
            onConfirm: () =>

              openConfirmModal({
                title: 'One Time Password',
                labels: { confirm: 'confirm', cancel: 'Back' },
                closeOnConfirm: false,
                children: (
                  <Group grow >
                    <NumberInput 
                    value={value}
                    onChange={(val:number) => setValue(val)}
                    placeholder="One Time Password"
                    label="OTP"
                    withAsterisk
                    hideControls
                     />
                    
                  </Group>
                ),
                onConfirm: tryOTP,
              }),
          })
        }
      >
        request Access
      </Button>
    </Group>
  );
}


// const OTP  =( )=>{
//     return
// }