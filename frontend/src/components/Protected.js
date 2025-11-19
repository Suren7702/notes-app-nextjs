import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../context/AuthContext';

export default function Protected({ children }) {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading]);
  if (loading || !user) return <div className="p-4">Loading...</div>;
  return children;
}
