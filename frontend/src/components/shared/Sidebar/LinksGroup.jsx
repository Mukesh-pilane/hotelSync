import { useState } from 'react';
import { IconCalendarStats, IconChevronRight } from '@tabler/icons-react';
import { Box, Collapse, Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import classes from './LinksGroup.module.css';
import { Link } from 'react-router-dom';

export default function LinksGroup({ icon: Icon, label, link, initiallyOpened, links }) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? links : []).map((link) => (
    <Text component={Link} className={classes.link} to={link.link} key={link.label}>
      {link.label}
    </Text>
  ));

  return (
    <>
      <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
        <Group justify="space-between" gap={0} style={{ textDecoration:"none", color:"inherit" }} component={link ? Link : 'div'}  to={link}>
          <Box style={{ display: 'flex', alignItems: 'center', textDecoration:"none", color:"inherit" }}>
            <ThemeIcon variant="light" size={30}>
              <Icon size={18} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              size={16}
              style={{ transform: opened ? 'rotate(-90deg)' : 'none' }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}

const mockdata = {
  label: 'Releases',
  icon: IconCalendarStats,
  links: [
    { label: 'Upcoming releases', link: '/' },
    { label: 'Previous releases', link: '/' },
    { label: 'Releases schedule', link: '/' },
  ],
};

export function NavbarLinksGroup() {
  return (
    <Box mih={220} p="md">
      <LinksGroup {...mockdata} />
    </Box>
  );
}
