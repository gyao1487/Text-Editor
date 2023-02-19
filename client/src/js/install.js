const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA

//Store deferred prompt event and display install button
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    butInstall.style.display = 'inline-block';
    return false;
});

// Click event handler: show the install prompt and clear install button after user chooses
butInstall.addEventListener('click', async () => {
    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;

    if(choiceResult.outcome === 'accepted') {
        console.log(' Install prompt accepted ')
    } else {
        console.log('Install prompt dismissed')
    }
    deferredPrompt = null;
    butInstall.style.display = "none"
});

// After app is installed, clear prompt and console log success message 
window.addEventListener('appinstalled', (event) => {
    deferredPrompt = null;
    console.log('JATE was successfully installed!')
});
