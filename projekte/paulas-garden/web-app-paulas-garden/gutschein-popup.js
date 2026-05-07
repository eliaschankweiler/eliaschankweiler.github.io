document.addEventListener('DOMContentLoaded', function() {
  const popup = document.querySelector('.popup');
  const closeBtn = document.querySelector('.popup .close-btn');
  const confirmationPopup = document.querySelector('.confirmation-popup');
  const confirmationCloseBtn = confirmationPopup.querySelector('.close-btn');

  const wunschbetragInput = document.getElementById('wunschbetrag');
  const wunschbetragRadio = document.querySelector('input[name="wunschbetrag"][value="wunschbetrag"]');

  wunschbetragInput.addEventListener('focus', () => {
    wunschbetragRadio.checked = true;
  });

  const form = document.querySelector('form');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const selectedMotiv = document.getElementById('motiv').value;
    const beschenktePerson = document.getElementById('beschenkte-person').value;

    const radioWunschbetrag = document.querySelector('input[name="wunschbetrag"]:checked');

    let selectedWert = '';

    if (radioWunschbetrag) {
      if (radioWunschbetrag.value === 'wunschbetrag') {
        selectedWert = document.getElementById('wunschbetrag').value;
      } else {
        selectedWert = radioWunschbetrag.value;
      }
    }

    const motivBildPfad = motivBilder[selectedMotiv];

    // Bereinigt den Wert: Entfernt "Euro" (case-insensitive), falls der User es eingegeben hat,
    // damit es später im Template-String nicht doppelt erscheint.
    const cleanedWert = selectedWert.toString().replace(/euro/gi, '').trim();

    document.getElementById('popup-motiv').src = motivBildPfad;
    document.getElementById('popup-fuer').textContent = `für: ${beschenktePerson}`;
    document.getElementById('popup-wert').textContent = `wert: ${cleanedWert} euro`;

    popup.classList.remove('hidden');
  });

  closeBtn.addEventListener('click', function() {
    popup.classList.add('hidden');
  });

  const bestellenButton = document.querySelector('.gutschein-preview button');

  bestellenButton.addEventListener('click', function() {
    popup.classList.add('hidden');
    confirmationPopup.classList.remove('hidden');
  });
  
  confirmationCloseBtn.addEventListener('click', function() {
    confirmationPopup.classList.add('hidden');
  });
});
