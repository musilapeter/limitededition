import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { useAuthStore } from '../app/store/authStore';
import { Button } from '../components/common/Button';
import { ErrorState } from '../components/common/ErrorState';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((state) => state.setAuth);

  const { register, handleSubmit, formState } = useForm({ resolver: zodResolver(schema) });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAuth(data);
      navigate(location.state?.from?.pathname || '/');
    },
  });

  return (
    <div className="mx-auto max-w-md space-y-4 rounded-2xl border border-black/10 bg-white p-6">
      <h1 className="font-heading text-3xl text-electricLime">Sign In</h1>
      <form className="space-y-3" onSubmit={handleSubmit((values) => mutation.mutate(values))}>
        <input
          className="w-full rounded-lg border border-black/10 bg-white p-3 text-ink"
          placeholder="Email"
          {...register('email')}
        />
        {formState.errors.email && <p className="text-xs text-hotPink">{formState.errors.email.message}</p>}

        <input
          type="password"
          className="w-full rounded-lg border border-black/10 bg-white p-3 text-ink"
          placeholder="Password"
          {...register('password')}
        />
        {formState.errors.password && (
          <p className="text-xs text-hotPink">{formState.errors.password.message}</p>
        )}

        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      {mutation.isError && (
        <ErrorState message={mutation.error?.response?.data?.message || 'Login failed'} />
      )}

      <p className="text-sm text-ink/70">
        New here?{' '}
        <Link className="text-cyberTurquoise underline" to="/register">
          Create account
        </Link>
      </p>
    </div>
  );
};
