import { FC, useState } from 'react';
import { Modal, } from '@mantine/core';
import { TextInput, Checkbox, Button, Group, Box,Text,} from '@mantine/core';


import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { getFirestore } from "firebase/firestore";
import {app} from '../../firebase'
const db = getFirestore(app)
import { doc, setDoc } from "firebase/firestore";
import { useSelector, } from 'react-redux' 
import { RootState } from '@/app/store';

interface clProps{
  closing:(value:boolean) =>void
}

export function AddPatient() {
  const [opened, setOpened] = useState(false);
   

   const closing = (value:boolean) => {
      setOpened(value)
   }

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
        size="70%"
      >
        {/* Modal content */}
        <Demo  closing={closing} />
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>ADD PATIENT </Button>
      </Group>
    </>
  );
}



 

function Demo({closing}:clProps) {
  const count = useSelector((state:RootState) =>state.Auth )

  const regis = async  (values: { email: string; id: string; firstName: string; secondName: string; surname: string; age: string; maritalStatus: string; DOB: string; tribe: string; religion: string; phoneNumber: string; nationality: string; county: string; occupation: string; address: string; kinName: string; kinRelationship: string; kinPhoneNumber: string; kinEmail: string; kinOccupation: string; kinAddress: string; }) => {
  
   
    console.log(count)
   
    console.log(values)
   await setDoc(doc(db, "patients", values.id), {...values, access:[count.hospital], registered:Date.now(),});
    closing(false)
  }
  const form = useForm({
    initialValues: {
      email: '',
      id:'',
      firstName:'',
      secondName:'',
      surname:'',
      maritalStatus:'',
      DOB:'',
      tribe:'',
      religion:'',
      phoneNumber: '',
      nationality:'',
      county:'',
      occupation:'',
      address:'',
      kinName:'',
      kinRelationship:'',
      kinPhoneNumber:'',
      kinEmail:'',
      kinOccupation:'',
      kinAddress:'',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      id:(value) => (/^[A-Z0-9]+$/.test(value) ? null:  'invalid : should only contain capital letters and numbers' ),
      firstName:(value) => (/[a-zA-Z]/.test(value) ? null:  'invalid : should only contain letters' ),
      secondName:(value) => (/[a-zA-Z]/.test(value) ? null:  'invalid : should only contain letters' ),
      surname:(value) => (/[a-zA-Z]/.test(value) ? null:  'invalid : should only contain letters' )
    },
  });

  return (
    <Box>
      <form onSubmit={form.onSubmit((values) => regis(values))}>
        <Group mb="md" mt="md" >
        <TextInput
          withAsterisk
          label="Identifcation"
          placeholder="id/birth cert"
          {...form.getInputProps('id')}
        />
        </Group>
        <Group grow mb="md" mt="md">
        <TextInput
          withAsterisk
          label="First Name"
          placeholder="First  Name "
          {...form.getInputProps('firstName')}
        />
        <TextInput
          withAsterisk
          label="Second Name "
          placeholder="second name "
          {...form.getInputProps('secondName')}
        />
          <TextInput
          withAsterisk
          label="Surname"
          placeholder="surname "
          {...form.getInputProps('surname')}
        />
        </Group>
        <Group grow mb="md" mt="md">
        <TextInput
          // valueFormat="DD/MM/YYYY HH:mm:ss"
          label="Date input"
          placeholder="Date input"
          maw={400}
          mx="auto"
          {...form.getInputProps('DOB')}
        />
          <TextInput
          withAsterisk
          label="Marital Status "
          placeholder="Marital Status"
          {...form.getInputProps('maritalStatus')}
        />
        </Group>
        <Group grow mb="md" mt="md">
        <TextInput
          withAsterisk
          label="Phone Number "
          placeholder="mobile Number "
          {...form.getInputProps('phoneNumber')}
        />
        <TextInput
          withAsterisk
          label="County of Residence"
          placeholder="county"
          {...form.getInputProps('county')}
        />
          <TextInput
          withAsterisk
          label="Address"
          placeholder="address"
          {...form.getInputProps('address')}
        />
        </Group>
        <Group grow mb="md" mt="md">
        <TextInput
          withAsterisk
          label="Tribe"
          placeholder="tribe"
          {...form.getInputProps('tribe')}
        />
        <TextInput
          withAsterisk
          label="Religion"
          placeholder="religion"
          {...form.getInputProps('religion')}
        />
          <TextInput
          withAsterisk
          label="Nationality"
          placeholder="Nationality"
          {...form.getInputProps('nationality')}
        />
        </Group>
        <Group grow mb="md" mt="md">
        <TextInput
          withAsterisk
          label="Email"
          placeholder="his@email.com"
          {...form.getInputProps('email')}
        />
        <TextInput
          withAsterisk
          label="Occupation"
          placeholder="occupation"
          {...form.getInputProps('occupation')}
        />
    
        </Group>
        <Group >
          <Text> Next of Kin </Text>
        </Group>
        <Group grow mb="md" mt="md">
        <TextInput
          withAsterisk
          label="Name"
          placeholder="name"
          {...form.getInputProps('kinName')}
        />
        <TextInput
          withAsterisk
          label="Relationship"
          placeholder="relationship"
          {...form.getInputProps('kinRelationship')}
        />
          <TextInput
          withAsterisk
          label="PhoneNumber"
          placeholder="Phone Number"
          {...form.getInputProps('kinPhoneNumber')}
        />
        </Group><Group grow mb="md" mt="md">
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('kinEmail')}
        />
        <TextInput
          withAsterisk
          label="Occupation"
          placeholder="occupation"
          {...form.getInputProps('kinOccupation')}
        />
          <TextInput
          withAsterisk
          label="Address"
          placeholder="address"
          {...form.getInputProps('kinAddress')}
        />
        </Group>
        {/* <Checkbox
          mt="md"
          label="I agree to sell my privacy"
          {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        /> */}

        <Group position="right" mt="md">
          <Button type="submit" >Submit</Button>
        </Group>
      </form>
    </Box>
  );
}