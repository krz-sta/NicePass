const generatorSection: HTMLElement | null = document.querySelector("#generator");
const checkerSection: HTMLElement | null = document.querySelector("#checker");

const generatorSectionButton: HTMLButtonElement | null = document.querySelector("#switch-to-generator");
const checkerSectionButton: HTMLButtonElement | null = document.querySelector("#switch-to-checker");

const generatedPasswordTB: HTMLInputElement | null = document.querySelector("#password-output");

const lengthSliderLabel: HTMLLabelElement | null = document.querySelector("#length-slider-label");
const lengthSliderSpan: HTMLElement | null = document.querySelector("#length-value");
const lengthSlider: HTMLInputElement | null = document.querySelector("#length-slider");

const uppercaseCheckbox: HTMLInputElement | null = document.querySelector("#check-uppercase");
const numbersCheckbox: HTMLInputElement | null = document.querySelector("#check-numbers");
const symbolsCheckbox: HTMLInputElement | null = document.querySelector("#check-symbols");

const generatorButton: HTMLButtonElement | null = document.querySelector("#generate-password");

const passwordInput: HTMLInputElement | null = document.querySelector("#password-input");
const strengthSpan: HTMLElement | null = document.querySelector("#password-strength");

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



function viewSwitcher (viewId: "generator" | "checker"): void {
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

const lowercaseChars: string = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseChars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbersChars: string = '0123456789';
const symbolsChars: string = '!@#$%^&*()_+-=[]{}|;:",.<>/?';

function generatePassword(useUppercase: boolean, useNumbers: boolean, useSymbols: boolean, length: number): string {
    let chars: string = lowercaseChars;
    let password: string = "";

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

function getStrength(password: string): string {
    let score: number = 0;
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
        return "Very weak..."
    } else if (score <= 50) {
        return "Weak."
    } else if (score <= 75) {
        return "Medium."
    } else if (score <= 99) {
        return "Strong."
    }
    return "Very Strong!"
}