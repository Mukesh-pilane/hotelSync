import {
  Anchor,
  Button,
  Checkbox,
  Group,
  NumberInput,
  Paper,
  PasswordInput,
  Text,
  Title,
} from '@mantine/core';
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useForm } from '@mantine/form';
import classes from './Login.module.scss';
import { Link } from 'react-router-dom';
import { loginUser } from '../../store/server/services/authService';
import { useAuthStore } from '../../store/client/authStore';
import { persistToken, setUserData } from '../../utility/localStorageUtils';
import { showErrorNotification } from '../../utility';

const Login = () => {
  const { setAuth } = useAuthStore((state) => state);
  const schema = z.object({
    mobile: z.number().min(10, { message: 'Mobile must have at least 10 characters' }),
    password: z.string().min(5, { message: 'Password must have at least 5 characters' }),
  });

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      mobile: '',
      password: "",
      termsOfService: false,
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = async (values) => {
    try {
      const { data } = await loginUser({ ...values, mobile: `${values.mobile}` });
      persistToken(data.token)
      setUserData({ mobile: values.mobile, hotel: data.hotel, role: data.role })
      setAuth({ isAuthenticated: true, userData: { mobile: values.mobile, hotel: data.hotel, role: data.role } });
    } catch (error) {
      showErrorNotification(error.response.data.message || "Invalid Credentials")
    }
  };

  return (
    <div className={classes.wrapper}>
      <Paper component='form' onSubmit={form.onSubmit(handleSubmit)} className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back to BookTracker!
        </Title>

        <NumberInput
          label="Mobile Number"
          placeholder="Enter mobile no"
          name="mobile"
          {...form.getInputProps('mobile')}
          size="md"
          hideControls
          maxLength={10}
        />
        <PasswordInput label="Password" placeholder="Your password" mt="md" size="md"
          {...form.getInputProps('password')}
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" {...form.getInputProps('termsOfService', { type: 'checkbox' })} />
          <Anchor size="sm" component={Link} to="/forgotpassword">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" size="md" type="submit" loading={form.submitting} loaderProps={{ type: 'dots' }}>
          Login
        </Button>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{' '}
          <Anchor component={Link} to="/register" fw={700}>
            Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}

export default Login
