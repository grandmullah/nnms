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
  import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram, IconCheck } from '@tabler/icons';
 import { updateComplains } from '@/app/features/complains';
import { useSelector,useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { useState } from 'react';
import { BioData, getUsers } from '@/app/features/triageSlice';
import { Notes } from './note';
import { notifications } from '@mantine/notifications';
 
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
  
  export function Complains({user,}:BioData) {
    const { classes } = useStyles();
    const {loading,error} =  useSelector((state:RootState) => state.Complains)
    const {name,hospital} =  useSelector((state:RootState) => state.Auth)
    const dispatch = useDispatch<AppDispatch>()
    const [value, setValue] = useState('');

  
    return (
      <div className={classes.wrapper}>
        <SimpleGrid cols={2} spacing={50} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          <div>
            <Title className={classes.title}>Previous Complains</Title>

            <Notes {...user.complains}/>
            {/* <Text className={classes.description} mt="sm" mb={30}>
              Leave your email and we will get back to you within 24 hours
            </Text> */}
  
            {/* <ContactIconsList variant="white" /> */}
  
            {/* <Group mt="xl">{icons}</Group> */}
          </div>
          <div className={classes.form}>

            <Textarea
              required
              label="The Complain"
              placeholder="write down the complains presented by patient "
              minRows={4}
              mt="md"
              value={value} 
              onChange={(event) => setValue(event.currentTarget.value)}
              classNames={{ input: classes.input, label: classes.inputLabel }}
            />
  
            <Group position="right" mt="md">
              {loading === 'idle' ?  <Button   onClick={(event) => {event.preventDefault(); 
              notifications.show({
                id: 'load-data',
                loading: true,
                title: 'Loading your data',
                message: 'Data will be loaded in 3 seconds, you cannot close this yet',
                autoClose: false,
                withCloseButton: false,
              });
              dispatch(updateComplains(
                {by:name,
                hospital:hospital,
                uid:user.bio.id,
                complain:value,
                timestamp:`${Date.now()}`
            }))
            setTimeout(() => {
              notifications.update({
                id: 'load-data',
                color: 'teal',
                title: 'Data was loaded',
                message: 'Notification will close in 2 seconds, you can close this notification now',
                icon: <IconCheck size="1rem" />,
                autoClose: 2000,
              });
              
            }, 3000);
            dispatch(getUsers(user.bio.id))
            }} className={classes.control}>Save complain</Button> : <Button disabled >save</Button>}
              
            </Group>
          </div>
        </SimpleGrid>
      </div>
    );
  }