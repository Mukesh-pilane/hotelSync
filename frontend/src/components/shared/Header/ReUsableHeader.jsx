import { Group, Paper, Flex } from '@mantine/core'
import classes from './Header.module.css';
import React from 'react'

const ReUsableHeader = (props) => {
    const { Component } = props;
    return (
        <Paper component='header' className={classes.header}>
            <Flex size="lg" justify="flex-end" align="center" gap="1rem">
                <Group gap={5}>
                    {Component}
                </Group>
            </Flex>
        </Paper>
    )
}

export default ReUsableHeader