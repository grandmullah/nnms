import { Navbar, Group, Grid ,Code, ScrollArea, createStyles } from '@mantine/core';
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
  IconSwitchHorizontal,
  IconLogout,
} from '@tabler/icons';
import { LinksGroup } from './NavbarLinksGroup';
import { ActionsGrid } from '@/components/Triage/Dashboard';

import { DocumentReference, getFirestore, getDocs,collection } from "firebase/firestore";
import {app} from '../../../firebase'
const db = getFirestore(app)
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth(app);
import { doc, updateDoc } from "firebase/firestore";
import { useSelector, } from 'react-redux'
import { RootState } from '@/app/store';
import { AuthState } from '@/app/features/authSlice';
import React from 'react';

import { useRouter } from 'next/navigation';



const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
    .background,

    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.white,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
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
    color: theme.white,
    opacity: 0.75,
    marginRight: theme.spacing.sm,
  },

//   linkActive: {
//     '&, &:hover': {
//       backgroundColor: theme.fn.lighten(
//         theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
//         0.15
//       ),
//       [`& .${icon}`]: {
//         opacity: 0.9,
//       },
//     },
//   },
// };
}));
export interface RowData {

    label:string,
    name: string,
    email: string,
    DOB: string
}
let count :AuthState
const fetchPatients = async () => {
    let dat:RowData[] = []

    const querySnapshot = await getDocs(collection(db, "patients"));
    querySnapshot.forEach(async (doc) => {
      // doc.data() is never undefined for query doc snapshots
      if (await doc.data().state &&  doc.data().state.active && doc.data().state.hospital === count.hospital){
         console.log(doc.data())
         let user:RowData = {
            label:doc.data().id,
            name: doc.data().firstName,
            email: doc.data().email,
            DOB: doc.data().DOB
         }
         dat.push(user)
      }
    });
    return dat
}

export default function Clinical() {
    const router = useRouter();
    count = useSelector((state:RootState) =>state.Auth )
    console.log(count)
    const [data,setFetched] = React.useState<RowData[]>([])

  React.useEffect(()=>{
    const fetchData = async () => {
        const data:RowData[] = await fetchPatients()
        console.log('patients',data)
        setFetched(data)
    } 
       fetchData()
      // make sure to catch any error
      .catch(console.error);;
  
    // what will be logged to the console?
  },[])

    const mockdata = [
        //   { label: 'Dashboard', icon: IconGauge },
          {
            label: 'patient Queue ',
            icon: IconNotes,
            initiallyOpened: true,
            links: [...data
            ],
          },
          {
            label: 'Security',
            icon: IconLock,
   
          },
        ];


  const { classes } = useStyles();
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <Grid >
        <Grid.Col span={3}>
        <Navbar className={classes.navbar}>
            <Navbar.Section className={classes.header}>
                <Group position="apart">
                {/* <Logo width={120} /> */}
                <Code sx={{ fontWeight: 700 }}>v3.1.2</Code>
                </Group>
            </Navbar.Section>

            <Navbar.Section grow className={classes.links} component={ScrollArea}>
                <div className={classes.linksInner}>{links}</div>
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
        <Grid.Col span={9}>
            
            <ActionsGrid />
        </Grid.Col>

   
    </Grid>
    
  );
}