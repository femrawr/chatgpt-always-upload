new MutationObserver(() => {
    const toastRoot = document.querySelector('.toast-root');
    if (!toastRoot) {
        return;
    }

    const textStart = toastRoot.querySelector('.text-start');
    if (!textStart) {
        return;
    }

    if (!textStart.innerText.startsWith('Unable to upload')) {
        return;
    }

    localStorage.clear();
    sessionStorage.clear();

    chrome.runtime.sendMessage({
        type: 'RESET',
        url: location.href
    });
}).observe(document.body, {
    childList: true,
    subtree: true
});