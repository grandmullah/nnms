import { Complains } from './Complains';
import { complain } from '@/app/features/complains';
import { Vital } from '@/app/features/vitals';
import { createStyles, Text, Avatar, Group, TypographyStylesProvider, Paper, Stack ,rem, Table } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    comment: {
      color:'white',
    },

  description: {
    color: theme.colors[theme.primaryColor][0],
    maxWidth: rem(300),

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },
  
    body: {
      
      color:'white',
      fontSize: theme.fontSizes.sm,
    },
  
    content: {
      '& > p:last-child': {
        marginBottom: 0,
      },
    },
  }));
export function Notes(data: complain[]) {
    
    const items =  Object.entries( data[0] || {})?.map(([id,value]) =>  ({ id, ...value }) );
    return  (
        <div>
        {items.map((item) => (
            <div key={item.timestamp} >
                <CommentHtml {...item} />
            </div>
              
        ))}
        </div>
  )}

  function CommentHtml({by,complain,timestamp,hospital}:complain) {
    const { classes } = useStyles();
    return (
      <div style={{padding:'1px' , border: '2px solid white'}}  >
        <Group>
          {/* <Avatar src={author.image} alt={author.name} radius="xl" /> */}
          <div >
            <Text className={classes.description} mt="sm" mb={30} size="sm">By : {by} {hospital}
            <Text className={classes.description} mt="sm" mb={30} >
              {new Date(parseInt(timestamp)).toLocaleDateString()}
            </Text></Text>

          </div>
        </Group>
        <TypographyStylesProvider className={classes.body}>
          <div className={classes.content} dangerouslySetInnerHTML={{ __html: complain }} />
        </TypographyStylesProvider>
        {/* <Text size="xs" color="dimmed">
              {new Date(parseInt(timestamp)).toLocaleDateString()}
            </Text> */}
      </div>
    );
}

export function VitalN(data: Vital[]) {
    
  const items =  Object.entries( data[0] || {})?.map(([id,value]) =>  ({ id, ...value }) );
  const rows = items.map((element) => (
    <tr key={element.timestamp}>
      <td>{new Date(parseInt(element.timestamp)).toLocaleDateString()}</td>
      <td>{element.bodyTemperature}</td>
      <td>{element.bloodPressure}</td>
      <td>{element.bodyWeight}</td>
      <td>{element.respiratoryRate}</td>
    </tr>
  ));
  return  (
      <Table>
        <thead>
        <tr>
        <th>DAY</th>
          <th>Body Temperature </th>
          <th>Blood Pressure</th>
          <th>Body Weight</th>
          <th>Respiratory Rate</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
      </Table>
)}

