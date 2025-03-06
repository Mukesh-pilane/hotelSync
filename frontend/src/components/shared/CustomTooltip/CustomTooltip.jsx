import { Tooltip, Text } from '@mantine/core'
import React from 'react'

const CustomTooltip = ({
    label,
    text,
    width = 100,
    customComp
}) => {
    return (
        <Tooltip label={label}>
            {customComp ?
                customComp
                :
                <Text w={width} truncate>{text}</Text>
            }
        </Tooltip >)
}

export default CustomTooltip