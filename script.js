const containerDiv = document.body.appendChild(document.createElement("div"));
containerDiv.className = "container";

containerDiv.innerHTML = `
    <h1 class="text-center">Basic Dictionary</h1>
    <p class="text-center">Enter the correct word to get its meaning</p>
    <div class="d-flex">
        <input type="search" class="form-control me-2" placeholder="Search" id="searchInput">
        <button class="btn btn-outline-success" onclick="search()">Search</button>
    </div>
    <div class="row" id="rowDiv"></div>
`;

function search() {
    const input = document.getElementById("searchInput").value.trim();
    if (!input) {
        alert('Please enter a word.');
        return;
    }

    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${input}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const meanings = data[0].meanings.flatMap(meaning => meaning.definitions.map(def => def.definition));
            const cardDiv = document.getElementById("rowDiv");
            cardDiv.innerHTML = `
                <div class="card mb-3 col-sm-6 col-md-12">
                    <div class="card-body">
                        <h3 class="card-title">Meaning of ${input.toUpperCase()}</h3>
                        <div class="d-flex" id="audioDiv">
                            <audio controls src="${data[0].phonetics[0]?.audio || ''}">Audio is not available</audio>
                        </div>
                        <div class="uldiv">
                            <ul>${meanings.map(meaning => `<li>${meaning}</li>`).join('')}</ul>
                        </div>
                    </div>
                </div>`;
        })
        .catch(error => {
            const cardDiv = document.getElementById("rowDiv");
            cardDiv.innerHTML = `<div class="alert alert-danger">${error}</div>`;
        });
}

document.getElementById("searchInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        search();
    }
});
