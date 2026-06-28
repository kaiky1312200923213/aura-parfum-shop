import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Only allow specific admin email
  const adminEmail = 'kaikyono@gmail.com';
  if (!user || user.email !== adminEmail) {
    return <Navigate to="/login" replace />;
  }

  return children;
}