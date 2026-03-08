import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import './PaymentFlow.css';

const METHODS = [
  { id: 'esewa', label: 'eSewa', icon: 'fa-mobile-screen-button', color: '#60bb46', bg: '#f0fdf4' },
  { id: 'khalti', label: 'Khalti', icon: 'fa-wallet', color: '#5c2d91', bg: '#f5f0ff' },
  { id: 'phonepay', label: 'PhonePay', icon: 'fa-phone', color: '#3b82f6', bg: '#eff6ff' },
  { id: 'ibank', label: 'iBank', icon: 'fa-building-columns', color: '#0369a1', bg: '#f0f9ff' },
  { id: 'pos', label: 'POS / Card', icon: 'fa-credit-card', color: '#374151', bg: '#f9fafb' },
  { id: 'cash', label: 'Cash', icon: 'fa-money-bill-wave', color: '#16a34a', bg: '#f0fdf4' },
];

const ORDER_ITEMS = [
  { id: 1, name: 'Classic Burger', qty: 2, price: 15.0 },
  { id: 2, name: 'Iced Latte', qty: 1, price: 5.0 },
  { id: 3, name: 'Caesar Salad', qty: 1, price: 10.0 },
];

const STEPS = ['select', 'processing', 'success'];

export default function PaymentFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState('select');
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [usePoints, setUsePoints] = useState(false);
  const availablePoints = 320;
  const pointsValue = usePoints ? Math.min(availablePoints * 0.01, 5) : 0;

  const subtotal = ORDER_ITEMS.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = subtotal * 0.08;
  const discount = pointsValue;
  const total = subtotal + tax - discount;

  const handlePay = () => {
    if (!selectedMethod) { toast.error('Select a payment method'); return; }
    setStep('processing');
    setTimeout(() => setStep('success'), 2500);
  };

  const handleDone = () => navigate('/');

  if (step === 'processing') {
    return (
      <div className="payment payment--processing">
        <div className="payment__processing-card">
          <div className="payment__spinner">
            <i className="fa-solid fa-spinner fa-spin"></i>
          </div>
          <h2 className="payment__processing-title">Processing Payment</h2>
          <p className="payment__processing-sub">
            Please wait while we confirm your {METHODS.find((m) => m.id === selectedMethod)?.label} payment...
          </p>
          <div className="payment__processing-steps">
            <div className="payment__proc-step payment__proc-step--done">
              <i className="fa-solid fa-circle-check"></i> Order received
            </div>
            <div className="payment__proc-step payment__proc-step--active">
              <i className="fa-solid fa-circle-dot fa-spin"></i> Verifying payment
            </div>
            <div className="payment__proc-step">
              <i className="fa-regular fa-circle"></i> Confirming order
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="payment payment--success">
        <div className="payment__success-card">
          <div className="payment__success-icon">
            <i className="fa-solid fa-circle-check"></i>
          </div>
          <h2 className="payment__success-title">Payment Successful!</h2>
          <p className="payment__success-sub">Your order has been confirmed and sent to the kitchen.</p>

          <div className="payment__success-details">
            <div className="payment__success-row">
              <span>Order ID</span>
              <span className="payment__success-val">#OG-{Date.now().toString().slice(-6)}</span>
            </div>
            <div className="payment__success-row">
              <span>Method</span>
              <span className="payment__success-val">{METHODS.find((m) => m.id === selectedMethod)?.label}</span>
            </div>
            <div className="payment__success-row">
              <span>Amount Paid</span>
              <span className="payment__success-val payment__success-amount">${total.toFixed(2)}</span>
            </div>
            {usePoints && (
              <div className="payment__success-row">
                <span>Points Used</span>
                <span className="payment__success-val">{availablePoints} pts (−${discount.toFixed(2)})</span>
              </div>
            )}
          </div>

          <div className="payment__success-points-earned">
            <i className="fa-solid fa-star"></i>
            <span>You earned <strong>{Math.floor(total * 10)} loyalty points</strong> on this order!</span>
          </div>

          <button className="payment__done-btn" onClick={handleDone}>
            <i className="fa-solid fa-house"></i> Back to Home
          </button>
          <button className="payment__new-btn" onClick={() => navigate(-2)}>
            <i className="fa-solid fa-plus"></i> New Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment">
      <div className="payment__layout">
        {/* Left: Method selection */}
        <div className="payment__left">
          <div className="payment__left-header">
            <button className="payment__back" onClick={() => navigate(-1)}>
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <div>
              <h1 className="payment__title">Select Payment</h1>
              <p className="payment__subtitle">Choose how you'd like to pay</p>
            </div>
          </div>

          <div className="payment__methods">
            {METHODS.map((method) => (
              <button
                key={method.id}
                className={`payment-method ${selectedMethod === method.id ? 'payment-method--selected' : ''}`}
                style={{ '--method-color': method.color, '--method-bg': method.bg }}
                onClick={() => setSelectedMethod(method.id)}
              >
                <div className="payment-method__icon-wrap">
                  <i className={`fa-solid ${method.icon}`}></i>
                </div>
                <span className="payment-method__label">{method.label}</span>
                {selectedMethod === method.id && (
                  <i className="fa-solid fa-circle-check payment-method__check"></i>
                )}
              </button>
            ))}
          </div>

          {/* Loyalty points toggle */}
          <div className="payment__loyalty">
            <div className="payment__loyalty-info">
              <div className="payment__loyalty-icon">
                <i className="fa-solid fa-star"></i>
              </div>
              <div>
                <p className="payment__loyalty-title">Loyalty Points</p>
                <p className="payment__loyalty-sub">You have {availablePoints} pts (≈ ${(availablePoints * 0.01).toFixed(2)} off)</p>
              </div>
            </div>
            <button
              className={`payment__loyalty-toggle ${usePoints ? 'payment__loyalty-toggle--on' : ''}`}
              onClick={() => setUsePoints((p) => !p)}
              aria-label="Toggle loyalty points"
            >
              <span className="payment__loyalty-knob"></span>
            </button>
          </div>
        </div>

        {/* Right: Order summary + Pay */}
        <div className="payment__right">
          <h2 className="payment__summary-title">Order Summary</h2>

          <div className="payment__order-items">
            {ORDER_ITEMS.map((item) => (
              <div key={item.id} className="payment__order-item">
                <div className="payment__order-item-qty">{item.qty}×</div>
                <span className="payment__order-item-name">{item.name}</span>
                <span className="payment__order-item-price">${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="payment__totals">
            <div className="payment__total-row">
              <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="payment__total-row">
              <span>Tax (8%)</span><span>${tax.toFixed(2)}</span>
            </div>
            {usePoints && (
              <div className="payment__total-row payment__total-row--discount">
                <span><i className="fa-solid fa-star"></i> Points Discount</span>
                <span>−${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="payment__total-row payment__total-row--grand">
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            className="payment__pay-btn"
            onClick={handlePay}
            disabled={!selectedMethod}
          >
            {selectedMethod ? (
              <>
                <i className={`fa-solid ${METHODS.find((m) => m.id === selectedMethod)?.icon}`}></i>
                Pay ${total.toFixed(2)} with {METHODS.find((m) => m.id === selectedMethod)?.label}
              </>
            ) : (
              <><i className="fa-solid fa-lock"></i> Select a payment method</>
            )}
          </button>

          <p className="payment__secure">
            <i className="fa-solid fa-shield-halved"></i>
            Secured &amp; encrypted payment
          </p>
        </div>
      </div>
    </div>
  );
}
