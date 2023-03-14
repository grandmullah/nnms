import { useDisclosure, useCounter } from '@mantine/hooks';
import { Modal, Button, Group, Text, Badge, ActionIcon } from '@mantine/core';
import { IconPencil } from '@tabler/icons';
import { OrderPharmaceuticals } from './AddOrder';
interface propss {
    medicine:string
}
export function Receive({medicine}:propss) {
  const [opened, { close, open }] = useDisclosure(false);
  const [count, { increment, decrement }] = useCounter(3, { min: 0 });
  const closing = () => {
    close()
  }
  const badges = Array(count)
    .fill(0)
    .map((_, index) => <Badge key={index}>Badge {index}</Badge>);

  return (
    <>
      <Modal  size='xl' opened={opened} onClose={close}  title="Modal size auto">
        <Text>Update </Text>

        

        
        <OrderPharmaceuticals medicine={medicine}  closing={closing} />
      
      </Modal>
      <Group position="center">
        <ActionIcon  onClick={open}>
              <IconPencil size={16} stroke={1.5} />
        </ActionIcon>
      </Group>
    </>
  );
}