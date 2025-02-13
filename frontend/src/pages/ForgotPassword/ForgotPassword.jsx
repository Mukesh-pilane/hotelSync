import { IconArrowLeft } from '@tabler/icons-react';
import {
    Anchor,
    Box,
    Button,
    Center,
    Container,
    Group,
    Paper,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import './ForgotPassword.module.css'; // Assuming the CSS file has been renamed accordingly
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
    return (
        <Container size={460} my={30}>
            <Title className="title" ta="center">
                Forgot your password?
            </Title>
            <Text c="dimmed" fz="sm" ta="center">
                Enter your email to get a reset link
            </Text>

            <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                <TextInput label="Your email" placeholder="me@mantine.dev" required />
                <Group justify="space-between" mt="lg" className="controls">
                    <Anchor c="dimmed" size="sm" className="control" component={Link} to='/login'>
                        <Center inline>
                            <IconArrowLeft size={12} stroke={1.5} />
                            <Box ml={5}>Back to the login page</Box>
                        </Center>
                    </Anchor>
                    <Button className="control">Reset password</Button>
                </Group>
            </Paper>
        </Container>
    );
}
