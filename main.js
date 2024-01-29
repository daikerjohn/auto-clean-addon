function deleteHistory(days, options) {
    const after = new Date().getTime() - (days * 24 * 60 * 60 * 1000);
    console.log(chrome.history);
    chrome.history.deleteRange({startTime: 0, endTime: after}).then(() => {
        console.log("History deleted");
    });
}

function handleStorageSync(handler) {
    chrome.storage.sync.get(['days', 'options'], function (result) {
        if (result.days === undefined) {
            result.days = 7;
        }
        if (result.options === undefined) {
            result.options = {
                "downloads": true,
                "history": true,
            };
        }
        handler(result);
    });
}