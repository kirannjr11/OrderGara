import './LoadingSpinner.css';

export default function LoadingSpinner({ size = 'md', label = '' }) {
  return (
    <div className={`spinner spinner--${size}`}>
      <i className="fa-solid fa-spinner fa-spin spinner__icon"></i>
      {label && <span className="spinner__label">{label}</span>}
    </div>
  );
}
