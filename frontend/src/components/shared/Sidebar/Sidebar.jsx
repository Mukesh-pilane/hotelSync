import {
  IconAdjustments,
  IconUsersGroup
} from '@tabler/icons-react';
import { Avatar, Box, Code, Flex, Group, ScrollArea, Text } from '@mantine/core';
import LinksGroup from './LinksGroup';
import UserButton from './UserButton';
import classes from './Sidebar.module.css';
import HotelSync from '../../../assets/svg/hotelSync';
import { useAuthStore } from '../../../store/client/authStore';

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
  const { userData } = useAuthStore((state) => state);

  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          <Flex justify="center" align="center" gap={5}>
            <Avatar color="#6F63E6" radius="50%" style={{ width: 35, height: 35, padding: 5, background: "#6F63E6" }}>
              <HotelSync style={{ fill: "#6F63E6" }} />
            </Avatar>
            <Text size='md' fw={600} c="blue">{userData.hotel.toUpperCase()}</Text>
          </Flex>
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
