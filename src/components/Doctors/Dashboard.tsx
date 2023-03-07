import { useState } from 'react';
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  Badge,
} from '@mantine/core';
import { keys } from '@mantine/utils';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons';

import { getFirestore , collection, getDocs , query, where, onSnapshot} from "firebase/firestore";
import {app} from '../../firebase'
const db = getFirestore(app)
import { useSelector, } from 'react-redux'
import { RootState } from '@/app/store';
import { AuthState } from '@/app/features/authSlice';
import React from 'react';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}));

interface RowData {
  name: string;
  email: string;
  DOB: string;
  id:string
}

interface TableSortProps {
  data: RowData[];
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles();
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

let count:AuthState
const fetchPatients = async () => {
    let dat:RowData[] = []
    let final:TableSortProps = {
       data:dat
    }
    const querySnapshot = await getDocs(collection(db, "patients"));
    querySnapshot.forEach(async (doc) => {
      // doc.data() is never undefined for query doc snapshots
      if (await doc.data().state &&  doc.data().state.active && doc.data().state.hospital === count.hospital){
         console.log(doc.data())
         let user:RowData = {
            name: doc.data().firstName,
            email: doc.data().email,
            DOB: `${(new Date(`${(doc.data().DOB).toDate()}`).getFullYear())  - new Date().getFullYear()}` ,
            id:doc.data().id
         }
         dat.push(user)
      }
    });
    return final
}

export function Dashboard() {
    count = useSelector((state:RootState) =>state.Auth )
    console.log(count)
    const router = useRouter()
  const [search, setSearch] = useState('');
  const [data,setFetched] = useState<RowData[]>([])
  const [sortedData, setSortedData] = useState<RowData[]>(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  React.useEffect(()=>{
    const fetchData = async () => {
        const {data} = await fetchPatients()
        console.log('patients',data)
        setFetched(data)
        setSortedData(data)
      }
       fetchData()
      // make sure to catch any error
      .catch(console.error);;
  
    // what will be logged to the console?
  },[])

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const rows = sortedData.map((row) => (
    <tr key={row.name}>
      <td>{row.name}</td>
      <td>{row.email}</td>
      <td>{row.DOB}</td>
      <td onClick={()=> router.push(`/hospital/doctor/${row.id}`)}>
      <Badge variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>proceed</Badge> </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        icon={<IconSearch size={14} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        sx={{ tableLayout: 'fixed', minWidth: 700 }}
      >
        <thead>
          <tr>
            <Th
              sorted={sortBy === 'name'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('name')}
            >
              Name
            </Th>
            <Th
              sorted={sortBy === 'email'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('email')}
            >
              Email
            </Th>
            <Th
              sorted={sortBy === 'DOB'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('DOB')}
            >
              Age
            </Th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={3}>
                <Text weight={500} align="center">
                  No patients at the moment
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
}