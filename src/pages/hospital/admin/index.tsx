import { useState } from 'react';
import { EmployeeTable,  } from '../../../components/Admin/employees';
import { Navbar, Center, Tooltip, UnstyledButton, createStyles, Stack, Grid,rem } from '@mantine/core';
import {
  TablerIcon,
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
} from '@tabler/icons';
import { MantineLogo } from '@mantine/ds';
import { Medicine } from '@/components/Admin/Medicine';
import { OrderPharmaceuticals } from '@/components/Admin/AddOrder';


const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.white,
    opacity: 0.85,

    '&:hover': {
      opacity: 1,
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
        0.1
      ),
    },
  },

  active: {
    opacity: 1,
    '&, &:hover': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
        0.15
      ),
    },
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
}
function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
        <Icon size="1.2rem" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: 'Dashboard' },
  { icon: IconGauge, label: 'Pharmaceutical' },
  { icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
  { icon: IconCalendarStats, label: 'Releases' },
  { icon: IconUser, label: 'Account' },
  { icon: IconFingerprint, label: 'Security' },
  { icon: IconSettings, label: 'Settings' },
];


    const data = [
      {
        "avatar": "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
        "name": "Robert Wolfkisser",
        "job": "Engineer",
        "email": "rob_wolf@gmail.com",
        "phone": "+44 (452) 886 09 12"
      },
      {
        "avatar": "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
        "name": "Jill Jailbreaker",
        "job": "Engineer",
        "email": "jj@breaker.com",
        "phone": "+44 (934) 777 12 76"
      },
      {
        "avatar": "https://images.unsplash.com/photo-1632922267756-9b71242b1592?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
        "name": "Henry Silkeater",
        "job": "Designer",
        "email": "henry@silkeater.io",
        "phone": "+44 (901) 384 88 34"
      },
      {
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
        "name": "Bill Horsefighter",
        "job": "Designer",
        "email": "bhorsefighter@gmail.com",
        "phone": "+44 (667) 341 45 22"
      },
      {
        "avatar": "https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
        "name": "Jeremy Footviewer",
        "job": "Manager",
        "email": "jeremy@foot.dev",
        "phone": "+44 (881) 245 65 65"
      }
    ]
  
export default function NavbarMinimalColored() {
  const [active, setActive] = useState('Dashboard');

  const activate = (value:string) => {
    setActive(value)
 }

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={link.label === active}
      onClick={() => setActive(link.label)}
    />
  ));

  return (
    <Grid>
        <Grid.Col span={1}>
        <Navbar
            
            width={{ base: 80 }}
            p="md"
            sx={(theme) => ({
                backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
                .background,
            })}
            >
            <Center>
                <MantineLogo type="mark" inverted size={30} />
            </Center>
            <Navbar.Section grow mt={50}>
                <Stack justify="center" spacing={0}>
                {links}
                </Stack>
            </Navbar.Section>
            <Navbar.Section>
                <Stack justify="center" spacing={0}>
                <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
                <NavbarLink icon={IconLogout} label="Logout" />
                </Stack>
            </Navbar.Section>  
        </Navbar>   
        </Grid.Col>
        <Grid.Col span={9}>
                  
        <div  style={{height:'50px', marginTop: '20px', marginBottom: '10px',}}></div>
        <div>
        {active === 'Dashboard' &&  <EmployeeTable data={data} />}
        {active === 'Pharmaceutical' &&  <Medicine data={data} activate={activate} />}
        {active === 'Order' &&  <OrderPharmaceuticals/>}
        </div>
           
        </Grid.Col>
        
    </Grid>
    
  );
}