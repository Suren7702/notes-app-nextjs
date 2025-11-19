// frontend/src/pages/register.js
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

// IMPORT THE SAME CSS FILE TO KEEP DESIGN CONSISTENT
import styles from '../styles/Login.module.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // State for "Eye" icon
  const [showPassword, setShowPassword] = useState(false);
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useContext(AuthContext);
  const router = useRouter();

  // PROFESSIONAL VALIDATION
  const validate = () => {
    if (!name.trim()) return 'Name is required';
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
      await register(name, email, password);
      router.push('/dashboard');
    } catch (err) {
      const msg = err?.response?.data?.message || 'Registration failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // SVG Icons for Password
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
        
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.logo}>N</div>
          <h2 className={styles.title}>Create Account</h2>
          <p className={styles.subtitle}>Join NotesApp for free today</p>
        </div>

        <form onSubmit={submit}>
          {/* Error Message Box */}
          {error && <div className={styles.errorMsg}>{error}</div>}

          {/* NAME INPUT */}
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>Full Name</label>
            <input
              id="name"
              type="text"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />
          </div>

          {/* EMAIL INPUT */}
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

          {/* PASSWORD INPUT */}
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <div className={styles.passwordWrapper}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={styles.passwordInput}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password (6+ chars)"
              />
              <button 
                type="button" 
                className={styles.toggleBtn}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button type="submit" disabled={loading} className={styles.submitBtn} style={{ marginTop: '10px' }}>
            {loading ? 'Creating account...' : 'Register'}
          </button>

          {/* FOOTER */}
          <div className={styles.footer}>
            Already have an account? 
            <Link href="/login" className={styles.footerLink}>
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}