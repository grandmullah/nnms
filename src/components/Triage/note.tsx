import { Complains } from './Complains';
import { complain } from '@/app/features/complains';
import { createStyles, Text, Avatar, Group, TypographyStylesProvider, Paper, Stack } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    comment: {
      padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
    },
  
    body: {
      paddingLeft: 54,
      paddingTop: theme.spacing.sm,
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
      <Paper  style={{margin:'2px'}} className={classes.comment}>
        <Group>
          {/* <Avatar src={author.image} alt={author.name} radius="xl" /> */}
          <div>
            <Text size="sm">By : {by} {hospital}</Text>
            <Text size="xs" color="dimmed">
              {new Date(parseInt(timestamp)).toLocaleDateString()}
            </Text>
          </div>
        </Group>
        <TypographyStylesProvider className={classes.body}>
          <div className={classes.content} dangerouslySetInnerHTML={{ __html: complain }} />
        </TypographyStylesProvider>
        {/* <Text size="xs" color="dimmed">
              {new Date(parseInt(timestamp)).toLocaleDateString()}
            </Text> */}
      </Paper>
    );
}