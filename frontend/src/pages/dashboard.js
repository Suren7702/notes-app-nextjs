// frontend/src/pages/dashboard.js
import Protected from '../components/Protected';
import { useContext, useEffect, useState } from 'react';
import API from '../lib/api';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Dashboard.module.css';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  
  // States for Data
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // States for Modals
  const [editingNote, setEditingNote] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  
  // Profile Modal State
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [photo, setPhoto] = useState(null);

  // Sidebar Toggle State
  const [isOpen, setIsOpen] = useState(true);

  // 1. On Load: Check screen size AND load saved photo
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setIsOpen(false);
      else setIsOpen(true);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // LOAD PHOTO FROM STORAGE
    try {
      const savedPhoto = localStorage.getItem('user_photo');
      if (savedPhoto) setPhoto(savedPhoto);
    } catch (e) {
      console.error("Error loading photo", e);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchNotes = async (search = q) => {
    try {
      setLoading(true);
      const res = await API.get('/notes' + (search ? `?q=${encodeURIComponent(search)}` : ''));
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNotes(); }, []);

  // --- NOTE ACTIONS ---
  const add = async (e) => {
    e?.preventDefault();
    if (!title.trim()) return alert('Title required');
    try {
      setSaving(true);
      await API.post('/notes', { title: title.trim(), content: content.trim() });
      setTitle('');
      setContent('');
      fetchNotes();
    } catch (err) {
      alert('Failed to add note');
    } finally {
      setSaving(false);
    }
  };

  const startEditing = (note) => {
    setEditingNote(note);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await API.put(`/notes/${editingNote._id}`, { title: editTitle, content: editContent });
      setEditingNote(null);
      fetchNotes();
    } catch (err) {
      alert('Failed to update note');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (id) => setDeleteId(id);
  
  const executeDelete = async () => {
    if (!deleteId) return;
    try {
      setSaving(true);
      await API.delete(`/notes/${deleteId}`);
      setDeleteId(null);
      fetchNotes();
    } catch (err) {
      alert('Delete failed');
    } finally {
      setSaving(false);
    }
  };

  // --- IMAGE UPLOAD ---
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File is too big! Please select an image under 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 300;
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          try {
            localStorage.setItem('user_photo', compressedBase64);
            setPhoto(compressedBase64);
          } catch (err) {
            alert("Image is still too complex. Please try a simpler image.");
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhoto(null);
    localStorage.removeItem('user_photo');
  };

  const sidebarClass = isOpen ? styles.sidebar : `${styles.sidebar} ${styles.sidebarHidden}`;
  const mainClass = isOpen ? styles.main : `${styles.main} ${styles.mainFull}`;

  return (
    <Protected>
      <div className={styles.container}>
        
        <aside className={sidebarClass}>
          {/* LOGO AREA + CLOSE BUTTON */}
          <div className={styles.logoArea}>
            <div className={styles.logoIcon}>N</div>
            <span>NotesApp</span>
            
            {/* NEW: CLOSE BUTTON (Visible only inside sidebar) */}
            <button 
              onClick={() => setIsOpen(false)} 
              className={styles.sidebarCloseBtn}
              title="Close Menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <nav>
            <a href="#" className={styles.activeLink + " " + styles.navLink}><span>🏠</span> Dashboard</a>
            <a href="#" className={styles.navLink}><span>⭐</span> Favorites</a>
            <a href="#" className={styles.navLink}><span>📂</span> Archive</a>
            <button 
              onClick={() => setShowProfileModal(true)} 
              className={styles.navLink} 
              style={{background: 'none', border: 'none', width: '100%', cursor: 'pointer', fontSize: '16px'}}
            >
              <span>⚙️</span> Settings
            </button>
          </nav>
        </aside>

        <main className={mainClass}>
          <header className={styles.header}>
            <div className={styles.headerLeft}>
              {/* HAMBURGER BUTTON (To Open) */}
              <button onClick={() => setIsOpen(!isOpen)} className={styles.menuBtn}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              </button>
              <div className={styles.searchContainer}>
                <span className={styles.searchIcon}>🔍</span>
                <input type="text" placeholder="Search..." className={styles.searchInput} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && fetchNotes(q)} />
              </div>
            </div>
            
            <div className={styles.profileSection}>
              <div className={styles.avatar} onClick={() => setShowProfileModal(true)} title="Profile Settings">
                {photo ? <img src={photo} alt="Profile" /> : (user?.name ? user.name.charAt(0).toUpperCase() : 'U')}
              </div>
              <button onClick={logout} className={styles.logoutBtn}>Logout</button>
            </div>
          </header>

          <div className={styles.content}>
            <div className={styles.welcomeSection}>
              <h1 className={styles.welcomeTitle}>Hello, {user?.name || 'User'}!</h1>
            </div>

            <div className={styles.createCard}>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className={styles.createTitleInput} />
              <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Take a note..." className={styles.createBodyInput} />
              <div className={styles.createFooter}>
                <button onClick={add} disabled={saving} className={styles.addBtn}>{saving ? 'Saving...' : 'Add Note'}</button>
              </div>
            </div>

            {notes.length === 0 && !loading ? (
              <p className="text-gray-400 text-center mt-10">No notes found.</p>
            ) : (
              <div className={styles.notesGrid}>
                {notes.map((n) => (
                  <article key={n._id} className={styles.noteCard}>
                    <div>
                      <h4 className={styles.noteTitle}>{n.title}</h4>
                      <p className={styles.noteBody}>{n.content}</p>
                    </div>
                    <div className={styles.noteFooter}>
                      <span className={styles.noteDate}>{new Date(n.createdAt).toLocaleDateString()}</span>
                      <div style={{display: 'flex', gap: '8px'}}>
                        <button onClick={() => startEditing(n)} className={styles.editBtn} title="Edit">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </button>
                        <button onClick={() => confirmDelete(n._id)} className={styles.deleteBtn} title="Delete">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* MODALS (Edit, Delete, Profile) - Kept same as before */}
          {editingNote && (
            <div className={styles.modalOverlay}>
              <div className={styles.modal}>
                <h2 className={styles.modalTitle}>Edit Note</h2>
                <form onSubmit={saveEdit}>
                  <input className={styles.modalInput} value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="Title" required />
                  <textarea className={styles.modalInput} value={editContent} onChange={(e) => setEditContent(e.target.value)} placeholder="Content" rows={5} style={{resize: 'vertical'}} />
                  <div className={styles.modalActions}>
                    <button type="button" onClick={() => setEditingNote(null)} className={styles.cancelBtn}>Cancel</button>
                    <button type="submit" disabled={saving} className={styles.saveBtn}>{saving ? 'Saving...' : 'Save Changes'}</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {deleteId && (
            <div className={styles.modalOverlay}>
              <div className={styles.modal} style={{maxWidth: '400px'}}>
                <h2 className={styles.modalTitle} style={{color: '#ef4444'}}>Delete Note?</h2>
                <p style={{marginBottom: '24px', color: '#4b5563'}}>Are you sure? This cannot be undone.</p>
                <div className={styles.modalActions}>
                  <button onClick={() => setDeleteId(null)} className={styles.cancelBtn}>Cancel</button>
                  <button onClick={executeDelete} disabled={saving} className={styles.dangerBtn}>{saving ? 'Deleting...' : 'Yes, Delete'}</button>
                </div>
              </div>
            </div>
          )}

          {showProfileModal && (
            <div className={styles.modalOverlay}>
              <div className={styles.modal}>
                <h2 className={styles.modalTitle}>Profile Settings</h2>
                <div className={styles.profileCenter}>
                  <div className={styles.largeAvatar}>
                    {photo ? <img src={photo} alt="Profile" className={styles.avatarImg} /> : (user?.name ? user.name.charAt(0).toUpperCase() : 'U')}
                  </div>
                  <input type="file" id="fileUpload" accept="image/*" onChange={handleImageUpload} className={styles.hiddenInput} />
                  <label htmlFor="fileUpload" className={styles.uploadBtnLabel}><span>📷</span> Change Photo</label>
                  {photo && <button onClick={removePhoto} className={styles.removePhotoBtn}>Remove Photo</button>}
                </div>
                <div className={styles.modalActions} style={{justifyContent: 'center'}}>
                  <button onClick={() => setShowProfileModal(false)} className={styles.saveBtn} style={{width: '100%'}}>Done</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </Protected>
  );
}