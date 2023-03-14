import {
    Avatar,
    Badge,
    Table,
    Group,
    Text,
    ActionIcon,
    Anchor,
    ScrollArea,
    useMantineTheme,
    Button,
  } from '@mantine/core';
  import { IconPencil, IconPill, IconTrash } from '@tabler/icons';
import { Receive } from './receive';
import { AddMedicine } from './addMedicine';
type Medicine = {
  name: string;
  presentation: string;
  price: string;
  amount:number
};
  interface UsersTableProps {
    data:  Record<string, Medicine>
    activate:(value:string) =>void
  }
  
  const jobColors: Record<string, string> = {
    engineer: 'blue',
    manager: 'cyan',
    designer: 'pink',
  };
  
  export function Medicine({ data,activate }: UsersTableProps) {
    const theme = useMantineTheme();
    const rows = Object.entries(data).map(([key, item]) => (
      <tr key={key}>
        <td>
          <Group spacing="sm">
          <ActionIcon variant="transparent"><IconPill /></ActionIcon>
            <Text size="sm" weight={500}>
              {item.name}
            </Text>
          </Group>
        </td>
  
        <td>
          <Badge
            // color={jobColors[item.job.toLowerCase()]}
            variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
          >
            {item.presentation}
          </Badge>
        </td>
        <td>
        <Badge
            // color={jobColors[item.job.toLowerCase()]}
            variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
          >
            {item.price}
          </Badge>
        </td>
        <td>
          <Text size="sm" color="dimmed">
            {item.amount}
          </Text>
        </td>
        <td>
          <Group spacing={0} position="right">
            <Receive medicine={item.name}/>
            {/* <ActionIcon color="red">
              <IconTrash size={16} stroke={1.5} />
            </ActionIcon> */}
          </Group>
        </td>
      </tr>
    ));
  
    return (
        <>
            <ScrollArea>
                <Table  verticalSpacing="sm">
                    <thead>
                    <tr>
                        <th>name</th>
                        <th>presentation</th>
                        <th>price</th>
                        <th>stock</th>
                        <th> Action</th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                    <tr>
                        <td style={{textAlign:'right'}} colSpan={5} >
                           <AddMedicine />
                        </td>
                    </tr>
                </Table>
            </ScrollArea>

        </>
    
    );
  }