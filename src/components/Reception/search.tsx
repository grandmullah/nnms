// import { useEffect, useState } from 'react';
// import {
//   createStyles,
//   Table,
//   ScrollArea,
//   UnstyledButton,
//   Group,
//   Text,
//   Center,
//   TextInput,
// } from '@mantine/core';
// import { keys } from '@mantine/utils';
// import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons';
// import { RequestAccess } from './ModalAccess';
// import { Proceed } from './proceedVist';

// import { AddPatient } from './ModalAdd';
import { getFirestore , collection, getDocs , query, where, onSnapshot} from "firebase/firestore";
import {app} from '../../firebase'
const db = getFirestore(app)
import { useSelector, } from 'react-redux'
import { RootState } from '@/app/store';
import { AuthState } from '@/app/features/authSlice';

// const useStyles = createStyles((theme) => ({
//   th: {
//     padding: '0 !important',
//   },

//   control: {
//     width: '100%',
//     padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

//     '&:hover': {
//       backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
//     },
//   },

//   icon: {
//     width: 21,
//     height: 21,
//     borderRadius: 21,
//   },
// }));

// interface RowData { email: string; id: string; firstName: string; 
//   secondName: string; surname: string;  maritalStatus: 
//   string; DOB: string; tribe: string; religion: string; phoneNumber: string; 
// access:string  }

// interface TableSortProps {
//   data: RowData[];
// }

// interface ThProps {
//   children: React.ReactNode;
//   reversed: boolean;
//   sorted: boolean;
//   onSort(): void;
// }

// function Th({ children, reversed, sorted, onSort }: ThProps) {
//   const { classes } = useStyles();
//   const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
//   return (
//     <th className={classes.th}>
//       <UnstyledButton onClick={onSort} className={classes.control}>
//         <Group position="apart">
//           <Text weight={500} size="sm">
//             {children}
//           </Text>
//           <Center className={classes.icon}>
//             <Icon size={14} stroke={1.5} />
//           </Center>
//         </Group>
//       </UnstyledButton>
//     </th>
//   );
// }

// function filterData(data: RowData[], search: string) {
//   const query = search.toLowerCase().trim();
//   return data.filter((item) =>
//     keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
//   );
// }

// function sortData(
//   data: RowData[],
//   payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
// ) {
//   console.log('here',data)
//   const { sortBy } = payload;

//   if (!sortBy) {
//     return filterData(data, payload.search);
//   }

//   return filterData(
//     [...data].sort((a, b) => {
//       if (payload.reversed) {
//         return b[sortBy].localeCompare(a[sortBy]);
//       }

//       return a[sortBy].localeCompare(b[sortBy]);
//     }),
//     payload.search
//   );
// }

// // interface add {
// //   hospital
// // }

// let count:AuthState

//  const fetchDB = async () => {

//    let dat:RowData[] = []
//    let final:TableSortProps = {
//       data:dat
//    }
//   // const q = query(collection(db, "PATIENTS"))
//   const querySnapshot = await getDocs(collection(db, "patients"));
//   querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ",  (doc.data().DOB).valueOf());
//     let user:RowData = {
//       email: doc.data().email,
//       id:doc.data().id,
//       firstName:doc.data().firstName,
//       secondName:doc.data().secondName,
//       surname:doc.data().surname,
//       maritalStatus:doc.data().maritalStatus,
//       DOB:new Date(`${(doc.data().DOB).toDate()}`).toLocaleDateString(),
//       tribe:doc.data().tribe,
//       religion:doc.data().religion,
//       phoneNumber: doc.data().phoneNumber,
//       // nationality:doc.data().nationality,
//       // county:doc.data().county,
//       // occupation:doc.data().occupation,
//       // address:doc.data().address,
//       // kinName:doc.data().kinName,
//       // kinRelationship:doc.data().kinRelationship,
//       // kinPhoneNumber:doc.data().kinPhoneNumber,
//       // kinEmail:doc.data().kinEmail,
//       // kinOccupation:doc.data().kinOccupation,
//       // kinAddress:doc.data().kinAddress,
//       access:(doc.data().access).includes(count.hospital) ? 'true' :'false'
//     }
    
//     dat.push(user)
//   });
  
//   return final
//  }

// export interface accessProps {
//   hospital:string,
//   user:string
//   phoneNumber:string
// }

// export interface proceed {
//   name:string
//   user:string
//   hospital:string
// }
// export default   function Search() {
//   count = useSelector((state:RootState) =>state.Auth )
//   console.log(count)

//   const [search, setSearch] = useState('');
//   const [data,setFetched] = useState<RowData[]>([])
//   const [sortedData, setSortedData] = useState<RowData[]>(data);
//   const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
//   const [reverseSortDirection, setReverseSortDirection] = useState(false);

//   useEffect(()=>{
//     const fetchData = async () => {
//       const { data} = await fetchDB();
//       console.log(data)
//       setFetched(data)
//       setSortedData(data)

//     }
//      fetchData()
//     // make sure to catch any error
//     .catch(console.error);;

//   // what will be logged to the console?
   
    
//   },[])

  
//   const setSorting = (field: keyof RowData) => {
//     const reversed = field === sortBy ? !reverseSortDirection : false;
//     setReverseSortDirection(reversed);
//     setSortBy(field);
//     setSortedData(sortData(data, { sortBy: field, reversed, search }));
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { value } = event.currentTarget;
//     setSearch(value);
//     setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
//   };

//   const rows = sortedData.map((row) => (
//     <tr key={row.id}>
//       <td>{`${row.firstName} ${row.secondName} ${row.surname}`}</td>
//       <td>{row.email}</td>
//       <td>{row.DOB}</td>
//       <td>{row.access === 'true' ? <Proceed name={row.firstName} user={row.id} hospital={count.hospital}/> : <RequestAccess hospital={count.hospital} user={row.id} phoneNumber={row.phoneNumber}/>}</td> 
//     </tr>
//   ));

//   return (
//     <ScrollArea>
//       <TextInput
//         placeholder="Search by any field"
//         mb="md"
//         icon={<IconSearch size={14} stroke={1.5} />}
//         value={search}
//         onChange={handleSearchChange}
//       />
//       <Table
//         horizontalSpacing="md"
//         verticalSpacing="xs"
//         sx={{ tableLayout: 'fixed', minWidth: 700 }}
//       >
//         <thead>
//           <tr>
//             <Th
//               sorted={sortBy === 'id'}
//               reversed={reverseSortDirection}
//               onSort={() => setSorting('id')}
//             >
//              Name
//             </Th>
//             <Th
//               sorted={sortBy === 'email'}
//               reversed={reverseSortDirection}
//               onSort={() => setSorting('email')}
//             >
//               Email
//             </Th>
//             <Th
//               sorted={sortBy === 'DOB'}
//               reversed={reverseSortDirection}
//               onSort={() => setSorting('DOB')}
//             >
//              DOB
//             </Th>
//             <th>
//               Action
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows.length > 0 ? (
//             rows
//           ) : (
//             <tr>
//               <td colSpan={3}>
//                 <Text weight={500} align="center">
//                   No patient with the information provided is available
//                 </Text>
//                   <AddPatient />
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </Table>
//     </ScrollArea>
//   );
// }
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Group, Space } from '@mantine/core';

type Patient = {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  // Add other patient details here
};

const patients: Patient[] = [
  { id: '1', name: 'John Doe', age: 45, gender: 'male' },
  { id: '2', name: 'Jane Smith', age: 32, gender: 'female' },
  // Add more patients here
];

const SearchPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const patient = patients.find(
      (patient) => patient.id === searchQuery || patient.name === searchQuery
    );
    if (patient) {
      router.push(`/patients/${patient.id}`); // Redirect to patient details page
    } else {
      router.push('/patients/new'); // Redirect to add new patient page
    }
  };
  const debounce = <F extends (...args: any[]) => void>(
    fn: F,
    delay: number
  ) => {
    let timerId: NodeJS.Timeout;
    return (...args: Parameters<F>) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };
  const handleQueryChange = debounce( async (value) => {
  console.log("User is still typing. Query:", value);
  const q = query(collection(db, "patients"), where("id", "==", value));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
    
  }, 500);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    handleQueryChange(value);
  };

  return (
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "90vh",
      backgroundColor: "#f0f0f0",
    }}
  >
    <div
      style={{
        width: "600px",
        padding: "32px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#333' }}>Search Patients</h1>
      <Group grow >
       
        <label htmlFor="searchQuery" style={{ display: 'block', marginBottom: '1rem', color: '#555' }}>
          Search by Name or ID:
        </label>
        </Group>
        <Group grow >
        <input
          type="text"
          id="searchQuery"
          value={searchQuery}
          onChange={handleInputChange}
          style={{
            padding: '0.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            backgroundColor: '#fff',
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
            marginRight: '1rem',
          }}
        />
        </Group>
        <Space h={'md'} />
        <Group grow >
       
        </Group>

        
      
     

    </div>
    </div>
  );
};

export default SearchPage;
