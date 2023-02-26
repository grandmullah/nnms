import { createStyles, Card, Text, SimpleGrid, UnstyledButton, Anchor, Group } from '@mantine/core';
import { useSelector } from 'react-redux';
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
} from '@tabler/icons';
import { BioData } from '@/app/features/triageSlice';
import { RootState } from '@/app/store';
import { Details } from './Details';
import React from 'react';
import { Complains } from './Complains';
import { Vitals } from './Vitals';
import { Allergies } from './Allergies';
import { FAmilyHistory } from './FamilyHistory';
import { SocialHistory } from './SocialHistory';
import { MedicalHistory } from './MedicalHistory';
import { Medication } from './Medication';
import { Review } from './Reviews';

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
    height: 90,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease, transform 100ms ease',

    '&:hover': {
      boxShadow: `${theme.shadows.md} !important`,
      transform: 'scale(1.05)',
    },
  },
}));

export function ActionsGrid() {
  const { classes, theme } = useStyles();
  const [active, setActive] = React.useState('Patient Details');

  const data = useSelector((state:RootState) => state.Bio)

  console.log(data)

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
            <div   style={{height:'50px', marginTop: '20px', marginBottom: '10px',}}>
          
          </div>
      <Card className={classes.card}>
        <Group position="apart">
          <Text className={classes.title}>Services</Text>
          {/* <Anchor size="xs" color="dimmed" sx={{ lineHeight: 1 }}>
            + 21 other services
          </Anchor> */}
        </Group>
        <SimpleGrid cols={3} mt="md">
          {items}
        </SimpleGrid>

        <div style={{ marginTop: '40px', marginBottom: '10px', marginRight: '20px',borderTop: '3px solid #7048E8' }}>

        
        <div style={{ marginTop: '40px', marginBottom: '10px', marginRight: '20px'}} >
          {active === 'Patient Details' &&  < Details  {...data} />}
          {active === 'Complains' &&  <Complains/> }
          {active === 'Vital signs' &&  <Vitals/> }
          {active === 'Medications' &&  <Medication/> }
          {active === 'Medical history' &&  <MedicalHistory/> }
          {active === 'Social History' &&  <SocialHistory/> }
          {active === 'Reviews' &&  <Review/> }
          {active === 'Allergies' &&  <Allergies/> }
          {active === 'Family History' &&  <FAmilyHistory/> }
          
          
        </div>
        </div>
      </Card>
    </>
    
  );
}