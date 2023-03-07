import {
    createStyles,
    Text,
    Title,
    SimpleGrid,
    TextInput,
    Textarea,
    Button,
    Group,
    ActionIcon,
    rem
  } from '@mantine/core';
  import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram,IconTrash } from '@tabler/icons';
  import { ContactIconsList } from './Details';
  import { useForm } from '@mantine/form';
  import { Switch,  Box, } from '@mantine/core';
  import { randomId } from '@mantine/hooks';
  import { getDatabase,ref, set,push } from "firebase/database";
  import {app} from '../../firebase'
import { BioData, user } from '@/app/features/triageSlice';
  const database = getDatabase(app);

  const useStyles = createStyles((theme) => ({
    wrapper: {
      minHeight: 400,
      boxSizing: 'border-box',
      backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
        theme.colors[theme.primaryColor][7]
      } 100%)`,
      borderRadius: theme.radius.md,
      padding: `calc(${theme.spacing.xl} * 2.5)`,
  
      [theme.fn.smallerThan('sm')]: {
        padding: `calc(${theme.spacing.xl} * 1.5)`,
      },
    },
  
    title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      color: theme.white,
      lineHeight: 1,
    },
  
    description: {
      color: theme.colors[theme.primaryColor][0],
      maxWidth: rem(300),
  
      [theme.fn.smallerThan('sm')]: {
        maxWidth: '100%',
      },
    },
  
    form: {
      backgroundColor: theme.white,
      padding: theme.spacing.xl,
      borderRadius: theme.radius.md,
      boxShadow: theme.shadows.lg,
    },
  
    social: {
      color: theme.white,
  
      '&:hover': {
        color: theme.colors[theme.primaryColor][1],
      },
    },
  
    input: {
      backgroundColor: theme.white,
      borderColor: theme.colors.gray[4],
      color: theme.black,
  
      '&::placeholder': {
        color: theme.colors.gray[5],
      },
    },
  
    inputLabel: {
      color: theme.black,
    },
  
    control: {
      backgroundColor: theme.colors[theme.primaryColor][6],
    },
  }));
  
  const social = [IconBrandTwitter, IconBrandYoutube, IconBrandInstagram];
  
  export function Allergies({user,}:BioData) {
    const { classes } = useStyles();
  
    const icons = social.map((Icon, index) => (
      <ActionIcon key={index} size={28} className={classes.social} variant="transparent">
        <Icon size="1.4rem" stroke={1.5} />
      </ActionIcon>
    ));
  
    return (
      <div className={classes.wrapper}>
        <SimpleGrid cols={2} spacing={50} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          <div>
            <Title className={classes.title}>Allergies</Title>
            <Text className={classes.description} mt="sm" mb={30}>
              
            </Text>
  
            <ContactIconsList variant="white" />
  
            <Group mt="xl">{icons}</Group>
          </div>
            <Demo {...user}/>
        </SimpleGrid>
      </div>
    );
  }




function Demo(user:user) {
  
  const form = useForm({
    initialValues: {
      allergy: [{ name: '',  key: randomId() }],
    },
  });

  const fields = form.values.allergy.map((item, index) => (
    <Group key={item.key} mt="xs">
      <TextInput
        placeholder="Asthma"
        withAsterisk
        sx={{ flex: 1 }}
        {...form.getInputProps(`allergy.${index}.name`)}
      />
      <ActionIcon color="red" onClick={() => form.removeListItem('allergy', index)}>
        <IconTrash size="1rem" />
      </ActionIcon>
    </Group>
  ));

  return (
    <Box maw={500} mx="auto">
      {fields.length > 0 ? (
        <Group mb="xs">
          <Text weight={500} size="sm" sx={{ flex: 1 }}>
            Name
          </Text>
        </Group>
      ) : (
        <Text color="black" align="center">
          No Allergy here...
        </Text>
      )}

      {fields}

      <Group position="center" mt="md">
        <Button
          onClick={() =>
            form.insertListItem('allergy', { name: '', key: randomId() })
          }
        >
          Add Another Allergy
        </Button>
        <Group>
      <Button
          onClick={() =>{
            try {
              const postComplainRef = ref(database, `Records/${user.bio.id}/allergies`);
              const newPostRef = push(postComplainRef);
              set(newPostRef,{...form.values.allergy});
            } catch (error) {
              console.log(error)
            }
            
           }}
        >
          save
        </Button>
      </Group>

      </Group>
     

    
    </Box>
  );
}