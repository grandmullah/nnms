/* eslint-disable react/display-name */
import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
    Select
  } from '@mantine/core';
  import { forwardRef, useState,useEffect} from 'react';
  import { useRouter } from 'next/navigation';
  import { useSelector, useDispatch } from 'react-redux'
  import { getAuth, signInWithEmailAndPassword ,onAuthStateChanged,signOut} from "firebase/auth";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import {app} from  '../../firebase'
  import { RootState } from '@/app/store';
  import { updateAuth } from '@/app/features/authSlice';
  
  const auth = getAuth(app);
  
  
  const data = [
    {
      // image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
      label: 'Nairobi Hospital',
      value: '001',
      description: 'level 4',
    },
  
    {
      // image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
      label: 'Kenyatta Hospital',
      value: '002',
      description: 'level 4 hospital ',
    }
    
  ];
  
  interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
    // image: string;
    label: string;
    description: string;
  }
  
  const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({  label, description, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          
  
          <div>
            <Text size="sm">{label}</Text>
            <Text size="xs" opacity={0.65}>
              {description}
            </Text>
          </div>
        </Group>
      </div>
    )
  );
  
  export default function AuthenticationTitle() {
    const router = useRouter();

    const dispatch = useDispatch()


    const [hospital, setHospital] = useState<string>('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    // console.log(hospital, email , password)
  
  
    useEffect(()=>{
      onAuthStateChanged(auth, async (user) => {
        if (user) {

          console.log(user)
          const idTokenResult = await user.getIdTokenResult()
          router.push(`/hospital/clinical`)
        //   console.log(idTokenResult)
        //   if(!idTokenResult.claims.hospital.includes(hospital)){
        //       toast.error('Auth hospital failed ')
        //     }
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
        //   router.push('/hospital/doctor')
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
    })
  
  
    const trySignIn = () => {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential)
        // Signed in 
        return userCredential.user.getIdTokenResult();
        // ...
      })
      .then(async (idTokenResult) => {
        // console.log(idTokenResult)
        if(!idTokenResult.claims.hospital.includes(hospital)){
           await  signOut(auth)
            toast.error('Auth hospital failed ')
        }else{
          dispatch(updateAuth({role:`${idTokenResult.claims.role}`,hospital:hospital}))
        router.push(`/hospital/clinical`)
        }
        // Check user's county here
      })
      .catch((error) => {
        console.log(error)
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    }
  
    return (
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor<'a'> href="#" size="sm" onClick={(event) => event.preventDefault()}>
            Contact support
          </Anchor>
        </Text>
  
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Select
              withAsterisk
              label="Choose hospital "
              placeholder="Pick one"
              itemComponent={SelectItem}
              data={data}
              searchable
              onChange={setHospital}
              maxDropdownHeight={400}
              nothingFound="Nobody here"
              filter={(value, item) =>
                  item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
                  item.description.toLowerCase().includes(value.toLowerCase().trim())
              }
              />
          <TextInput label="Email" placeholder="you@mantine.dev" required onChange={(event) => setEmail(event.currentTarget.value)} />
          <PasswordInput label="Password" placeholder="Your password" required mt="md" onChange={(event) => setPassword(event.currentTarget.value)}/>
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
            <Anchor<'a'> onClick={(event) => event.preventDefault()} href="#" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" uppercase onClick={trySignIn}>
            Sign in
          </Button>
        </Paper>
         <ToastContainer />
      </Container>
    );
  }
  
  
  