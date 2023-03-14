import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button } from '@mantine/core';
import { TextInput, Checkbox,  Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { getDatabase, ref, set } from "firebase/database";
import {app} from '../../firebase'
const database = getDatabase(app);
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { AuthState } from '@/app/features/authSlice';
interface clProps{
    closing:() =>void
  
  }
let count: AuthState 
export function AddMedicine() {
    count = useSelector((state:RootState) =>state.Auth )
    console.log(count)
  const [opened, { open, close }] = useDisclosure(false);
  const closing = () => {
    close()
  }
 
  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication" >
        <Demo closing={closing}/>
      </Modal>

      <Group position="center">
        <Button onClick={open}>Add  Medicine</Button>
      </Group>
    </>
  );
}



function Demo({closing}:clProps) {

    const submition = (values: { name: string; presentation: string; price: string; }) => {
        try {
            notifications.show({
                id: 'load-data',
                loading: true,
                title: 'Loading your data',
                message: 'uploading to database',
                autoClose: false,
                withCloseButton: false,
            });
            set(ref(database, `medicine/${count?.hospital}/${values.name}`), {
                ...values,amount:0
            });
            closing()
            notifications.update({
                id: 'load-data',
                color: 'teal',
                title: 'Data was loaded',
                message: 'successfully loaded ',
                icon: <IconCheck size="1rem" />,
                autoClose: 2000,
              });

        } catch (error) {
            
        }
     }
    const form = useForm({
      initialValues: {
        name: '',
        presentation: '',
        price:''
      },
     
    });
  
    return (
      <Group grow >
        <form onSubmit={form.onSubmit((values) => submition(values))}>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="name of medicine"
            {...form.getInputProps('name')}
          />
          <TextInput
            withAsterisk
            label="Presentation"
            placeholder="packaging of medicine standard  form "
            {...form.getInputProps('presentation')}
          />
          <TextInput
            withAsterisk
            label="Price"
            placeholder="Price per presentation"
            {...form.getInputProps('price')}
          />
  
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Group>
    );
  }