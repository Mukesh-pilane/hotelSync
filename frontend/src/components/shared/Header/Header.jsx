import { useState } from 'react';
import { Anchor, Burger, Container, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './Header.module.css';
import { useNavigate } from 'react-router-dom';

const links = [
    { link: '/pricing', label: 'Pricing' },
    { link: '/login', label: 'SignUp' },
    { link: '/register', label: 'SignIn' },
];

export default function Header() {
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState(links[0].link);
    const navigate = useNavigate()

    const items = links.map((link) => (
        <Anchor
            key={link.label}
            to={link.link}
            className={classes.link}
            data-active={active === link.link || undefined}
            onClick={(event) => {
                event.preventDefault();
                setActive(link.link);
                navigate(link.link)
            }}
        >
            {link.label}
        </Anchor>
    ));

    return (
        <header className={classes.header}>
            <Container size="lg" className={classes.inner}>
                <MantineLogo size={28} />
                <Group gap={5} visibleFrom="xs">
                    {items}
                </Group>
                <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
            </Container>
        </header>
    );
}