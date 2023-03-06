import { FC, useState } from 'react';
import { Modal, } from '@mantine/core';
import { TextInput, Checkbox, Button, Group, Box,Text,Select} from '@mantine/core';
import 'dayjs/locale/es'
import { notifications } from '@mantine/notifications';
import { DatePickerInput,DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { getFirestore } from "firebase/firestore";
import {app} from '../../firebase'
const db = getFirestore(app)
import { doc, setDoc } from "firebase/firestore";
import { useSelector, } from 'react-redux' 
import { RootState } from '@/app/store';
import dayjs from 'dayjs';
import { IconCalendar, IconCheck } from '@tabler/icons';

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

  const regis = async  (values: { email: string; id: string; firstName: string; secondName: string; surname: string;  maritalStatus: string; DOB: string; tribe: string; religion: string; phoneNumber: string; nationality: string; county: string; occupation: string; address: string; kinName: string; kinRelationship: string; kinPhoneNumber: string; kinEmail: string; kinOccupation: string; kinAddress: string; }) => {
    notifications.show({
      id: 'load-data',
      loading: true,
      title: 'Loading your data',
      message: 'saving to database',
      autoClose: false,
      withCloseButton: false,
    });
   
    console.log(count)
   
    console.log(values)
   await setDoc(doc(db, "patients", values.id), {...values, access:[count.hospital], registered:Date.now(),});
   
    closing(false)
    notifications.update({
      id: 'load-data',
      color: 'teal',
      title: 'Data was loaded',
      message: 'NData saved successfullty',
      icon: <IconCheck size="1rem" />,
      autoClose: 2000,
    });
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
      surname:(value) => (/[a-zA-Z]/.test(value) ? null:  'invalid : should only contain letters' ),
      maritalStatus:(value) => (/[a-zA-Z]/.test(value) ? null:  'invalid : should only contain letters' ),
      DOB:(value) => (/[a-zA-Z0-9]/.test(value) ? null:  'invalid : should only contain letters' ),
      phoneNumber:(value) => (/[0-9]/.test(value) ? null:  'invalid : should only contain Numbers' ),
      address:(value) => (/[a-zA-Z0-9]/.test(value) ? null:  'invalid : should only contain letters' ),
      nationality:(value) => (/[a-zA-Z]/.test(value) ? null:  'invalid : should only contain letters' ),
      religion:(value) => (/[a-zA-Z]/.test(value) ? null:  'invalid : should only contain letters' ),
      tribe:(value) => (/[a-zA-Z]/.test(value) ? null:  'invalid : should only contain letters' ),
      occupation:(value) => (/[a-zA-Z]/.test(value) ? null:  'invalid : should only contain letters' ),
      kinName:(value) => (/[a-zA-Z]/.test(value) ? null:  'invalid : should only contain letters' ),
      kinRelationship:(value) => (/[a-zA-Z]/.test(value) ? null:  'invalid : should only contain letters' ),
      kinOccupation:(value) => (/[a-zA-Z]/.test(value) ? null:  'invalid : should only contain letters' ),
      kinPhoneNumber:(value) => (/[0-9]/.test(value) ? null:  'invalid : should only contain Numbers' ),

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
        <DatePickerInput
         icon={<IconCalendar size="1.1rem" stroke={1.5} />}
          valueFormat="YYYY MMM DD"
          label="Date of Birth"
          placeholder="Date input"
          maxDate={dayjs(new Date()).toDate()}
          maw={400}
          mx="auto"
          {...form.getInputProps('DOB')}
        />
        <Select
          withAsterisk
          label="Marital Status"
          placeholder="Pick one"
          data={[
            { value: 'Single', label: 'Single' },
            { value: 'Married', label: 'Married' },
            { value: 'Divorced', label: 'Divorced' },
          ]}
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
        <Select
          label="County of Residence"
          placeholder="Pick one"
          withAsterisk
          data={[
            { value: '047, Nairobi', label: 'Nairobi County' },
            { value: '028, Elgeyo-Marakwet', label: 'Elgeyo-Marakwet County' },
            { value: '001,Mombasa County ', label: 'Mombasa County' },
          ]}
          {...form.getInputProps('county')}
        />
          <TextInput
          withAsterisk
          label="Address"
          placeholder="000, Nairobi"
          {...form.getInputProps('address')}
        />
        </Group>
        <Group grow mb="md" mt="md">
        <Select
          label="Tribe"
          placeholder="tribe"
          withAsterisk
          data={[
            { value: 'Kalenjin', label: 'Kalenjin' },
            { value: 'Somali', label: 'Somali' },
            { value: 'Kikuyu', label: 'Kikuuyu' },
          ]}
          {...form.getInputProps('tribe')}
        />
        <Select
          label="Religion"
          placeholder="religion"
          withAsterisk
          data={[
            { value: 'Muslim', label: 'Muslim' },
            { value: 'Christian', label: 'Christian' },
            { value: 'Budhaa', label: 'Budhaa' },
          ]}
          {...form.getInputProps('religion')}
        />
        <Select
          label="Nationality"
          placeholder="natioanality"
          withAsterisk
          data={[
            { value: 'Kenyan', label: 'Kenyan' },
            { value: 'East Africa', label: ' East Africa commuunity' },
            { value: 'African', label: 'African' },
          ]}
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
          <Text> NEXT OF KIN </Text>
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
        </Group>
        <Group grow mb="md" mt="md">
        <TextInput
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
          placeholder="location addresss"
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