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
  import { IconPencil, IconTrash } from '@tabler/icons';
  
  interface UsersTableProps {
    data: { avatar: string; name: string; job: string; email: string; phone: string }[];
    activate:(value:string) =>void
  }
  
  const jobColors: Record<string, string> = {
    engineer: 'blue',
    manager: 'cyan',
    designer: 'pink',
  };
  
  export function Medicine({ data,activate }: UsersTableProps) {
    const theme = useMantineTheme();
    const rows = data.map((item) => (
      <tr key={item.name}>
        <td>
          <Group spacing="sm">
            <Avatar size={30} src={item.avatar} radius={30} />
            <Text size="sm" weight={500}>
              {item.name}
            </Text>
          </Group>
        </td>
  
        <td>
          <Badge
            color={jobColors[item.job.toLowerCase()]}
            variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
          >
            {item.job}
          </Badge>
        </td>
        <td>
          <Anchor<'a'> size="sm" href="#" onClick={(event) => event.preventDefault()}>
            {item.email}
          </Anchor>
        </td>
        <td>
          <Text size="sm" color="dimmed">
            {item.phone}
          </Text>
        </td>
        <td>
          <Group spacing={0} position="right">
            <ActionIcon>
              <IconPencil size={16} stroke={1.5} />
            </ActionIcon>
            <ActionIcon color="red">
              <IconTrash size={16} stroke={1.5} />
            </ActionIcon>
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
                        <th>Employee</th>
                        <th>Job title</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th />
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                    <tr>
                        <td style={{textAlign:'right'}} colSpan={5} >
                        <Button  onClick={() => activate('Order')} variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}>make request</Button>
                        </td>
                    </tr>
                </Table>
            </ScrollArea>

        </>
    
    );
  }