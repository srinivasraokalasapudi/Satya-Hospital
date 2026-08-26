import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, ShieldCheck, Users, HeartPulse, Clock } from 'lucide-react';
import { toast } from 'react-hot-toast';
import logo from '../../assets/logo.png';
import BannerImg from '../../assets/LoginBg.png';
import { usePatientSession, useAdminSession, getUsers, setSession, checkAdminCredentials, setAdminSession } from '../../utils/auth';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const patient = usePatientSession();
  const admin = useAdminSession();
  const [role, setRole] = useState(location.state?.role === 'admin' ? 'admin' : 'patient');
  const [form, setForm] = useState({ id: location.state?.email || '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [adminForm, setAdminForm] = useState({ email: '', password: '' });
  const [showAdminPw, setShowAdminPw] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (patient) navigate('/', { replace: true }) }, [patient, navigate]);
  useEffect(() => { if (admin) navigate('/admin', { replace: true }) }, [admin, navigate]);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const setA = k => e => setAdminForm(f => ({ ...f, [k]: e.target.value }));

  const signIn = e => {
    e.preventDefault();
    if (!form.id || !form.password) { toast.error('Enter your email/mobile and password'); return }
    setBusy(true);
    const idv = form.id.trim().toLowerCase();
    const match = getUsers().find(u => (u.email.toLowerCase() === idv || u.phone === form.id.trim()) && u.password === form.password);
    if (!match) { toast.error('Invalid email/mobile or password'); setBusy(false); return }
    setSession({ name: match.name, email: match.email, phone: match.phone || '', age: match.age || '', gender: match.gender || '' });
    toast.success('Login successful — redirecting...');
    setTimeout(() => navigate('/'), 700);
  };

  const adminSignIn = e => {
    e.preventDefault();
    if (!adminForm.email || !adminForm.password) { toast.error('Enter admin email and password'); return }
    setBusy(true);
    if (!checkAdminCredentials(adminForm.email, adminForm.password)) { toast.error('Invalid admin credentials'); setBusy(false); return }
    setAdminSession({ email: adminForm.email.trim() });
    toast.success('Welcome back, admin');
    setTimeout(() => navigate('/admin'), 500);
  };

  return <main className="loginSplit">
    <div className="loginSplitImage" style={{ backgroundImage: `url(${BannerImg})` }}>
      <div className="loginWedgeTopGold"></div>
      <div className="loginWedgeTop"></div>
      <div className="loginWedgeBottomGold"></div>
      <div className="loginWedgeBottom"></div>
      <img src={logo} className="loginPinBadge" />
      <div className="loginLeftContent">
        <div className="loginBrandCentered">
          <img src={logo} className="loginBadge" />
          <h1>Satya-Hospital</h1>
          <div className="goldRule"><span></span><i></i><span></span></div>
          <p className="loginTag">CARE &nbsp;•&nbsp; COMPASSION &nbsp;•&nbsp; COMMITMENT</p>
        </div>
        <blockquote className="loginQuote2">&ldquo;Your health, our priority&rdquo;</blockquote>
        <p className="loginSub2">Care today, healthy tomorrow.</p>
        <div className="loginFeatures">
          <div><ShieldCheck /><b>Trusted Care</b><small>Your health is in safe hands.</small></div>
          <div><Users /><b>Expert Doctors</b><small>Experienced &amp; compassionate team.</small></div>
          <div><HeartPulse /><b>Advanced Facilities</b><small>Modern technology for better care.</small></div>
          <div><Clock /><b>24/7 Support</b><small>We're here for you, anytime.</small></div>
        </div>
      </div>
    </div>
    <div className="loginSplitForm">
      <div className="loginBrand">
        <img src={logo} className="loginBadge small" />
        <h1>Satya-Hospital</h1>
        <div className="goldRule"><span></span><i></i><span></span></div>
        <p>Hospital Management System</p>
      </div>
      <div className="loginRoleTabs">
        <button type="button" className={role === 'patient' ? 'active' : ''} onClick={() => setRole('patient')}><User size={16} /> Patient / Customer</button>
        <button type="button" className={role === 'admin' ? 'active' : ''} onClick={() => setRole('admin')}><ShieldCheck size={16} /> Admin / Staff</button>
      </div>
      {role === 'patient' ? <>
        <h3 className="loginFormTitle">Patient Login</h3>
        <form className="splitForm" onSubmit={signIn}>
          <label>Email / Mobile Number</label>
          <div className="inputWrap"><User size={16} /><input placeholder="Enter your email or mobile number" value={form.id} onChange={set('id')} /></div>
          <label>Password</label>
          <div className="inputWrap"><Lock size={16} /><input type={showPw ? 'text' : 'password'} placeholder="Enter your password" value={form.password} onChange={set('password')} /><button type="button" className="pwToggle" onClick={() => setShowPw(s => !s)}>{showPw ? <EyeOff size={16} /> : <Eye size={16} />}</button></div>
          <div className="forgotRow"><button type="button" className="linklike" onClick={() => toast('Please contact support to reset your password')}>Forgot Password?</button></div>
          <button type="submit" className="splitBtn" disabled={busy}><Users size={18} /> {busy ? 'Signing in...' : 'Sign In'}</button>
          <p className="splitFoot">Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </form>
      </> : <>
        <h3 className="loginFormTitle">Admin Login</h3>
        <form className="splitForm" onSubmit={adminSignIn}>
          <label>Admin Email</label>
          <div className="inputWrap"><User size={16} /><input placeholder="Enter admin email" value={adminForm.email} onChange={setA('email')} /></div>
          <label>Password</label>
          <div className="inputWrap"><Lock size={16} /><input type={showAdminPw ? 'text' : 'password'} placeholder="Enter admin password" value={adminForm.password} onChange={setA('password')} /><button type="button" className="pwToggle" onClick={() => setShowAdminPw(s => !s)}>{showAdminPw ? <EyeOff size={16} /> : <Eye size={16} />}</button></div>
          <button type="submit" className="splitBtn" disabled={busy}><ShieldCheck size={18} /> {busy ? 'Signing in...' : 'Sign In'}</button>
          <p className="splitFoot">Admin credentials are set in the project's .env file.</p>
        </form>
      </>}
    </div>
  </main>;
}
