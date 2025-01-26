import { Container, Group, TextInput, Kbd, Paper } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react';
import classes from './Header.module.css';
import React from 'react'

const ReUsableHeader = (props) => {
    const {serach, setSerch, Button } = props;
    console.log(props)
    return (
        <Paper component='header' className={classes.header}>
            <Container size="lg" className={classes.inner}>
                <TextInput placeholder="Your email" size='md'
                    leftSection={<IconSearch size={16} />}
                    rightSectionWidth={80}
                    onChange={(e)=>console.log(e)}
                    rightSection={<><Kbd>⌘</Kbd> + <Kbd>K</Kbd> </>} />
                <Group gap={5} visibleFrom="xs">
                    {Button}
                </Group>
            </Container>
        </Paper>
    )
}

export default ReUsableHeader