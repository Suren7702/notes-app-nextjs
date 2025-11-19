// frontend/src/pages/login.js
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/Login.module.css'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // NEW: State for showing/hiding password
  const [showPassword, setShowPassword] = useState(false);
  
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const router = useRouter();

  const validate = () => {
    if (!email.trim()) return 'Email is required';
    if (!/^\S+@\S+\.\S+$/.test(email)) return 'Enter a valid email';
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return null;
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    const v = validate();
    if (v) return setError(v);

    try {
      setLoading(true);
      await login(email.trim(), password);
      if (remember) localStorage.setItem('rememberEmail', email.trim());
      else localStorage.removeItem('rememberEmail');
      router.push('/dashboard');
    } catch (err) {
      const msg = err?.response?.data?.message || 'Invalid credentials';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      const rem = localStorage.getItem('rememberEmail');
      if (rem) {
        setEmail(rem);
        setRemember(true);
      }
    } catch (err) { console.error(err); }
  }, []);

  // SVG Icons for Eye Open/Close
  const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );

  const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  );

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        
        <div className={styles.header}>
          {/* Animated Logo */}
          <div className={styles.logo}>N</div>
          <h2 className={styles.title}>NotesApp</h2>
          <p className={styles.subtitle}>Sign in to access your dashboard</p>
        </div>

        <form onSubmit={submit}>
          {error && <div className={styles.errorMsg}>{error}</div>}

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email address</label>
            <input
              id="email"
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
            />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.labelRow}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <Link href="/forgot" className={styles.forgotLink}>Forgot password?</Link>
            </div>
            
            {/* PASSWORD INPUT WITH ICON */}
            <div className={styles.passwordWrapper}>
              <input
                id="password"
                // Toggle between text and password
                type={showPassword ? "text" : "password"} 
                className={styles.passwordInput}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              
              {/* Toggle Button */}
              <button 
                type="button" 
                className={styles.toggleBtn}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <div className={styles.rememberRow}>
            <label className={styles.checkboxContainer}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
          </div>

          <button type="submit" disabled={loading} className={styles.submitBtn}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          <div className={styles.footer}>
            New here? 
            <Link href="/register" className={styles.footerLink}>
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}