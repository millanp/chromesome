// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function (request, sender, sendResponse) {
    // chrome.pageAction.show(sender.tab.id);
    switch (request.action) {
      case "seek":
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { 
            action: "seek",
            to: request.to 
          }, resp => {});
        });
        break;
      case "triggerDownload":
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { 
            action: "download",
          }, resp => {
            chrome.downloads.download({
              url: resp.dataURL,
              filename: resp.videoName + "__" + resp.coordinate + ".png"
            });
          });
        });
        break;
      default:
        break;
    }
    sendResponse();
  });