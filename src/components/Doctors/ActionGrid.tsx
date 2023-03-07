import { createStyles, Card, Text, SimpleGrid, UnstyledButton, Anchor, Group,rem } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  IconCreditCard,
  IconBuildingBank,
  IconRepeat,
  IconReceiptRefund,
  IconReceipt,
  IconReceiptTax,
  IconReport,
  IconCashBanknote,
  IconCoin,
  IconPrescription 
} from '@tabler/icons';
import { BioData, getUsers } from '@/app/features/triageSlice';
import { AppDispatch, RootState } from '@/app/store';
import { Details } from '../Triage/Details';
import React, { useEffect } from 'react';
import { Complains } from '../Triage/Complains';
import { Vitals } from '../Triage/Vitals';
import { Allergies } from '../Triage/Allergies';
import { FAmilyHistory } from '../Triage/FamilyHistory';
import { SocialHistory } from '../Triage/SocialHistory';
import { MedicalHistory } from '../Triage/MedicalHistory';
import { Medication } from '../Triage/Medication';
import { Review } from '../Triage/Reviews';
import { Prescription } from './prescripe';
import { useRouter } from 'next/router';

const mockdata = [
  { title: 'Complains', icon: IconCreditCard, color: 'violet' },
  { title: 'Vital signs', icon: IconBuildingBank, color: 'indigo' },
  { title: 'Allergies', icon: IconRepeat, color: 'blue' },
  { title: 'Medications', icon: IconReceiptRefund, color: 'green' },
  { title: 'Medical history', icon: IconReceipt, color: 'teal' },
  { title: 'Family History', icon: IconReceiptTax, color: 'cyan' },
  { title: 'Social History', icon: IconReport, color: 'pink' },
  { title: 'Reviews', icon: IconCoin, color: 'red' },
  { title: 'Patient Details', icon: IconCashBanknote, color: 'orange' },
];

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
  },

  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: theme.radius.md,
    height: rem(90),
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease, transform 100ms ease',

    '&:hover': {
      boxShadow: theme.shadows.md,
      transform: 'scale(1.05)',
    },
  },
}));

export function ActionsGridPatients() {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const {id} = router.query
    // console.log( typeof id)
    if(id) {
        dispatch(getUsers( id))
    }
   
    // useEffect(()=>{
    //     if(id){
    //         dispatch(getUsers(id))
    //     }
    // },[id])
   
  const { classes, theme } = useStyles();
  const [active, setActive] = React.useState('Patient Details');

  const data = useSelector((state:RootState) => state.Bio)

  // console.log(data)

  const items = mockdata.map((item) => (
    <UnstyledButton key={item.title} className={classes.item} onClick={(event) => {event.preventDefault(); setActive(item.title)}}>
      <item.icon color={theme.colors[item.color][6]} size={32} />
      <Text size="xs" mt={7} >
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <>
            <div   style={{ backgroundColor:'#4DABF7',height:'50px', marginTop: '20px',}}>
             <Text style={{textAlign:'center', padding:'2px'}}>{ `PATIENT: ${data.user.bio.name}`}</Text>
          </div>
      <Card className={classes.card}>
        <Group position="apart">
          <Text   onClick={() => router.push('/hospital/doctor')} className={classes.title}>Services</Text>
          {/* <Anchor size="xs" color="dimmed" sx={{ lineHeight: 1 }}>
            + 21 other services
          </Anchor> */}
        </Group>
        <SimpleGrid cols={3} mt="md">
          {items}
        </SimpleGrid>

        <div style={{  marginTop: '40px', marginBottom: '10px', marginRight: '20px',borderTop: '3px solid #7048E8' }}>

        
        <div style={{ marginTop: '40px', marginBottom: '10px', marginRight: '20px'}} >
          {active === 'Patient Details' &&  < Details  {...data} />}
          {active === 'Complains' &&  <Complains {...data}/> }
          {active === 'Vital signs' &&  <Vitals  {...data}/> }
          {active === 'Medications' &&  <Medication/> }
          {active === 'Medical history' &&  <MedicalHistory/> }
          {active === 'Social History' &&  <SocialHistory/> }
          {active === 'Reviews' &&  <Prescription {...data}/> }
          {active === 'Allergies' &&  <Allergies {...data}/> }
          {active === 'Family History' &&  <FAmilyHistory/> }
          
          
        </div>
        </div>

      </Card>
    </>
    
  );
}