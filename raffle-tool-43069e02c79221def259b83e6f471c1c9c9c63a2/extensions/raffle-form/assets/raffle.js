const countdownContainer = document.getElementById('raffle__countdown-container');

if (countdownContainer) {
  const deadline = countdownContainer.dataset.deadline;

  const updateCountdown = countdownInSeconds => {
    const countdownDays = Math.floor(countdownInSeconds / (60 * 60 * 24)).toLocaleString(undefined, {minimumIntegerDigits: 2});
    const countdownHours = Math.floor((countdownInSeconds % (60 * 60 * 24)) / (60 * 60)).toLocaleString(undefined, {minimumIntegerDigits: 2});
    const countdownMinutes = Math.floor((countdownInSeconds % (60 * 60)) / (60)).toLocaleString(undefined, {minimumIntegerDigits: 2});
    const countdownSeconds = Math.floor((countdownInSeconds % (60))).toLocaleString(undefined, {minimumIntegerDigits: 2});
    document.getElementById('raffle__countdown-day').innerHTML = countdownDays;
    document.getElementById('raffle__countdown-hrs').innerHTML = countdownHours;
    document.getElementById('raffle__countdown-min').innerHTML = countdownMinutes;
    document.getElementById('raffle__countdown-sec').innerHTML = countdownSeconds;
  }

  const closeRaffle = () => {
    const raffleForm = document.getElementById('raffle__form');
    const raffleOpenTitle = document.getElementById('raffle__open-title');
    const raffleClosedTitle = document.getElementById('raffle__closed-title');
    countdownContainer && countdownContainer.remove();
    raffleForm && raffleForm.remove();
    raffleOpenTitle && raffleOpenTitle.remove();
  }

  const checkTime = () => {
    const today = new Date().getTime();
    const countdownInSeconds = (deadline - today) / 1000;
    if (countdownInSeconds > 0) {
      updateCountdown(countdownInSeconds);
      if (countdownContainer.classList.contains('hidden')){
        countdownContainer.classList.remove('hidden')
      }

    } else {
      closeRaffle();
    }
  }

  setInterval(checkTime, 1000);
}


const raffleForm = document.getElementById('raffle-form');
const formSubmitButton = document.getElementById('submitButton');
const confirmationContainer = document.querySelector('#raffle__confirmation-message-container');
const updateContainer = document.querySelector('#raffle__update-message-container');

const submitForm = e => {
  e.preventDefault();

  const raffleId = raffleForm.querySelector('input[id="raffle-id"]').value;
  const customerId = raffleForm.querySelector('input[id="customer-id"]').value;
  const productId = raffleForm.querySelector('input[id="product-id"]').value;
  const productTitle = raffleForm.querySelector('input[id="product-title"]').value;
  const firstName = raffleForm.querySelector('input[name="firstName"]').value;
  const lastName = raffleForm.querySelector('input[name="lastName"]').value;
  const streetAddress = raffleForm.querySelector('input[name="streetAddress"]').value;
  const zipCode = raffleForm.querySelector('input[name="zipCode"]').value;
  const city = raffleForm.querySelector('input[name="city"]').value;
  const country = raffleForm.querySelector('input[name="country"]').value;
  const birthday = raffleForm.querySelector('input[name="birthday"]').value;

  const formData = {
    raffleId: raffleId,
    customerId: customerId,
    productId: productId,
    productTitle: productTitle,
    firstName: firstName,
    lastName: lastName,
    streetAddress: streetAddress,
    zipCode: zipCode,
    city: city,
    country: country,
    birthday: birthday
  };

  // Send form data to the server using fetch or AJAX request
  fetch('/apps/raffle/raffle_entry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => {
      console.log(response); // Debugging console log
      return response.json();
    })
    .then(data => {
      console.log(data); // Debugging console log
      console.log(JSON.stringify(formData));

      // Hide any previous success messages
      confirmationContainer.classList.add('hidden');
      updateContainer.classList.add('hidden');
      

      // Display success or error message to the user
      if (data.message === 'Added to raffle form') {
        confirmationContainer.classList.remove('hidden');
        window.scrollTo(0, confirmationContainer.offsetTop - 300);
        // Success message for new raffle entry
      } else if (data.message === 'Updated your raffle request') {
        updateContainer.classList.remove('hidden');
        window.scrollTo(0, updateContainer.offsetTop - 300);
       // Success message for raffle entry update
      } else if (data.message === 'Problem with adding your raffle details') {
      
        
      } else {
        displayErrorMessage(data.message);
      }
    })
    .catch(error => {
      console.error(error);
      // Handle any error that occurs during the request
    });
};

formSubmitButton && formSubmitButton.addEventListener('click', submitForm);
raffleForm && raffleForm.addEventListener('submit', e => {
  e.preventDefault();
});

console.log("raffle.js yes working");

