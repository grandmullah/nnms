import { useState } from 'react';
import { Stepper, Button, Group, TextInput, PasswordInput, Code, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { getDatabase, ref, set, runTransaction,increment,update } from "firebase/database";
import {app} from '../../firebase'
const database = getDatabase(app);
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react'
interface propss {
  medicine:string
  closing:() =>void
}
export function OrderPharmaceuticals({medicine,closing}:propss) {
  const [active, setActive] = useState(0);
  const {hospital} = useSelector((state:RootState) =>state.Auth )
    // console.log(count)

    const sumbmitt = () => {
      try {
        notifications.show({
            id: 'load-data',
            loading: true,
            title: 'Loading your data',
            message: 'uploading to database',
            autoClose: false,
            withCloseButton: false,
        });
        const postRef = ref(database,);
        const Oref = ref(database,`medicine/${hospital}/${medicine}`)
        const updates:any = {};
        updates[`medicine/${hospital}/${medicine}/amount`] = increment(parseFloat(form.values.amount));
        // updates[`medicine/${hospital}/${medicine}/amount`] = increment(parseFloat(form.values.amount));
        // runTransaction(Oref, (post) => {
        //   if (post) {
        //    console.log(post)
        //   }
        //   return post;
        // });
        update(postRef, updates);
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
      reference: '',
      batchNumber: '',
      amount: '',
      expiry: '',
      
    },

    validate: (values) => {
      if (active === 0) {
        return {
          reference:
            values.reference.trim().length < 6
              ? 'Reference must include at least 6 characters'
              : null,
          // password:
          //   values.password.length < 6 ? 'Password must include at least 6 characters' : null,
        };
      }

      if (active === 1) {
        return {
          batchNumber: values.batchNumber.trim().length < 2 ? 'Name must include at least 2 characters' : null,
          // email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
        };
      }

      return {};
    },
  });

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper active={active} breakpoint="sm">
        <Stepper.Step label=" Order Ref" description="order reference  ">
          <TextInput label="Order Ref " placeholder="reference" {...form.getInputProps('reference')} />
          
        </Stepper.Step>

        <Stepper.Step label="Details " description="consignment Details">
          <TextInput label="Batch Name" placeholder="Batch Number" {...form.getInputProps('batchNumber')} />
          <NumberInput mt="md" label="Amount" placeholder="Amount" {...form.getInputProps('amount')} />
        </Stepper.Step>

        <Stepper.Step label="Final step" description="Expiry">
        <DateInput
          valueFormat="YYYY MMM DD"
          label="Date input"
          placeholder="Date input"
          maw={400}
          mx="auto"
          {...form.getInputProps('expiry')}
        />
        </Stepper.Step>
        <Stepper.Completed>
          Completed! Form values:
          <Code block mt="xl">
            {JSON.stringify(form.values, null, 2)}
          </Code>

          <Button onClick={sumbmitt} >
            submit
          </Button>
        </Stepper.Completed>


      </Stepper>

      <Group position="right" mt="xl">
        {active !== 0 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        {active !== 3 && <Button onClick={nextStep}>Next step</Button>}
      </Group>
    </>
  );
}