import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!password) {
      setError('Administrator key is required');
      return;
    }

    setLoading(true);
    try {
      await login(password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Invalid administrator key');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mesh-gradient flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative floating orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-teal-500/[0.06] rounded-full blur-3xl pointer-events-none animate-float"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-amber-500/[0.04] rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: '-2s' }}></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center relative z-10">
        <div className="w-16 h-16 glass-strong rounded-2xl flex items-center justify-center text-teal-400 mb-6 glow-teal">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-center text-3xl font-display font-bold text-white">EduVentures</h2>
        <p className="mt-2 text-center text-sm text-white/40 font-medium">
          Admin Portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Card variant="elevated" className="py-8 px-4 sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            <Input
              label="Administrator Key"
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              }
            />

            <Button
              type="submit"
              variant="gradient"
              fullWidth
              size="lg"
              loading={loading}
              className="text-base"
            >
              Access Dashboard &rarr;
            </Button>

            <div className="text-center mt-4">
              <a href="#" className="font-medium text-sm text-teal-400/70 hover:text-teal-400 transition-colors">
                Trouble logging in? Contact support
              </a>
            </div>
          </form>
        </Card>
        
        <p className="text-center text-xs text-white/20 mt-8">
          &copy; {new Date().getFullYear()} EduVentures Admin System
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
