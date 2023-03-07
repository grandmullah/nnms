import { Group, Button, Text, NumberInput, Box, TextInput } from '@mantine/core';
import { openConfirmModal, closeAllModals, openModal,modals } from '@mantine/modals';
import { DocumentReference, getFirestore, getDoc } from "firebase/firestore";
import {app} from '../../firebase'
const db = getFirestore(app)
import { doc, updateDoc } from "firebase/firestore";
import React from 'react';
import { accessProps } from './search';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';

export const  RequestAccess =({hospital,user,phoneNumber}:accessProps)=> {


    
  return (
    <Group position="center">
      <Button
        onClick={() =>
          modals.openConfirmModal({
            title: 'Please confirm your action',
            closeOnConfirm: false,
            labels: { confirm: 'Proceed ', cancel: 'Close ' },
            children: (
              <Text size="sm">
                This will send a One Time Password to the user Phone Number <strong>{phoneNumber}</strong> . Please
                click one of these buttons to proceed.
              </Text>
            ),
            onConfirm: () => {
              console.log('123')
              modals.open({
                title: 'One Time Password',
                children: (
                  <>
                  <Demo hospital={hospital} user={user} phoneNumber={phoneNumber}/> 
                  </>
                ),
              });
            }

          })
        }
      >
        request Access
      </Button>
    </Group>
  );
}




function Demo({hospital,user,phoneNumber}:accessProps ) {

  const tryOTP = async(value: string) => {
    notifications.show({
      id: 'load-data',
      loading: true,
      title: 'Loading your data',
      message: 'Data is being loaded wait for successfull notification',
      autoClose: false,
      withCloseButton: false,
    });
    // event.preventDefault()
    console.log(value)
     if(value == `1080`){
        const pRef:DocumentReference = doc(db, "patients", user);
        const docSnap = await getDoc(pRef);
        let gg:Array<string> = (docSnap.data()?.access)
        let gp = [...gg,hospital]
        // Set the "capital" field of the city 'DC'
        await updateDoc(pRef, {
        access:gp
        });
        closeAllModals()
        notifications.update({
          id: 'load-data',
          color: 'teal',
          title: 'Data was loaded',
          message: 'successfully updated database , you now have access',
          icon: <IconCheck size="1rem" />,
          autoClose: 2000,
        });
            // console.log('hapa', gp)
     }else{
        console.log('wrong number')
        notifications.update({
          id: 'load-data',
          title: 'Error notification',
          message: 'Hey there, your code is wrong! 🤥',
          icon: <IconX size="1rem"  color="red"/>,
          styles: (theme) => ({
            root: {
              backgroundColor: theme.colors.red,
              borderColor: theme.colors.blue[6],

              '&::before': { backgroundColor: theme.white },
            },

            title: { color: theme.white },
            description: { color: theme.white },
            closeButton: {
              color: theme.white,
              '&:hover': { backgroundColor: theme.colors.blue[7] },
            },
          }),
        })
     }

}


  const form = useForm({
    initialValues: {
      otp: '',
    },

    validate: {
      otp: (value) => (/[0-9]/.test(value) ? null : 'Invalid '),
    },
  });

  return (
    <Group grow >
      <form onSubmit={form.onSubmit((values) => tryOTP(values.otp))}>
        <NumberInput
          withAsterisk
          label="OTP"
          placeholder="One Time Password "
          hideControls
          {...form.getInputProps('otp')}
        />


        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Group>
  );
}




// const OTP  =( )=>{
//     return
// }