// frontend/src/pages/index.js
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div style={{overflowX: 'hidden'}}> 
    {/* Wrapper to prevent horizontal scrollbars from animations */}
      
      <div className={styles.container}>
        <div className={styles.overlay}></div>

        {/* Navigation */}
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <div className={styles.logoBox}>N</div>
            <span>NotesApp</span>
          </div>
          <div className={styles.navLinks}>
            <Link href="/login" className={styles.link}>Sign In</Link>
          </div>
        </nav>

        {/* Hero Section */}
        <main className={styles.main}>
          <div className={styles.grid}>
            <div className={styles.content}>
              <span className={styles.badge}>Version 2.0 Now Live</span>
              <h1 className={styles.title}>
                Capture your thoughts, <br />
                <span className={styles.gradientText}>Organize your life.</span>
              </h1>
              <p className={styles.subtitle}>
                The simple, powerful, and secure way to keep track of your ideas. 
                Sync across devices and never lose a thought again.
              </p>
              <div className={styles.ctaGroup}>
                <Link href="/register" className={styles.primaryBtn}>Get Started Free</Link>
                <Link href="/login" className={styles.secondaryBtn}>Login</Link>
              </div>
            </div>

            <div className={styles.visual}>
              <div className={styles.cardDecoration}></div>
              <div className={styles.cardMockup}>
                <div className={styles.cardHeader}></div>
                <div className={styles.cardLine}></div>
                <div className={styles.cardLine}></div>
                <div className={styles.cardLine}></div>
                <div className={`${styles.cardLine} ${styles.short}`}></div>
                <div className={styles.cardLine}></div>
                <div style={{marginTop: '30px', width: '100px', height: '30px', background: '#4f46e5', borderRadius: '6px'}}></div>
              </div>
            </div>
          </div>
        </main>

        {/* WAVE SVG DIVIDER (Transitions from Color to White) */}
        <div className={styles.waveContainer}>
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className={styles.shapeFill}></path>
            </svg>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Why use NotesApp?</h2>
        
        <div className={styles.featureGrid}>
          {/* Card 1 */}
          <div className={styles.featureCard}>
            <div className={styles.iconBox}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <h3 className={styles.featureTitle}>Bank-Grade Security</h3>
            <p className={styles.featureText}>
              Your notes are encrypted and stored securely. Only you have access to your personal data.
            </p>
          </div>

          {/* Card 2 */}
          <div className={styles.featureCard}>
            <div className={styles.iconBox}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
            </div>
            <h3 className={styles.featureTitle}>Lightning Fast</h3>
            <p className={styles.featureText}>
              Built with Next.js for instant loading times. No more waiting for your app to open.
            </p>
          </div>

          {/* Card 3 */}
          <div className={styles.featureCard}>
            <div className={styles.iconBox}>
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <h3 className={styles.featureTitle}>Access Anywhere</h3>
            <p className={styles.featureText}>
              Whether you are on your phone, tablet, or desktop, your notes sync automatically.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.logoBox} style={{margin: '0 auto', background: '#374151'}}>N</div>
        <p className={styles.footerText}>© {new Date().getFullYear()} NotesApp. All rights reserved.</p>
        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>Privacy</a>
          <a href="#" className={styles.footerLink}>Terms</a>
          <a href="#" className={styles.footerLink}>Contact</a>
        </div>
      </footer>

    </div>
  );
}