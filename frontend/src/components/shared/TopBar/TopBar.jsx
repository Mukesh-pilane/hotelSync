import { Flex } from '@mantine/core';
import classes from './TopBar.module.css';
import { IconLayoutSidebarLeftCollapse } from '@tabler/icons-react';
import { useSidebarStore } from '../../../store/client/sideBarStore';

export default function TopBar() {
  const { toggleSidebar } = useSidebarStore();


  return (
    <header className={classes.header}>
      <Flex size="lg" align="center" flex={1} p="10px 20px" hiddenFrom="sm" justify='space-between'>
        <IconLayoutSidebarLeftCollapse className={classes.sidebarMenuBtn} onClick={toggleSidebar} />
      </Flex>
    </header>
  );
}