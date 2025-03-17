import {
    Group,
    Paper,
    Flex,
    // Text
} from '@mantine/core'
import classes from './Header.module.css';
import React from 'react'
import { useSidebarStore } from '../../../store/client/sideBarStore';
import { IconLayoutSidebarLeftCollapse } from '@tabler/icons-react';

const ReUsableHeader = (props) => {
    const { toggleSidebar } = useSidebarStore();

    const { Component } = props;
    return (
        <Paper component='header' className={classes.header}>
            <Flex size="lg" justify="space-between" align="center" gap="1rem">
                <Flex size="lg" gap=".5rem" align="center" flex={1} hiddenFrom="sm" justify='space-between'>
                    <IconLayoutSidebarLeftCollapse className={classes.sidebarMenuBtn} onClick={toggleSidebar} cursor="pointer" />
                    {/* <Text size='lg' fw={600} c="indigo">{userData?.hotel?.name?.toUpperCase()}</Text> */}
                </Flex>
                <Group gap={5}>
                    {Component}
                </Group>
            </Flex>
        </Paper>
    )
}

export default ReUsableHeader