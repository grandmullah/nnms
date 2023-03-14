import { useEffect, useState } from 'react';
import { createStyles, Navbar, Group, Code, getStylesRef, rem, Grid } from '@mantine/core';
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantine/ds';
import useSWR, { SWRConfig } from 'swr'
import axios from 'axios'
import { EmployeeTable,  } from '../../../components/Admin/employees';
import { Medicine } from '@/components/Admin/Medicine';
import { OrderPharmaceuticals } from '@/components/Admin/AddOrder';
import {app} from '../../../firebase'
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from 'next/router';
import { RootState } from '@/app/store';
import { useSelector } from 'react-redux';
const auth = getAuth(app);


const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
  },

  version: {
    backgroundColor: theme.fn.lighten(
      theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
      0.1
    ),
    color: theme.white,
    fontWeight: 700,
  },

  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${theme.fn.lighten(
      theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
      0.1
    )}`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${theme.fn.lighten(
      theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
      0.1
    )}`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.white,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
        0.1
      ),
    },
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color: theme.white,
    opacity: 0.75,
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
        0.15
      ),
      [`& .${getStylesRef('icon')}`]: {
        opacity: 0.9,
      },
    },
  },
}));

const dat = [
  { link: '', label: 'Employees', icon: IconReceipt2 },
  { link: '', label: 'Notifications', icon: IconBellRinging },
  
  // { link: '', label: 'Security', icon: IconFingerprint },
  // { link: '', label: 'SSH Keys', icon: IconKey },
  { link: '', label: 'Pharmaceutical', icon: IconDatabaseImport },
  { link: '', label: 'Authentication', icon: Icon2fa },
  { link: '', label: 'Other Settings', icon: IconSettings },
];

export default function NavbarSimpleColored() {
  const {hospital} =  useSelector((state:RootState) =>state.Auth )
  const fetcher = (url: string) => axios.get(url).then(res => res.data)
  const { data, error } = useSWR('/api/employee', fetcher, { refreshInterval: 1000 })
  const  med =  useSWR(() => '/api/medicine?hospital=' + hospital,fetcher, { refreshInterval: 1000 })
  const [empl, setEmpl] = useState([{avatar: '', name: '', job: '', email: '', phone: ''}])
  const [medicine , setMedicine] = useState({amoxyl: { name: 'amoxyl', presentation: 'tablets', price: '12',amount:0 }})
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Employees');
  // console.log(empl,error,med.data.data)
  const router = useRouter()

  const activate = (value:string) => {
    setActive(value)
 }
 useEffect(()=>{
  if(data){
    setEmpl(data.jj)
    
  }
  if(med){
    console.log(med?.data?.data)
    setMedicine(med?.data?.data)
  }
    
 },[data,med])

  const links = dat.map((item) => (
    <a
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Grid>
      <Grid.Col span={2}>
        <Navbar  p="md" className={classes.navbar}>


        <Navbar.Section grow>
          {/* <Group className={classes.header} position="apart">
            <MantineLogo size={28} inverted />
            <Code className={classes.version}>v3.1.2</Code>
          </Group> */}
          {links}
        </Navbar.Section>
        <Navbar.Section className={classes.footer}>
          <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
            <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
            <span>Change account</span>
          </a>

          <a href="#" className={classes.link} onClick={() => {signOut(auth).then(() => {
                router.push('/')
              }).catch((error) => {
                // An error happened.
              });}}>
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </a>
        </Navbar.Section>
      </Navbar>

    </Grid.Col>
    <Grid.Col span={10}>
                  
        <div  style={{height:'50px', marginTop: '20px', marginBottom: '10px',}}></div>
        <div>
        {active === 'Employees' &&  <EmployeeTable data={empl} />}
        {active === 'Pharmaceutical' &&  <Medicine data={medicine} activate={activate} />}
        {/* {active === 'Order' &&  <OrderPharmaceuticals/>} */}
        </div>
           
        </Grid.Col>


    </Grid>
   
  );
}


