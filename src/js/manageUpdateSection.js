let startIndex, endIndex, updates;

function addUpdates(start, end) {
    const updatesToAdd = updates.slice(start, end);

    const updateSection = document.getElementById("update-list");

    updatesToAdd.forEach(upd => {

        let newUpdate = document.createElement("h3")

        let date = upd.date;
        let link = (upd.hyperlink ? `<a class = "link" href=${upd.path}>${upd.hyperlink}</a>` : '')
        let desc = upd.description;

        newUpdate.innerHTML = date + " " + link + " " + desc

        updateSection.appendChild(newUpdate)
    });
}

async function init() {
    updates = await fetch("/meta/updates.json")
    .then((response) => response.json())
    .then((json) => json);

    startIndex = 0;
    endIndex = startIndex + 5;

    addUpdates(startIndex, endIndex);
}

function getNextUpdateBatch() {
    startIndex = endIndex;
    endIndex = Math.min(startIndex + 5, updates.length);

    addUpdates(startIndex, endIndex);

    if (endIndex >= updates.length) {
        document.getElementById("more-updates").remove();
    }
}

