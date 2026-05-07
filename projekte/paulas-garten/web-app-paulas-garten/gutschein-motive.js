const motivBilder = {
    'roses': './assets/images/Gutscheine-Paulas-Garden-Roses-and-more.jpg',
    'flower': './assets/images/Gutscheine-Paulas-Garden-Flowerpower.jpg',
    'happy-bees': './assets/images/Gutscheine-Paulas-Garden-Happy-Bees.jpg',
    'spooky-halloween': './assets/images/Gutscheine-Paulas-Garden-Spooky-Halloween.jpg'
  };

  const motivSelect = document.getElementById('motiv');
  const vorschauBild = document.querySelector('.vorschau');

  motivSelect.addEventListener('change', function() {
    const selectedValue = motivSelect.value;
    if (motivBilder[selectedValue]) {
      vorschauBild.src = motivBilder[selectedValue];
    }
  });