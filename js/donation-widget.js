/**
 * ADASFRO - Widget de Donaciones
 * Colores oficiales del Sistema de Diseño
 */

class DonationWidget {
  constructor(config = {}) {
    this.sinpeNumber = config.sinpeNumber || '8888-8888';
    this.containerId = config.containerId || 'donation-widget';
    this.donationGoal = config.donationGoal || 500000;
    this.currentAmount = config.currentAmount || 0;

    this.init();
  }

  init() {
    const container = document.getElementById(this.containerId);
    if (!container) {
      console.error(`Contenedor #${this.containerId} no encontrado`);
      return;
    }

    container.innerHTML = this.render();
    this.attachEventListeners();
    this.generateQR();
    this.animateProgress();
  }

  render() {
    const percentage = Math.min((this.currentAmount / this.donationGoal) * 100, 100);

    return `
      <div class="donation-widget-adasfro">
        <!-- Header -->
        <div class="donation-header">
          <div class="donation-icon">💛</div>
          <h3>Impulsa el Cambio</h3>
          <p class="subtitle">Tu donación defiende derechos</p>
        </div>
        
        <!-- Progress Circle -->
        <div class="progress-circle-container">
          <svg class="progress-ring" width="180" height="180">
            <circle class="progress-ring-bg" cx="90" cy="90" r="75" />
            <circle class="progress-ring-fill" cx="90" cy="90" r="75" 
              stroke-dasharray="471" 
              stroke-dashoffset="${471 - (471 * percentage) / 100}" />
          </svg>
          <div class="progress-text">
            <div class="progress-percentage">${Math.round(percentage)}%</div>
            <div class="progress-label">de la meta</div>
          </div>
        </div>
        
        <!-- Montos -->
        <div class="donation-amounts">
          <div class="amount-raised">
            <span class="amount-value">₡${this.formatNumber(this.currentAmount)}</span>
            <span class="amount-label">Recaudado</span>
          </div>
          <div class="amount-goal">
            <span class="amount-value">₡${this.formatNumber(this.donationGoal)}</span>
            <span class="amount-label">Meta</span>
          </div>
        </div>
        
        <!-- Divider -->
        <div class="divider"></div>
        
        <!-- SINPE Section -->
        <div class="sinpe-section">
          <h4 class="sinpe-title">🇨🇷 Dona vía SINPE Móvil</h4>
          
          <!-- Número con botón -->
          <div class="sinpe-input-group">
            <input 
              type="text" 
              id="sinpe-number-input" 
              value="${this.sinpeNumber}" 
              readonly 
              aria-label="Número SINPE Móvil"
            />
            <button 
              id="copy-sinpe-btn" 
              class="btn-copy-adasfro"
              aria-label="Copiar número SINPE"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copiar
            </button>
          </div>
          
          <!-- QR Code -->
          <div class="qr-container">
            <div class="qr-wrapper">
              <canvas id="sinpe-qr-canvas"></canvas>
            </div>
            <p class="qr-hint">Escanea desde tu app bancaria</p>
          </div>
        </div>
        
        <!-- Montos Sugeridos -->
        <div class="suggested-amounts">
          <p class="amounts-label">Montos sugeridos:</p>
          <div class="amount-buttons-grid">
            <button class="amount-btn-adasfro" data-amount="2000">₡2,000</button>
            <button class="amount-btn-adasfro" data-amount="5000">₡5,000</button>
            <button class="amount-btn-adasfro" data-amount="10000">₡10,000</button>
            <button class="amount-btn-adasfro" data-amount="custom">Otro</button>
          </div>
        </div>
        
        <!-- Pasos -->
        <details class="steps-accordion">
          <summary>¿Cómo donar?</summary>
          <ol class="steps-list">
            <li>Abre tu app bancaria</li>
            <li>Ve a SINPE Móvil</li>
            <li>Ingresa: <strong>${this.sinpeNumber}</strong></li>
            <li>Confirma el monto</li>
            <li>¡Listo! 🎉</li>
          </ol>
        </details>
        
        <!-- Social Proof -->
        <div class="social-proof">
          <div class="proof-icon">🌟</div>
          <p><strong id="recent-donors-count">8</strong> personas donaron esta semana</p>
        </div>
        
        <!-- Notificación -->
        <div id="copy-notification-adasfro" class="notification-adasfro" role="alert" aria-live="polite">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Número copiado al portapapeles</span>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    const copyBtn = document.getElementById('copy-sinpe-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => this.copyToClipboard());
    }

    const amountBtns = document.querySelectorAll('.amount-btn-adasfro');
    amountBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const amount = e.target.dataset.amount;
        if (amount === 'custom') {
          this.showCustomAmountModal();
        } else {
          this.selectAmount(e.target);
        }
      });
    });
  }

  async copyToClipboard() {
    try {
      await navigator.clipboard.writeText(this.sinpeNumber);
      this.showNotification();

      const btn = document.getElementById('copy-sinpe-btn');
      btn.classList.add('copied');
      setTimeout(() => btn.classList.remove('copied'), 2000);

    } catch (err) {
      const input = document.getElementById('sinpe-number-input');
      input.select();
      document.execCommand('copy');
      this.showNotification();
    }
  }

  showNotification() {
    const notification = document.getElementById('copy-notification-adasfro');
    if (notification) {
      notification.classList.add('show');
      setTimeout(() => {
        notification.classList.remove('show');
      }, 3000);
    }
  }

  generateQR() {
    const canvas = document.getElementById('sinpe-qr-canvas');
    if (!canvas || typeof QRCode === 'undefined') {
      console.warn('QRCode library not loaded');
      return;
    }

    QRCode.toCanvas(canvas, this.sinpeNumber, {
      width: 140,
      margin: 1,
      color: {
        dark: '#1A237E',
        light: '#FFFFFF'
      }
    }, (error) => {
      if (error) console.error('Error generando QR:', error);
    });
  }

  selectAmount(btn) {
    document.querySelectorAll('.amount-btn-adasfro').forEach(b => {
      b.classList.remove('selected');
    });
    btn.classList.add('selected');
  }

  showCustomAmountModal() {
    const customAmount = prompt('¿Cuánto deseas donar? (en colones)');
    if (customAmount && !isNaN(customAmount)) {
      this.showNotification();
    }
  }

  animateProgress() {
    const circle = document.querySelector('.progress-ring-fill');
    if (circle) {
      circle.style.transition = 'stroke-dashoffset 1.5s ease-out';
    }
  }

  formatNumber(num) {
    return new Intl.NumberFormat('es-CR').format(num);
  }

  updateProgress(newAmount) {
    this.currentAmount = newAmount;
    const percentage = Math.min((this.currentAmount / this.donationGoal) * 100, 100);

    const circle = document.querySelector('.progress-ring-fill');
    const percentageEl = document.querySelector('.progress-percentage');
    const amountEl = document.querySelector('.amount-raised .amount-value');

    if (circle) {
      circle.style.strokeDashoffset = 471 - (471 * percentage) / 100;
    }

    if (percentageEl) {
      percentageEl.textContent = `${Math.round(percentage)}%`;
    }

    if (amountEl) {
      amountEl.textContent = `₡${this.formatNumber(newAmount)}`;
    }
  }
}

// Estilos CSS con colores oficiales ADASFRO
const donationStylesAdasfro = `
<style>
.donation-widget-adasfro {
  background: white;
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #E2E8F0;
  max-width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}

/* Header */
.donation-header {
  text-align: center;
  margin-bottom: 32px;
}

.donation-icon {
  font-size: 48px;
  margin-bottom: 12px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.donation-header h3 {
  font-size: 24px;
  font-weight: 700;
  color: #1A237E;
  margin-bottom: 8px;
}

.donation-header .subtitle {
  color: #64748B;
  font-size: 14px;
  margin: 0;
}

/* Progress Circle */
.progress-circle-container {
  position: relative;
  width: 180px;
  margin: 0 auto 24px;
}

.progress-ring {
  transform: rotate(-90deg);
}

.progress-ring-bg {
  fill: none;
  stroke: #E2E8F0;
  stroke-width: 10;
}

.progress-ring-fill {
  fill: none;
  stroke: #00695C;
  stroke-width: 10;
  stroke-linecap: round;
  transition: stroke-dashoffset 1.5s ease-out;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.progress-percentage {
  font-size: 32px;
  font-weight: 700;
  color: #00695C;
  line-height: 1;
}

.progress-label {
  font-size: 12px;
  color: #64748B;
  margin-top: 4px;
}

/* Amounts */
.donation-amounts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.amount-raised,
.amount-goal {
  text-align: center;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 12px;
}

.amount-value {
  display: block;
  font-size: 18px;
  font-weight: 700;
  color: #1E293B;
  margin-bottom: 4px;
}

.amount-raised .amount-value {
  color: #2E7D32;
}

.amount-label {
  font-size: 12px;
  color: #64748B;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Divider */
.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, #E2E8F0, transparent);
  margin: 24px 0;
}

/* SINPE Section */
.sinpe-section {
  margin-bottom: 24px;
}

.sinpe-title {
  font-size: 16px;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 16px;
  text-align: center;
}

.sinpe-input-group {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

#sinpe-number-input {
  flex: 1;
  padding: 14px;
  font-size: 18px;
  font-weight: 600;
  border: 2px solid #E2E8F0;
  border-radius: 8px;
  background: #F8FAFC;
  text-align: center;
  letter-spacing: 1px;
  color: #1E293B;
  max-width: 100%;
  box-sizing: border-box;
}

.btn-copy-adasfro {
  padding: 14px 20px;
  font-weight: 600;
  background: linear-gradient(135deg, #FF8F00 0%, #FFA000 100%);
  color: white;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.btn-copy-adasfro:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.btn-copy-adasfro.copied {
  background: linear-gradient(135deg, #2E7D32 0%, #45B369 100%);
}

/* QR Code */
.qr-container {
  text-align: center;
}

.qr-wrapper {
  display: inline-block;
  padding: 16px;
  background: white;
  border: 2px solid #E2E8F0;
  border-radius: 12px;
  margin-bottom: 12px;
}

#sinpe-qr-canvas {
  display: block;
}

.qr-hint {
  font-size: 13px;
  color: #64748B;
  font-style: italic;
  margin: 0;
}

/* Suggested Amounts */
.suggested-amounts {
  margin-bottom: 20px;
}

.amounts-label {
  font-size: 14px;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 12px;
  text-align: center;
}

.amount-buttons-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.amount-btn-adasfro {
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
  background: white;
  color: #1E293B;
  border: 2px solid #E2E8F0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.amount-btn-adasfro:hover {
  border-color: #00695C;
  background: #F8FAFC;
  transform: translateY(-2px);
}

.amount-btn-adasfro.selected {
  background: linear-gradient(135deg, #00695C 0%, #4DB6AC 100%);
  color: white;
  border-color: #00695C;
}

/* Accordion */
.steps-accordion {
  margin-bottom: 20px;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  overflow: hidden;
}

.steps-accordion summary {
  padding: 14px 16px;
  font-weight: 600;
  color: #1E293B;
  cursor: pointer;
  background: #F8FAFC;
  user-select: none;
  transition: background 0.2s;
}

.steps-accordion summary:hover {
  background: #E2E8F0;
}

.steps-list {
  padding: 16px 16px 16px 36px;
  margin: 0;
  background: white;
}

.steps-list li {
  margin-bottom: 8px;
  color: #64748B;
  line-height: 1.6;
}

.steps-list strong {
  color: #1E293B;
}

/* Social Proof */
.social-proof {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px;
  background: linear-gradient(135deg, #FFF9E6 0%, #FFF5CC 100%);
  border-radius: 12px;
  border: 1px solid #FFE5B4;
}

.proof-icon {
  font-size: 24px;
}

.social-proof p {
  margin: 0;
  font-size: 14px;
  color: #1E293B;
}

.social-proof strong {
  color: #FF8F00;
  font-size: 18px;
}

/* Notification */
.notification-adasfro {
  position: fixed;
  bottom: -100px;
  right: 24px;
  background: linear-gradient(135deg, #2E7D32 0%, #45B369 100%);
  color: white;
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  transition: bottom 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  max-width: calc(100vw - 48px);
}

.notification-adasfro.show {
  bottom: 24px;
}

.notification-adasfro svg {
  flex-shrink: 0;
}

/* Responsive */
@media (max-width: 480px) {
  .donation-widget-adasfro {
    padding: 24px 16px;
  }
  
  .donation-amounts {
    grid-template-columns: 1fr;
  }
  
  .amount-buttons-grid {
    grid-template-columns: 1fr;
  }
  
  .sinpe-input-group {
    flex-direction: column;
    gap: 12px;
  }
  
  .btn-copy-adasfro {
    width: 100%;
    justify-content: center;
  }
  
  #sinpe-number-input {
    font-size: 16px;
    padding: 12px;
  }
  
  .notification-adasfro {
    left: 16px;
    right: 16px;
    max-width: calc(100vw - 32px);
  }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', donationStylesAdasfro);
window.DonationWidget = DonationWidget;
