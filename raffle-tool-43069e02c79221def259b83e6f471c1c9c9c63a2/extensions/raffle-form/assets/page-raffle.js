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
    const textAbove = document.getElementById('raffle__text-above-image');
    const textBelow = document.getElementById('raffle__text-below-image');
    const raffleForm = document.getElementById('raffle__form');
    const raffleOpenTitle = document.getElementById('raffle__open-title');
    const raffleClosedTitle = document.getElementById('raffle__closed-title');
    const raffleClosedDescription = document.getElementById('raffle__closed-description');
    countdownContainer && countdownContainer.remove();
    textAbove && textAbove.remove();
    textBelow && textBelow.remove();
    raffleForm && raffleForm.remove();
    raffleOpenTitle && raffleOpenTitle.remove();
    raffleClosedTitle && raffleClosedTitle.classList.add('active');
    raffleClosedDescription && raffleClosedDescription.classList.add('active');
  }

  const checkTime = () => {
    const today = new Date().getTime();
    const countdownInSeconds = (deadline - today) / 1000;
    if (countdownInSeconds > 0) {
      updateCountdown(countdownInSeconds);
    } else {
      closeRaffle();
    }
  }

  setInterval(checkTime, 1000);
}

const raffleForm = document.getElementById('raffle__form');

const formSubmitButton = document.getElementById('raffle__form-submit');

const requiredInputsNodeList = document.querySelectorAll('.raffle__required-input');
const requiredInputsArray = Array.from(requiredInputsNodeList);
const sizeInputsNodeList = document.querySelectorAll('#raffle__size-selector-container input')
const sizeInputsArray = Array.from(sizeInputsNodeList);


const checkFormValidity = () => {
  const requiredInputsObject = requiredInputsArray.map(input =>
    ({
      validity: input.validity,
      input: input
    })
  );
  const sizeInputsObject = sizeInputsArray.map(input =>
    ({
      checked: input.checked,
      input: input
    })
  );
  const checkRequiredInputsValidity = inputObject => inputObject.validity.valid;
  const checkSizeInputSelected = inputObject => inputObject.checked;


  requiredInputsObject.every(checkRequiredInputsValidity) && sizeInputsObject.some(checkSizeInputSelected)
    ? formSubmitButton.classList.add('enabled')
    : formSubmitButton.classList.remove('enabled');

  return requiredInputsObject.every(checkRequiredInputsValidity) && sizeInputsObject.some(checkSizeInputSelected)
    ? true
    : false;
}

requiredInputsNodeList.forEach(input => {
  input.addEventListener('blur', () => {
    input.classList.add('blurred'); // blurred class enables red highlighting of any field that is invalid
  })

  input.addEventListener('input', () => {
    checkFormValidity();
  })
})

sizeInputsNodeList.forEach(input => {
  input.addEventListener('input', () => {
    checkFormValidity();
  })
})

const submitForm = e => {
  e.preventDefault();
  const isFormValid = checkFormValidity();
  if (isFormValid) {
    const firstName = raffleForm.querySelector('#first_name').value;
    const lastName = raffleForm.querySelector('#last_name').value;
    const streetAddress = raffleForm.querySelector('#street_address').value;
    const zipCode = raffleForm.querySelector('#zip_code').value;
    const city = raffleForm.querySelector('#city').value;
    const country = raffleForm.querySelector('#country').value;
    const bday = raffleForm.querySelector('#bday').value;
    const instagram = raffleForm.querySelector('#instagram').value;
    const location = raffleForm.querySelector('#locations')?.value || "";
    const email = raffleForm.querySelector('#email').value;
    const productHandle = raffleForm.querySelector('#product_handle').value;
    const articleId = raffleForm.querySelector('#article-id').value;
    const customerId = raffleForm.querySelector('#customer-id').value;
    const productId = raffleForm.querySelector('#product-id').value;
    const variantSku = raffleForm.querySelector('#raffle__size-selector-container input:checked').dataset.sku;
    const variantId = raffleForm.querySelector('#raffle__size-selector-container input:checked').dataset.variantId;

    // Used for data tracking
    const productTitle = raffleForm.querySelector('#product-title').value.replace("'", "");
    const brand = raffleForm.querySelector('#brand').value;
    const productPrice = raffleForm.querySelector('#product-price').value;

    const formData = {
      firstName: firstName,
      lastName: lastName,
      customerId: customerId,
      email: email,
      productID: productId,
      productSizeSKU: variantSku,
      productVariantId: variantId,
      productSlug: productHandle,
      raffleId: articleId,
      raffleName: productHandle,
      streetAddress: streetAddress,
      zipCode: zipCode,
      city: city,
      country: country,
      bday: bday,
      instagram: instagram,
      location: location
    };

    formSubmitButton.style.opacity = 0.15;
    formSubmitButton.innerHTML = `<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`;
    formSubmitButton.disabled = true;

    fetch("https://patta-raffle.vercel.app/api/postRaffleEntry/", {
      method: "POST",
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then((data) => {
      const confirmationContainer = document.querySelector('#raffle__confirmation-message-container');
      raffleForm.remove();
      confirmationContainer.classList.remove('hide');
      window.Phill.tracking.joinRaffle({ name: productTitle, productId, variantId, brand, price: productPrice })
      const targetTop = confirmationContainer.offsetTop - 300;
      window.scrollTo(0, targetTop);
      if (data.message === "Added to raffle form") {
        return
      } else if (data.message === "Updated your raffle request") {
        confirmationContainer.querySelector('p').innerHTML = "We have updated your raffle entry details.";
      } else {
        confirmationContainer.querySelector('h3').remove();
        confirmationContainer.querySelector('p').innerHTML = "There was an error processing your raffle entry. Please try again later or contact support for help.";
      }
    });
  }
}

formSubmitButton && formSubmitButton.addEventListener('click', submitForm);
raffleForm && raffleForm.addEventListener('submit', e => {
  e.preventDefault();
})