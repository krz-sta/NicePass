document.querySelector("#switch-to-generator")?.addEventListener('click', () => {
    viewSwitcher("generator");
});
document.querySelector("#switch-to-checker")?.addEventListener('click', () => {
    viewSwitcher("checker");
});
function viewSwitcher(viewId) {
    if (viewId === "generator") {
        document.querySelector("#generator")?.classList.remove("hidden");
        document.querySelector("#checker")?.classList.add("hidden");
    }
    if (viewId === "checker") {
        document.querySelector("#generator")?.classList.add("hidden");
        document.querySelector("#checker")?.classList.remove("hidden");
    }
}
export {};
