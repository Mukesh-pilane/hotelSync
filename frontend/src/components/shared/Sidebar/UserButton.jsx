import { IconLogout } from '@tabler/icons-react';
import { IconUserHexagon } from '@tabler/icons-react';

import { Group, Text, ThemeIcon, Tooltip, UnstyledButton } from '@mantine/core';
import classes from './UserButton.module.css';
import { useAuthStore } from '../../../store/client/authStore';

export default function UserButton() {
  const { userData, logout } = useAuthStore((state) => state);


  return (
    <UnstyledButton className={classes.user}>
      <Group className={classes.group}>
        <ThemeIcon variant="light" size={30}>
          <IconUserHexagon stroke={2} />
        </ThemeIcon>
        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {userData?.mobile}
          </Text>
        </div>
        <Tooltip arrowOffset={10} arrowSize={4} label="Logout" withArrow position="right-start">
          <IconLogout onClick={() => {
            logout()
          }} size={24} stroke={1.5} />
        </Tooltip>
      </Group>
    </UnstyledButton>
  );
}
