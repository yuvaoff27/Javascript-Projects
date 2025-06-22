var nameError = document.getElementById('name-error');
var phoneError = document.getElementById('phone-error');
var emailError = document.getElementById('email-error');
var messageError = document.getElementById('message-error');
var submitError = document.getElementById('submit-error');

function validateName() {
    var name = document.getElementById('contact-name').value.trim();

    if (name.length === 0) {
        nameError.innerHTML = 'Name is required';
        return false;
    }

    if (!/^[A-Za-z]+(\s[A-Za-z]+)+$/.test(name)) {
        nameError.innerHTML = 'Write full name';
        return false;
    }

    nameError.innerHTML = '<i class="fas fa-check-circle" style="color: green;"></i>';
    return true;
}

function validatePhone() {
    var phone = document.getElementById('contact-phone').value.trim();

    if (phone.length === 0) {
        phoneError.innerHTML = 'Phone number is required';
        return false;
    }

    if (!/^\d{10}$/.test(phone)) {
        phoneError.innerHTML = 'Enter a valid 10-digit phone number';
        return false;
    }

    phoneError.innerHTML = '<i class="fas fa-check-circle" style="color: green;"></i>';
    return true;
}

function validateEmail() {
    var email = document.getElementById('contact-email').value.trim();

    if (email.length === 0) {
        emailError.innerHTML = 'Email is required';
        return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        emailError.innerHTML = 'Enter a valid email';
        return false;
    }

    emailError.innerHTML = '<i class="fas fa-check-circle" style="color: green;"></i>';
    return true;
}

function validateMessage() {
    var message = document.getElementById('contact-message').value.trim();
    var requiredLength = 10;

    if (message.length < requiredLength) {
        messageError.innerHTML = `Message should be at least ${requiredLength} characters`;
        return false;
    }

    messageError.innerHTML = '<i class="fas fa-check-circle" style="color: green;"></i>';
    return true;
}

function validateForm() {
    var validName = validateName();
    var validPhone = validatePhone();
    var validEmail = validateEmail();
    var validMessage = validateMessage();

    if (!validName || !validPhone || !validEmail || !validMessage) {
        submitError.innerHTML = 'Please fix the errors to submit';
        setTimeout(() => {
            submitError.innerHTML = '';
        }, 3000);
        return false;
    }

    submitError.innerHTML = '';
    alert('Form submitted successfully!');
    return true;
}
