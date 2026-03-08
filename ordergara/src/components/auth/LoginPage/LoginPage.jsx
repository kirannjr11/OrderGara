import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router';
import { toast } from 'sonner';
import { loginSuccess } from '../../../store/slices/authSlice.js';
import { loginAdmin } from '../../../api/api.js';
import './LoginPage.css';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const { data } = await loginAdmin(form);
      dispatch(loginSuccess(data));
      toast.success('Welcome back!');
      navigate('/admin');
    } catch {
      toast.error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login__card">
        <div className="login__header">
          <div className="login__logo">
            <i className="fa-solid fa-store"></i>
          </div>
          <h1 className="login__title">OrderGara</h1>
          <p className="login__subtitle">Sign in to your admin account</p>
        </div>

        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__field">
            <label className="login__label" htmlFor="email">Email</label>
            <div className="login__input-wrap">
              <i className="fa-solid fa-envelope login__input-icon"></i>
              <input
                id="email"
                name="email"
                type="email"
                className="login__input"
                placeholder="admin@restaurant.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="login__field">
            <label className="login__label" htmlFor="password">Password</label>
            <div className="login__input-wrap">
              <i className="fa-solid fa-lock login__input-icon"></i>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                className="login__input"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="login__toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>

          <button type="submit" className="login__btn" disabled={loading}>
            {loading ? (
              <><i className="fa-solid fa-spinner fa-spin"></i> Signing in...</>
            ) : (
              <><i className="fa-solid fa-right-to-bracket"></i> Sign In</>
            )}
          </button>
        </form>

        <p className="login__back">
          <Link to="/" className="login__back-link">
            <i className="fa-solid fa-arrow-left"></i> Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
