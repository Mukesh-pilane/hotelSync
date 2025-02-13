import { Flex, Text } from '@mantine/core';
import classes from './TopBar.module.css';
import { IconLayoutSidebarLeftCollapse } from '@tabler/icons-react';
import { useSidebarStore } from '../../../store/client/sideBarStore';
import { useAuthStore } from '../../../store/client/authStore';
import { useMediaQuery } from '@mantine/hooks';

export default function TopBar() {
  const { toggleSidebar } = useSidebarStore();
  const { userData } = useAuthStore((state) => state);
  const matches = useMediaQuery('(min-width: 56.25em)');


    return (
        <header className={classes.header}>
            <Flex size="lg" align="center" flex={1} p="10px 20px" justify='space-between'>
              <IconLayoutSidebarLeftCollapse onClick={toggleSidebar}/>
              <Text size='md' fw={600} c="blue">{userData.hotel.toUpperCase()}</Text>
              </Flex>
        </header>
    );
}