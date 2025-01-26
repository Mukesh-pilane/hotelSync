import {
  IconAdjustments,
  IconUsersGroup
} from '@tabler/icons-react';
import { Code, Group, ScrollArea } from '@mantine/core';
import LinksGroup from './LinksGroup';
import UserButton from './UserButton';
import { Logo } from './Logo';
import classes from './Sidebar.module.css';

const mockdata = [
  { label: 'users', icon: IconUsersGroup, link: '/users' },
  {
    label: 'Settings',
    icon: IconAdjustments,
    links: [
      { label: 'Token', link: '/token' },
      { label: 'User Log', link: '/userlogs' },
    ],
  },
];

export default function SideBar() {
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          <Logo style={{ width: 120 }} />
          <Code fw={700}>v3.1.2</Code>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton />
      </div>
    </nav>
  );
}
