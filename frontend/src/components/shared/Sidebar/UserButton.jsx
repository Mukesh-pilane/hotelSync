import { IconChevronRight } from '@tabler/icons-react';
import { IconUserHexagon } from '@tabler/icons-react';

import { Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import classes from './UserButton.module.css';

export default function UserButton() {
  return (
    <UnstyledButton className={classes.user}>
      <Group className={classes.group}>
        <ThemeIcon variant="light" size={30}>
          <IconUserHexagon stroke={2} />
        </ThemeIcon>
        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            Harriette Spoonlicker
          </Text>

          <Text color="dimmed" size="xs">
            hspoonlicker@outlook.com
          </Text>
        </div>

        <IconChevronRight size={14} stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
}
