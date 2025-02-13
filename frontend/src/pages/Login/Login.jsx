import {
  Anchor,
  Button,
  Checkbox,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import classes from './Login.module.scss';
import { Link } from 'react-router-dom';

const AuthenticationImage = () => {
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back to HotelSync!
        </Title>

        <TextInput label="Email address" placeholder="hello@gmail.com" size="md" />
        <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor size="sm" component={Link} to="/forgotpassword">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" size="md">
          Login
        </Button>
      </Paper>
    </div>
  );
}

export default AuthenticationImage
