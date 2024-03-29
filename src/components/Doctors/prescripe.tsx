import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button,Select, Space, TextInput, Checkbox,  Box, NumberInput, Textarea} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { getDatabase,ref, set,push } from "firebase/database";
import {app} from '../../firebase'
import { BioData, user } from '@/app/features/triageSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
const database = getDatabase(app);
interface clProps{
  closing:() =>void
  user:user
}
export function Prescription({user,}:BioData) {
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState<string | null>(null);
  const closing = () => {
   close()
 }

  return (
    <>
      <Modal  size='xl'  opened={opened} onClose={close} title="precription" centered>
        <Group spacing="xl" grow > 
            <Select 
            label="Action"
            placeholder="Pick one"value={value} onChange={setValue} 
            data={[
                 { value: 'Admit', label: 'Admit ' },
                 { value: 'medicate', label: 'provide Medication and discharge ' }
            ]} />
               
        </Group>
        <Space h="xl" />
        <Space h="xl" />
        <Space h="xl" />
     
        <div style={{ marginTop: '40px', marginBottom: '10px', marginRight: '20px'}} >
          
          {value === 'Admit' &&  <Admit user={user}  closing={closing} /> }
          {value === 'medicate' &&  <PrescriptionDetails /> }

          
          
        </div>

      </Modal>

      <Group position="center">
        <Button onClick={open}>provide prescription</Button>
      </Group>
    </>
  );
}


function Admit({closing,user}:clProps) {
  const {name,hospital} =  useSelector((state:RootState) => state.Auth)
    const form = useForm({
      initialValues: {
        bedNumber: '',
        underCareOf:'',
        Reviews:''
       
      },
  
    });
  
    return (
      <Group  grow>
        <form onSubmit={form.onSubmit((values) => {
          try {
            const postComplainRef = ref(database, `Records/${user.bio.id}/medication`);
            const newPostRef = push(postComplainRef);
            set(newPostRef, {...values,state:'Admitted', hospital:hospital , by:name ,timestamp:Date.now()});
            closing()
          } catch (error) {
            console.log(error)
          }
        })}>
          <NumberInput
            hideControls
            withAsterisk
            label="Bed Number "
            placeholder="bed Number"
            {...form.getInputProps('bedNumber')}
          />
           <Select 
            label="under care of  "
            placeholder="Pick a nurse"
            data={[
                 { value: '002 Abby ', label: 'Abigael Chege' },
                 { value: '001 Joy ', label: 'Joy what' }

            ]} 
            {...form.getInputProps('underCareOf')}
            />
            <Textarea
              placeholder="Your Review"
              label="Your notes"
              withAsterisk
              {...form.getInputProps('Reviews')}
            />
            <Space h="xl" />
  
  
          <Group grow >
            <Button type="submit">Save</Button>
          </Group>
        </form>
      </Group>
    );
  }

  interface PrescriptionDetailsProps {
    // Add any props that you need here
  }
  
  const PrescriptionDetails: React.FC<PrescriptionDetailsProps> = () => {
    const [medicationName, setMedicationName] = useState('');
    const [dosage, setDosage] = useState('');
    const [frequency, setFrequency] = useState('');
    const [duration, setDuration] = useState('');
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Handle prescription submission logic
    };
  
    return (
      <Group>
        <div style={{ padding: '20px', backgroundColor: '#fff' }}>
        <h1 style={{ marginBottom: '20px', fontSize: '28px', fontWeight: 'bold' }}>Prescription Details</h1>
        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Medication Name:
            <TextInput style={{ marginLeft: '10px' }} type="text" value={medicationName} onChange={(e) => setMedicationName(e.target.value)} />
          </label>
          <br />
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Dosage:
            <TextInput style={{ marginLeft: '10px' }} type="text" value={dosage} onChange={(e) => setDosage(e.target.value)} />
          </label>
          <br />
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Frequency:
            <TextInput style={{ marginLeft: '10px' }} type="text" value={frequency} onChange={(e) => setFrequency(e.target.value)} />
          </label>
          <br />
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Duration:
            <TextInput style={{ marginLeft: '10px' }} type="text" value={duration} onChange={(e) => setDuration(e.target.value)} />
          </label>
          <br />
          <Button type="submit">Submit</Button>
        </form>
      </div>
      </Group>
      
    );
  };