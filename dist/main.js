const generatorSection = document.querySelector("#generator");
const checkerSection = document.querySelector("#checker");
const generatorSectionButton = document.querySelector("#switch-to-generator");
const checkerSectionButton = document.querySelector("#switch-to-checker");
const generatedPasswordTB = document.querySelector("#password-output");
const lengthSliderLabel = document.querySelector("#length-slider-label");
const lengthSliderSpan = document.querySelector("#length-value");
const lengthSlider = document.querySelector("#length-slider");
const uppercaseCheckbox = document.querySelector("#check-uppercase");
const numbersCheckbox = document.querySelector("#check-numbers");
const symbolsCheckbox = document.querySelector("#check-symbols");
const generatorButton = document.querySelector("#generate-password");
const passwordInput = document.querySelector("#password-input");
const strengthSpan = document.querySelector("#password-strength");
generatorSectionButton?.addEventListener('click', () => {
    viewSwitcher("generator");
});
checkerSectionButton?.addEventListener('click', () => {
    viewSwitcher("checker");
});
lengthSlider?.addEventListener('input', () => {
    if (lengthSlider && lengthSliderSpan) {
        lengthSliderSpan.textContent = lengthSlider.value;
    }
});
generatorButton?.addEventListener('click', () => {
    if (generatedPasswordTB && uppercaseCheckbox && numbersCheckbox && symbolsCheckbox && lengthSlider) {
        generatedPasswordTB.value = generatePassword(uppercaseCheckbox?.checked, numbersCheckbox?.checked, symbolsCheckbox?.checked, parseInt(lengthSlider?.value));
    }
});
passwordInput?.addEventListener('input', () => {
    if (strengthSpan) {
        strengthSpan.textContent = getStrength(passwordInput.value);
    }
});
function viewSwitcher(viewId) {
    if (viewId === "generator") {
        generatorSection?.classList.remove("hidden");
        checkerSection?.classList.add("hidden");
        generatorSectionButton?.classList.add("sel");
        checkerSectionButton?.classList.remove("sel");
    }
    if (viewId === "checker") {
        generatorSection?.classList.add("hidden");
        checkerSection?.classList.remove("hidden");
        generatorSectionButton?.classList.remove("sel");
        checkerSectionButton?.classList.add("sel");
    }
}
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbersChars = '0123456789';
const symbolsChars = '!@#$%^&*()_+-=[]{}|;:",.<>/?';
function generatePassword(useUppercase, useNumbers, useSymbols, length) {
    let chars = lowercaseChars;
    let password = "";
    if (useUppercase) {
        chars += uppercaseChars;
    }
    if (useNumbers) {
        chars += numbersChars;
    }
    if (useSymbols) {
        chars += symbolsChars;
    }
    for (let i = 0; i < length; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }
    return password;
}
function getStrength(password) {
    let score = 0;
    for (const n of password) {
        score += 2;
        if (uppercaseChars.includes(n)) {
            score += 10;
        }
        if (numbersChars.includes(n)) {
            score += 10;
        }
        if (symbolsChars.includes(n)) {
            score += 10;
        }
    }
    if (password.length < 8) {
        score -= 15;
    }
    if (score < 30) {
        return "Very weak...";
    }
    else if (score <= 50) {
        return "Weak.";
    }
    else if (score <= 75) {
        return "Medium.";
    }
    else if (score <= 99) {
        return "Strong.";
    }
    return "Very Strong!";
}
export {};
