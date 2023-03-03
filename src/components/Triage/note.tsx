import { Complains } from './Complains';
import { complain } from '@/app/features/complains';
import { createStyles, Text, Avatar, Group, TypographyStylesProvider, Paper, Stack } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    comment: {
      color:'white',
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
            <div>
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
          <div style={{color:'white'}} >
            <Text size="sm">By : {by} {hospital}
            <Text size="xs" color="white">
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