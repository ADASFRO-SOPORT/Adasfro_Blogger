/**
 * ADASFRO - Widget de Donaciones SINPE Móvil
 * Funcionalidad: Copy-to-clipboard + QR dinámico + validación social
 */

class DonationWidget {
  constructor(config = {}) {
    this.sinpeNumber = config.sinpeNumber || '8888-8888'; // CAMBIAR por número real
    this.containerId = config.containerId || 'donation-widget';
    this.donationGoal = config.donationGoal || 500000; // Meta en colones
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
  }

  render() {
    const percentage = Math.min((this.currentAmount / this.donationGoal) * 100, 100);

    return `
      <div class="donation-widget-container">
        <!-- Header -->
        <div class="donation-header">
          <h3>💛 Apoya Nuestra Misión</h3>
          <p>Tu donación defiende derechos y cambia vidas</p>
        </div>
        
        <!-- Progress Bar -->
        <div class="donation-progress">
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: ${percentage}%"></div>
          </div>
          <div class="progress-text">
            <span class="current-amount">₡${this.formatNumber(this.currentAmount)}</span>
            <span class="goal-amount">de ₡${this.formatNumber(this.donationGoal)}</span>
          </div>
        </div>
        
        <!-- SINPE Móvil Section -->
        <div class="sinpe-section">
          <h4>🇨🇷 Donación SINPE Móvil</h4>
          
          <!-- Número para copiar -->
          <div class="sinpe-number-box">
            <input 
              type="text" 
              id="sinpe-number-input" 
              value="${this.sinpeNumber}" 
              readonly 
              aria-label="Número SINPE Móvil para donaciones"
            />
            <button 
              id="copy-sinpe-btn" 
              class="btn-copy"
              aria-label="Copiar número SINPE"
            >
              📋 Copiar
            </button>
          </div>
          
          <!-- QR Code -->
          <div class="qr-container">
            <canvas id="sinpe-qr-canvas"></canvas>
            <p class="qr-instruction">Escanea con tu app bancaria</p>
          </div>
          
          <!-- Instrucciones -->
          <div class="donation-steps">
            <h5>Pasos para donar:</h5>
            <ol>
              <li>Copia el número o escanea el QR</li>
              <li>Abre tu app bancaria (BAC, BCR, Nacional, etc.)</li>
              <li>Ve a SINPE Móvil → Enviar dinero</li>
              <li>Pega el número: <strong>${this.sinpeNumber}</strong></li>
              <li>¡Listo! Cada colón cuenta 💚</li>
            </ol>
          </div>
        </div>
        
        <!-- Opciones de Monto Sugerido -->
        <div class="suggested-amounts">
          <h5>Montos sugeridos:</h5>
          <div class="amount-buttons">
            <button class="amount-btn" data-amount="2000">₡2,000</button>
            <button class="amount-btn" data-amount="5000">₡5,000</button>
            <button class="amount-btn" data-amount="10000">₡10,000</button>
            <button class="amount-btn" data-amount="custom">Otro monto</button>
          </div>
        </div>
        
        <!-- Social Proof -->
        <div class="social-proof">
          <p>🎉 <strong id="recent-donors-count">5</strong> personas han donado hoy</p>
        </div>
        
        <!-- Notificación de Copiado -->
        <div id="copy-notification" class="copy-notification hidden" role="alert" aria-live="polite">
          ✅ Número copiado al portapapeles
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    // Botón de copiar
    const copyBtn = document.getElementById('copy-sinpe-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => this.copyToClipboard());
    }

    // Botones de monto sugerido
    const amountBtns = document.querySelectorAll('.amount-btn');
    amountBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const amount = e.target.dataset.amount;
        if (amount === 'custom') {
          this.showCustomAmountModal();
        } else {
          this.highlightAmount(amount);
        }
      });
    });
  }

  async copyToClipboard() {
    try {
      // Usar la API moderna de Clipboard
      await navigator.clipboard.writeText(this.sinpeNumber);
      this.showNotification('✅ Número copiado. ¡Abre tu app bancaria!');

      // Tracking (opcional)
      if (typeof gtag !== 'undefined') {
        gtag('event', 'copy_sinpe_number', {
          event_category: 'Donation',
          event_label: 'SINPE Number Copied'
        });
      }
    } catch (err) {
      // Fallback para navegadores antiguos
      const input = document.getElementById('sinpe-number-input');
      input.select();
      document.execCommand('copy');
      this.showNotification('✅ Número copiado al portapapeles');
    }
  }

  showNotification(message) {
    const notification = document.getElementById('copy-notification');
    if (notification) {
      notification.textContent = message;
      notification.classList.remove('hidden');

      setTimeout(() => {
        notification.classList.add('hidden');
      }, 3000);
    }
  }

  generateQR() {
    // Usar la librería qrcode.js desde CDN
    const canvas = document.getElementById('sinpe-qr-canvas');
    if (!canvas || typeof QRCode === 'undefined') {
      console.warn('QRCode library not loaded');
      return;
    }

    // Generar QR con el número SINPE
    QRCode.toCanvas(canvas, this.sinpeNumber, {
      width: 200,
      margin: 2,
      color: {
        dark: '#1A1A1A',
        light: '#FFFFFF'
      }
    }, (error) => {
      if (error) console.error('Error generando QR:', error);
    });
  }

  highlightAmount(amount) {
    // Resaltar el botón seleccionado
    document.querySelectorAll('.amount-btn').forEach(btn => {
      btn.classList.remove('selected');
    });

    const selectedBtn = document.querySelector(`[data-amount="${amount}"]`);
    if (selectedBtn) {
      selectedBtn.classList.add('selected');
    }

    // Mostrar mensaje motivacional
    this.showNotification(`💚 Excelente! ₡${this.formatNumber(amount)} puede financiar materiales de capacitación en LESCO`);
  }

  showCustomAmountModal() {
    const customAmount = prompt('¿Cuánto deseas donar? (en colones)');
    if (customAmount && !isNaN(customAmount)) {
      this.showNotification(`💛 Gracias por tu generosidad de ₡${this.formatNumber(customAmount)}`);
    }
  }

  formatNumber(num) {
    return new Intl.NumberFormat('es-CR').format(num);
  }

  // Método para actualizar el progreso (llamar desde backend o Google Sheets)
  updateProgress(newAmount) {
    this.currentAmount = newAmount;
    const percentage = Math.min((this.currentAmount / this.donationGoal) * 100, 100);

    const progressBar = document.querySelector('.progress-bar-fill');
    const currentAmountEl = document.querySelector('.current-amount');

    if (progressBar) {
      progressBar.style.width = `${percentage}%`;
    }

    if (currentAmountEl) {
      currentAmountEl.textContent = `₡${this.formatNumber(newAmount)}`;
    }
  }
}

// Estilos CSS inline para el widget
const donationStyles = `
<style>
.donation-widget-container {
  background: white;
  border: 3px solid #000;
  padding: 30px;
  box-shadow: 8px 8px 0 #000;
  max-width: 500px;
  margin: 0 auto;
}

.donation-header {
  text-align: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 3px solid #FF4500;
}

.donation-header h3 {
  font-size: 28px;
  font-weight: 900;
  color: #1A1A1A;
  margin-bottom: 8px;
}

.donation-header p {
  font-size: 16px;
  color: #555;
}

/* Progress Bar */
.donation-progress {
  margin-bottom: 24px;
}

.progress-bar-container {
  width: 100%;
  height: 30px;
  background: #f0f0f0;
  border: 3px solid #000;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #00C853, #4CAF50);
  transition: width 0.5s ease;
}

.progress-text {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-weight: 700;
}

.current-amount {
  color: #00C853;
  font-size: 20px;
}

.goal-amount {
  color: #666;
  font-size: 16px;
}

/* SINPE Section */
.sinpe-section {
  background: #FFFDF5;
  border: 3px solid #FFD700;
  padding: 20px;
  margin-bottom: 20px;
}

.sinpe-section h4 {
  margin-bottom: 16px;
  font-weight: 800;
  font-size: 20px;
}

.sinpe-number-box {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

#sinpe-number-input {
  flex: 1;
  padding: 12px;
  font-size: 20px;
  font-weight: 700;
  border: 3px solid #000;
  background: white;
  text-align: center;
  letter-spacing: 1px;
}

.btn-copy {
  padding: 12px 20px;
  font-weight: 800;
  background: #FF4500;
  color: white;
  border: 3px solid #000;
  cursor: pointer;
  transition: transform 0.15s;
}

.btn-copy:hover {
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 #000;
}

.btn-copy:active {
  transform: translate(0, 0);
  box-shadow: none;
}

/* QR Code */
.qr-container {
  text-align: center;
  padding: 20px;
  background: white;
  border: 3px solid #000;
  margin-bottom: 20px;
}

#sinpe-qr-canvas {
  display: block;
  margin: 0 auto;
}

.qr-instruction {
  margin-top: 12px;
  font-size: 14px;
  color: #666;
  font-style: italic;
}

/* Steps */
.donation-steps h5 {
  font-weight: 800;
  margin-bottom: 12px;
}

.donation-steps ol {
  padding-left: 24px;
}

.donation-steps li {
  margin-bottom: 8px;
  line-height: 1.5;
}

/* Suggested Amounts */
.suggested-amounts {
  margin-bottom: 20px;
}

.suggested-amounts h5 {
  font-weight: 800;
  margin-bottom: 12px;
}

.amount-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.amount-btn {
  padding: 16px;
  font-size: 18px;
  font-weight: 700;
  background: white;
  border: 3px solid #000;
  cursor: pointer;
  transition: all 0.15s;
}

.amount-btn:hover {
  background: #FFD700;
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 #000;
}

.amount-btn.selected {
  background: #00C853;
  color: white;
}

/* Social Proof */
.social-proof {
  text-align: center;
  padding: 16px;
  background: #E8F5E9;
  border: 3px solid #00C853;
  margin-top: 20px;
}

.social-proof strong {
  color: #00C853;
  font-size: 24px;
}

/* Notification */
.copy-notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #00C853;
  color: white;
  padding: 16px 24px;
  border: 3px solid #000;
  box-shadow: 4px 4px 0 #000;
  font-weight: 700;
  z-index: 1000;
  transition: opacity 0.3s;
}

.copy-notification.hidden {
  opacity: 0;
  pointer-events: none;
}
</style>
`;

// Inyectar estilos
document.head.insertAdjacentHTML('beforeend', donationStyles);

// Exportar para uso global
window.DonationWidget = DonationWidget;
