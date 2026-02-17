chrome.runtime.onMessage.addListener((msg, sender) => {
    if (msg.type !== 'RESET') {
        return;
    }

    const url = new URL(msg.url);

    chrome.cookies.getAll({ domain: url.hostname }, (cookies) => {
        cookies.forEach((cookie) => {
            chrome.cookies.remove({
                url: `${cookie.secure ? 'https' : 'http'}://${cookie.domain.startsWith('.') ? cookie.domain.slice(1) : cookie.domain}${cookie.path}`,
                name: cookie.name
            });
        });
    });

    setTimeout(() => {
        chrome.tabs.reload(sender.tab.id);
    }, 500);
});