import { useState } from 'react';
import { createStyles, Navbar, Group, Grid ,Text, Code, getStylesRef, rem} from '@mantine/core';
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
} from '@tabler/icons';
import { MantineLogo } from '@mantine/ds';
import { useRouter } from 'next/navigation';
import { useSelector, } from 'react-redux'
import Search from '../../../components/Reception/search'
import { getAuth, signOut } from "firebase/auth";
import {app} from '../../../firebase'
import { RootState } from '@/app/store';
import NotificationPage from '../../../components/Reception/Notification';
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

const data = [
  { link: '', label: 'Dashboard', icon: IconReceipt2 },
  { link: '', label: 'Notifications', icon: IconBellRinging },
  { link: '', label: 'Security', icon: IconFingerprint },
  // { link: '', label: 'SSH Keys', icon: IconKey },
  // { link: '', label: 'Databases', icon: IconDatabaseImport },
  // { link: '', label: 'Authentication', icon: Icon2fa },
  { link: '', label: 'Other Settings', icon: IconSettings },
];

export default function NavbarSimpleColored() {
  const router = useRouter();

  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Dashboard');
  const count = useSelector((state:RootState) =>state.Auth )
  console.log(count)

  const links = data.map((item) => (
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
      <Grid.Col span={3}>
        <Navbar  p="md" className={classes.navbar}>
          <Navbar.Section grow>
            <Group className={classes.header} position="apart">
              <Text style={{color:'white'}}>NNMS</Text>
              <Code className={classes.version}>v1.0.0</Code>
            </Group>
            {links}
          </Navbar.Section>

          <Navbar.Section className={classes.footer}>
            <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
              <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
              <span>Change account</span>
            </a>

            <a href="#" className={classes.link} onClick={(event) => {signOut(auth).then(() => {
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
        <div className={classes.navbar}  style={{height:'50px', marginTop: '20px', marginBottom: '10px',}}>
          
        </div>
        
        <div style={{ marginTop: '20px', marginBottom: '10px', marginRight: '20px'}}>
        {active === 'Dashboard' &&  < Search />}
        {active === 'Notifications' &&  < NotificationPage />} 
        </div>
          
       
      </Grid.Col>
    

   
    </Grid>
    
  );
}

