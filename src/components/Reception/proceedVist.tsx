import { TextInput, Button, Group } from '@mantine/core';
import { openModal, closeAllModals } from '@mantine/modals';
import { proceed } from './search';
import { DocumentReference, getFirestore, getDoc } from "firebase/firestore";
import {app} from '../../firebase'
const db = getFirestore(app)
import { doc, updateDoc } from "firebase/firestore";
import React from 'react';
export function Proceed({name,user,hospital}:proceed) {
    const [state, setSate] =  React.useState(false)
    React.useEffect(()=>{
        const fetchData = async () => {
            const pRef:DocumentReference = doc(db, "patients", user);
            const docSnap = await getDoc(pRef);
            let st:boolean  = (docSnap.data()?.state?.active) || false
            setSate(st)
        }

        fetchData()
    })

  return (
    <Group position="center">
        {state ? <Button disabled variant="white" color="gray">already active</Button> : 
      <Button
        onClick={() => {
          openModal({
            title: 'Type in the name to proceed ',
            children: (
              <CK name={name} user={user} hospital={hospital}/>
            ),
          });
        }}
      >
        proceed visit
      </Button>
    }
    </Group>
  );

  
}





const CK = ({name,user,hospital}:proceed) => {
    const [value, setValue] = React.useState('');
    const proceedVisit = async () => {
        console.log(value)
        if(value === name){
            const pRef:DocumentReference = doc(db, "patients", user);
            const docSnap = await getDoc(pRef);
            // let gg:Array<string> =   (docSnap.data()?.access)
            // let gp = [...gg,hospital]
            // // Set the "capital" field of the city 'DC'
            await updateDoc(pRef, {
             state:{active:true,hospital:hospital}
            });
            closeAllModals()
                console.log('hapa', user)
         }else{
            console.log('wrong number')
         }
    } 
    return (
        <>
        <Group grow >
        <TextInput label="patients  first name " value={value} onChange={(event) => setValue(event.currentTarget.value)} placeholder={name} data-autofocus />

        </Group>
        <Button fullWidth onClick={proceedVisit} mt="md">
        Submit
        </Button>
        </>

    )
}