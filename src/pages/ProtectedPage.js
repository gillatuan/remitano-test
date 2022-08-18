import { useAuth } from 'context/AuthContext'

export const ProtectedPage = () => {
  const auth = useAuth()

  console.log('auth.user', auth.user);

  return <h3>ProtectedPage</h3>;
};
