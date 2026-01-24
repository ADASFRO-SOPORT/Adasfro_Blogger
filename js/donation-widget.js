/**
 * ADASFRO - Widget de Donaciones Moderno
 * Estilo minimalista con animaciones suaves
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
      <div class="donation-widget-modern">
        <!-- Header con gradiente -->
        <div class="donation-header">
          <div class="donation-icon">💛</div>
          <h3>Impulsa el Cambio</h3>
          <p class="subtitle">Tu donación defiende derechos</p>
        </div>
        
        <!-- Progress Circle Moderno -->
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
        <div class="sinpe-modern">
          <h4 class="sinpe-title">🇨🇷 Dona vía SINPE Móvil</h4>
          
          <!-- Número con botón moderno -->
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
              class="btn-copy-modern"
              aria-label="Copiar número SINPE"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copiar
            </button>
          </div>
          
          <!-- QR Code Minimalista -->
          <div class="qr-modern">
            <div class="qr-wrapper">
              <canvas id="sinpe-qr-canvas"></canvas>
            </div>
            <p class="qr-hint">Escanea desde tu app bancaria</p>
          </div>
        </div>
        
        <!-- Montos Sugeridos -->
        <div class="suggested-amounts-modern">
          <p class="amounts-label">Montos sugeridos:</p>
          <div class="amount-buttons-grid">
            <button class="amount-btn-modern" data-amount="2000">₡2,000</button>
            <button class="amount-btn-modern" data-amount="5000">₡5,000</button>
            <button class="amount-btn-modern" data-amount="10000">₡10,000</button>
            <button class="amount-btn-modern" data-amount="custom">Otro</button>
          </div>
        </div>
        
        <!-- Pasos Simplificados -->
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
        
        <!-- Social Proof Minimalista -->
        <div class="social-proof-modern">
          <div class="proof-icon">🌟</div>
          <p><strong id="recent-donors-count">8</strong> personas donaron esta semana</p>
        </div>
        
        <!-- Notificación Flotante -->
        <div id="copy-notification-modern" class="notification-modern" role="alert" aria-live="polite">
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

    const amountBtns = document.querySelectorAll('.amount-btn-modern');
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

      // Efecto visual en el botón
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
    const notification = document.getElementById('copy-notification-modern');
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
        dark: '#2C3E50',
        light: '#FFFFFF'
      }
    }, (error) => {
      if (error) console.error('Error generando QR:', error);
    });
  }

  selectAmount(btn) {
    document.querySelectorAll('.amount-btn-modern').forEach(b => {
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

// Estilos CSS modernos
const donationStylesModern = `
<style>
.donation-widget-modern {
  background: white;
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border: 1px solid #E9ECEF;
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
  color: #2C3E50;
  margin-bottom: 8px;
}

.donation-header .subtitle {
  color: #6C757D;
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
  stroke: #E9ECEF;
  stroke-width: 10;
}

.progress-ring-fill {
  fill: none;
  stroke: url(#gradient);
  stroke-width: 10;
  stroke-linecap: round;
  transition: stroke-dashoffset 1.5s ease-out;
}

/* Gradiente SVG */
.progress-ring-fill {
  stroke: #4A90E2;
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
  color: #4A90E2;
  line-height: 1;
}

.progress-label {
  font-size: 12px;
  color: #6C757D;
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
  background: #F8F9FA;
  border-radius: 12px;
}

.amount-value {
  display: block;
  font-size: 18px;
  font-weight: 700;
  color: #2C3E50;
  margin-bottom: 4px;
}

.amount-raised .amount-value {
  color: #50C878;
}

.amount-label {
  font-size: 12px;
  color: #6C757D;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Divider */
.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, #E9ECEF, transparent);
  margin: 24px 0;
}

/* SINPE Section */
.sinpe-modern {
  margin-bottom: 24px;
}

.sinpe-title {
  font-size: 16px;
  font-weight: 600;
  color: #2C3E50;
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
  border: 2px solid #E9ECEF;
  border-radius: 12px;
  background: #F8F9FA;
  text-align: center;
  letter-spacing: 1px;
  color: #2C3E50;
}

.btn-copy-modern {
  padding: 14px 20px;
  font-weight: 600;
  background: linear-gradient(135deg, #4A90E2 0%, #2E5C8A 100%);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.btn-copy-modern:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(74, 144, 226, 0.3);
}

.btn-copy-modern.copied {
  background: linear-gradient(135deg, #50C878 0%, #45B369 100%);
}

/* QR Code */
.qr-modern {
  text-align: center;
}

.qr-wrapper {
  display: inline-block;
  padding: 16px;
  background: white;
  border: 2px solid #E9ECEF;
  border-radius: 12px;
  margin-bottom: 12px;
}

#sinpe-qr-canvas {
  display: block;
}

.qr-hint {
  font-size: 13px;
  color: #6C757D;
  font-style: italic;
  margin: 0;
}

/* Suggested Amounts */
.suggested-amounts-modern {
  margin-bottom: 20px;
}

.amounts-label {
  font-size: 14px;
  font-weight: 600;
  color: #2C3E50;
  margin-bottom: 12px;
  text-align: center;
}

.amount-buttons-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.amount-btn-modern {
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
  background: white;
  color: #2C3E50;
  border: 2px solid #E9ECEF;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.amount-btn-modern:hover {
  border-color: #4A90E2;
  background: #F8F9FA;
  transform: translateY(-2px);
}

.amount-btn-modern.selected {
  background: linear-gradient(135deg, #4A90E2 0%, #2E5C8A 100%);
  color: white;
  border-color: #4A90E2;
}

/* Accordion Steps */
.steps-accordion {
  margin-bottom: 20px;
  border: 1px solid #E9ECEF;
  border-radius: 12px;
  overflow: hidden;
}

.steps-accordion summary {
  padding: 14px 16px;
  font-weight: 600;
  color: #2C3E50;
  cursor: pointer;
  background: #F8F9FA;
  user-select: none;
  transition: background 0.2s;
}

.steps-accordion summary:hover {
  background: #E9ECEF;
}

.steps-list {
  padding: 16px 16px 16px 36px;
  margin: 0;
  background: white;
}

.steps-list li {
  margin-bottom: 8px;
  color: #6C757D;
  line-height: 1.6;
}

.steps-list strong {
  color: #2C3E50;
}

/* Social Proof */
.social-proof-modern {
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

.social-proof-modern p {
  margin: 0;
  font-size: 14px;
  color: #2C3E50;
}

.social-proof-modern strong {
  color: #FF6B6B;
  font-size: 18px;
}

/* Notification */
.notification-modern {
  position: fixed;
  bottom: -100px;
  right: 24px;
  background: linear-gradient(135deg, #50C878 0%, #45B369 100%);
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
}

.notification-modern.show {
  bottom: 24px;
}

.notification-modern svg {
  flex-shrink: 0;
}

/* Responsive */
@media (max-width: 480px) {
  .donation-widget-modern {
    padding: 24px 16px;
  }
  
  .donation-amounts {
    grid-template-columns: 1fr;
  }
  
  .amount-buttons-grid {
    grid-template-columns: 1fr;
  }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', donationStylesModern);
window.DonationWidget = DonationWidget;
