import { Flex, Text } from '@mantine/core';
import classes from './TopBar.module.css';
import { IconLayoutSidebarLeftCollapse } from '@tabler/icons-react';
import { useSidebarStore } from '../../../store/client/sideBarStore';
import { useAuthStore } from '../../../store/client/authStore';

export default function TopBar() {
  const { toggleSidebar } = useSidebarStore();
  const { userData } = useAuthStore((state) => state);


  return (
    <header className={classes.header}>
      <Flex size="lg" align="center" flex={1} p="10px 20px" hiddenFrom="sm" justify='space-between'>
          <IconLayoutSidebarLeftCollapse className={classes.sidebarMenuBtn} onClick={toggleSidebar} />
        <Text size='md' fw={600} c="blue">{userData?.hotel?.name?.toUpperCase()}</Text>
      </Flex>
    </header>
  );
}