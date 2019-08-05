window.onload = () => {
    document.querySelector('#submit-btn').onclick = (e) => {
        e.stopPropagation();
        chrome.runtime.sendMessage({
            action: "seek",
            to: document.querySelector('#seek-to').value
        })
    } 
}
