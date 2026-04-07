import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import { useAuthStore } from '../app/store/authStore';
import { Button } from '../components/common/Button';
import { ErrorState } from '../components/common/ErrorState';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export const RegisterPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const { register, handleSubmit, formState } = useForm({ resolver: zodResolver(schema) });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setAuth(data);
      navigate('/');
    },
  });

  return (
    <div className="mx-auto max-w-md space-y-4 glass-panel rounded-2xl p-6">
      <h1 className="font-heading text-3xl">Create Account</h1>
      <form className="space-y-3" onSubmit={handleSubmit((values) => mutation.mutate(values))}>
        <input className="w-full rounded-lg bg-white/5 p-3" placeholder="Name" {...register('name')} />
        {formState.errors.name && <p className="text-xs text-rust">{formState.errors.name.message}</p>}

        <input className="w-full rounded-lg bg-white/5 p-3" placeholder="Email" {...register('email')} />
        {formState.errors.email && <p className="text-xs text-rust">{formState.errors.email.message}</p>}

        <input
          type="password"
          className="w-full rounded-lg bg-white/5 p-3"
          placeholder="Password"
          {...register('password')}
        />
        {formState.errors.password && (
          <p className="text-xs text-rust">{formState.errors.password.message}</p>
        )}

        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? 'Creating...' : 'Create Account'}
        </Button>
      </form>

      {mutation.isError && (
        <ErrorState message={mutation.error?.response?.data?.message || 'Registration failed'} />
      )}

      <p className="text-sm text-pearl/75">
        Already have an account?{' '}
        <Link className="text-sand underline" to="/login">
          Sign in
        </Link>
      </p>
    </div>
  );
};
