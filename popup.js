load_storage();

document.getElementById("save").addEventListener("click", saveClick);
document.getElementById("clean").addEventListener("click", deleteClick);

chrome.runtime.onStartup.addListener(function () {
    handleStorageSync(function (result) {
        deleteHistory(result.days, result.options);
    });
});

function load_storage() {
    handleStorageSync(function (result) {
        document.getElementById('days').value = result.days;
        const rawOptions = document.getElementsByName("options");
        for (let i = 0; i < rawOptions.length; i++) {
            rawOptions[i].checked = result.options[rawOptions[i].value];
        }
    });
}

function saveClick() {
    const days = document.getElementById("days").value;
    const rawOptions = document.getElementsByName("options");
    const options = {};
    for (let i = 0; i < rawOptions.length; i++) {
        options[rawOptions[i].value] = rawOptions[i].checked;
    }
    chrome.storage.sync.set({'days': days, 'options': options}, function () {
        console.log("Settings saved");
    });
}

function deleteClick() {
    const days = document.getElementById("days").value;
    const rawOptions = document.getElementsByName("options");
    const options = {};
    for (let i = 0; i < rawOptions.length; i++) {
        options[rawOptions[i].value] = rawOptions[i].checked;
    }
    deleteHistory(days, options);
}
