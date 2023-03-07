import {
  ThemeIcon,
  Text,
  Title,
  Container,
  SimpleGrid,
  useMantineTheme,
  createStyles,
  Menu,
  Header,  Group, Center, Burger, rem 
} from '@mantine/core';
import { IconGauge, IconCookie, IconUser, IconMessage2, IconLock, TablerIcon } from '@tabler/icons';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons';
import { MantineLogo } from '@mantine/ds';
import { FooterLinks } from '@/components/Footer/Index';
import { HeroImageBackground } from '@/components/Footer/Hero';

export const MOCKDATA = [
  {
    icon: IconGauge,
    title: 'Extreme performance',
    description:
      'This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit',
  },
  {
    icon: IconUser,
    title: 'Privacy focused',
    description:
      'People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma',
  },
  {
    icon: IconCookie,
    title: 'No third parties',
    description:
      'They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves',
  },
  {
    icon: IconLock,
    title: 'Secure by default',
    description:
      'Although it still can’t fly, its jumping power is outstanding, in Alola the mushrooms on Paras don’t grow up quite right',
  },
  {
    icon: IconMessage2,
    title: '24/7 Support',
    description:
      'Rapidash usually can be seen casually cantering in the fields and plains, Skitty is known to chase around after its own tail',
  },
];

interface FeatureProps {
  icon: TablerIcon;
  title: React.ReactNode;
  description: React.ReactNode;
}

export function Feature({ icon: Icon, title, description }: FeatureProps) {
  const theme = useMantineTheme();
  return (
    <div>
      <ThemeIcon variant="light" size={40} radius={40}>
        <Icon size={20} stroke={1.5} />
      </ThemeIcon>
      <Text style={{ marginTop: theme.spacing.sm, marginBottom: 7 }}>{title}</Text>
      <Text size="sm" color="dimmed" style={{ lineHeight: 1.6 }}>
        {description}
      </Text>
    </div>
  );
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: `calc(${theme.spacing.xl} * 4)`,
    paddingBottom: `calc(${theme.spacing.xl} * 4)`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    marginBottom: theme.spacing.md,
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(28),
      textAlign: 'left',
    },
  },

  description: {
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      textAlign: 'left',
    },
  },
  header: {
    backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
    borderBottom: 0,
  },

  inner: {
    height: rem(56),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.white,
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
        0.1
      ),
    },
  },

  linkLabel: {
    marginRight: rem(5),
  },
}));
const dat = {
  "links": [
    {
      "link": "/about",
      "label": "Features"
    },
    {
      "link": "#1",
      "label": "Learn",
      "links": [
        {
          "link": "/docs",
          "label": "Documentation"
        },
        {
          "link": "/resources",
          "label": "Resources"
        },
        {
          "link": "/community",
          "label": "Community"
        },
        {
          "link": "/blog",
          "label": "Blog"
        }
      ]
    },
    {
      "link": "/about",
      "label": "About"
    },
    {
      "link": "/pricing",
      "label": "Pricing"
    },
    {
      "link": "#2",
      "label": "Support",
      "links": [
        {
          "link": "/faq",
          "label": "FAQ"
        },
        {
          "link": "/demo",
          "label": "Book a demo"
        },
        {
          "link": "/forums",
          "label": "Forums"
        }
      ]
    }
  ]
}
interface FeaturesGridProps {
  title: React.ReactNode;
  description: React.ReactNode;
  data?: FeatureProps[];
}

interface HeaderSearchProps {
  links: { link: string; label: string; links: { link: string; label: string }[] }[];
}
export default  function FeaturesGrid({ title, description, data = MOCKDATA }: FeaturesGridProps) {
  const { classes, theme } = useStyles();
  const features = data.map((feature, index) => <Feature {...feature} key={index} />);

  return (
    <>
    <HeroImageBackground />
   
    <Container className={classes.wrapper}>

      
      <Title className={classes.title}>{'Integrate effortlessly with any technology stack'}</Title>

      <Container size={560} p={0}>
        <Text size="sm" className={classes.description}>
          {`Every once in a while, you’ll see a Golbat that’s missing some fangs. This happens when hunger drives it to try biting a Steel-type Pokémon.`}
        </Text>
      </Container>

      <SimpleGrid
      mt={60}
      cols={3}
      spacing={50}
      breakpoints={[
        { maxWidth: 980, cols: 2, spacing: 'xl' },
        { maxWidth: 755, cols: 1, spacing: 'xl' },
      ]}
      >
        {features}
      </SimpleGrid>
    </Container>
    <FooterLinks  />
    </>
  );
}




 function HeaderMenuColored({ links }: HeaderSearchProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (

        <div>
        <Menu   key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
        </div>
        
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  return (
    <Header style={{marginTop:'10px'}} height={56} className={classes.header} mb={120}>
      <Container>
        <div className={classes.inner}>
          <Text>NNMS</Text>
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
            color="#fff"
          />
        </div>
      </Container>
    </Header>
  );
}