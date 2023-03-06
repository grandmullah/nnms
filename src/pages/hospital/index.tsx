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
    Select,  CloseButton

  } from '@mantine/core';
  import { forwardRef, useState,useEffect} from 'react';
  import { useRouter } from 'next/navigation';
  import { useSelector, useDispatch } from 'react-redux'
  import { getAuth, signInWithEmailAndPassword ,onAuthStateChanged,signOut} from "firebase/auth";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import {app} from  '../../firebase'
  import { AppDispatch, RootState } from '@/app/store';
  import { updateAuth } from '@/app/features/authSlice';

  import { getHospitals, hospital, hospitals } from '@/app/features/hospitals';
  
  const auth = getAuth(app);
  
  

  
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

    const dispatch = useDispatch<AppDispatch>()

    
    const [list,setList] = useState<hospital[]>([])

    


    
    const [hospital, setHospital] = useState<string>('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // console.log(hospital, email , password)
  
    const  hosp = useSelector((state:RootState) => state.Hospitals)
    const  Auth = useSelector((state:RootState) => state.Auth)
    useEffect(()=>{
      
      const user = auth.currentUser;

      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // ...

        user.getIdTokenResult().then( async (idTokenResult)=>{
          if(!idTokenResult.claims.hospital.includes(Auth.hospital)){
            await  signOut(auth)
            toast.error('Auth hospital failed ')

            console.log('failed here at useEffect')
          }else{
          router.push(`/hospital/${idTokenResult.claims.role}`)
          }
        })
            
      } else {
        // No user is signed in.
      }
     
    })

    useEffect(()=> {
      if(list.length <= 0 ) {
        dispatch(getHospitals())
        console.log('called')
        
        
      }

      console.log(hosp)
      setList(hosp.hospitals)
    },[list,hosp])
  
  
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
           console.log('failed hapa')
            toast.error('Auth hospital failed ')
        }else{
          dispatch(updateAuth({role:`${idTokenResult.claims.role}`,hospital:hospital,name:email}))
        router.push(`/hospital/${idTokenResult.claims.role}`)
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
              data={list}
              searchable
              onChange={setHospital}
              maxDropdownHeight={400}
              nothingFound="Nobody here"
              filter={(value, item) =>
                  item?.label?.toLowerCase().includes(value.toLowerCase().trim()) ||
                  item.description.toLowerCase().includes(value.toLowerCase().trim())
              }
              />
          <TextInput label="Email" placeholder="user@example.com" required onChange={(event) => setEmail(event.currentTarget.value)} />
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

         <CookiesBanner/>
      </Container>
    );
  }
  
  
  
 function CookiesBanner() {
    return (
      <Paper withBorder p="lg" radius="md" shadow="md">
        <Group position="apart" mb="xs">
          <Text size="md" weight={500}>
           Test users
          </Text>
          <CloseButton mr={-9} mt={-9} />
        </Group>
        <Text color="dimmed" size="xs">
            receptionist  kenyatta Hospital user@example.com SecretPassword
        </Text>
        <Text color="dimmed" size="xs">
            Doctor  Nairobi Hospital user1@example.com SecretPassword
        </Text>
        <Group position="right" mt="xs">
          {/* <Button variant="default" size="xs">
            Cookies preferences
          </Button>
          <Button variant="outline" size="xs">
            Accept all
          </Button> */}
        </Group>
      </Paper>
    );
  }