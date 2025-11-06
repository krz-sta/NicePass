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
function generatePassword(useUppercase, useNumbers, useSymbols, length) {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbersChars = '0123456789';
    const symbolsChars = '!@#$%^&*()_+-=[]{}|;:",.<>/?';
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
export {};
