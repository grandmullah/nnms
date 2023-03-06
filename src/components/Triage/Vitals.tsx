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
    rem,
  } from '@mantine/core';
  import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons';
  import { ContactIconsList } from './Details';
import { NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDispatch, useSelector } from 'react-redux';
import vitals, { updateVitals } from '../../app/features/vitals';
import { AppDispatch, RootState } from '@/app/store';
import { BioData } from '@/app/features/triageSlice';
import { VitalN } from './note';
  
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
  
  export function Vitals({user,}:BioData) {
    const { classes } = useStyles();
    const dispatch = useDispatch<AppDispatch>()
    const {name,hospital} =  useSelector((state:RootState) => state.Auth)
    const form = useForm({
      initialValues: {
        bodyWeight: '',
        bodyTemperature:'',
        pulseRate:'',
        bloodPressure:'',
        respiratoryRate:'',
      },
  
    });
  // dispatch(updateVitals({...values,by:name,
  // hospital:hospital,uid:user.bio.id,timestamp:Date.now()})
    return (
      <div className={classes.wrapper}>
        <SimpleGrid cols={2} spacing={50} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          <div>
            <Title className={classes.title}>previous Vitals Read </Title>

              <VitalN  {...user.vitals}/>
            
  
          </div>
          <div className={classes.form}>
          <Group grow>
              <form onSubmit={form.onSubmit((values: any) => dispatch(updateVitals({...values,hospital:hospital,uid:user.bio.id,timestamp:Date.now()})))}>
                <Group grow  >
                  <Text >Body Weight: </Text>
                  <NumberInput
                   hideControls
                  withAsterisk
                  label="Body Weight"
                  placeholder="weight in Kgs "
                  {...form.getInputProps('bodyWeight')}
                />
                </Group>
                <Group grow  >
                  <Text>Body Temperature</Text>
                  <NumberInput
                   hideControls
                  withAsterisk
                  label="Temperature"
                  placeholder=" body temperature"
                  {...form.getInputProps('bodyTemperature')}
                />
                </Group>
                <Group grow  >
                <Text>Pulse Rate </Text>
                  <NumberInput
                  hideControls
                  withAsterisk
                  label="Pulse Rate "
                  placeholder=" pulse rate "
                  {...form.getInputProps('pulseRate')}
                />
                </Group>
                <Group grow  >
                <Text>Blood pressure</Text>
                  <NumberInput
                  hideControls
                  withAsterisk
                  label="Blood Pressure"
                  placeholder="blood pressure"
                  {...form.getInputProps('bloodPressure')}
                />
                </Group>
                <Group grow  >
                <Text>Respiratory Rate </Text>
                  <NumberInput
                  hideControls
                  withAsterisk
                  label="Respiratory Rate "
                  placeholder="Respiratory Rate"
                  {...form.getInputProps('respiratoryRate')}
                />
                </Group>
               


                <Group position="right" mt="md">
                  <Button type="submit">Submit</Button>
                </Group>
              </form>
            </Group >
  
           
          </div>
        </SimpleGrid>
      </div>
    );
  }