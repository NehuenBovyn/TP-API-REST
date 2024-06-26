document.getElementById('getAllCharacters').addEventListener('click', getAllCharacters);
document.getElementById('filterCharacters').addEventListener('click', filterCharacters);
document.getElementById('clearFilters').addEventListener('click', clearFilters);

function getAllCharacters() {
    fetch('https://rickandmortyapi.com/api/character')
        .then(response => response.json())
        .then(data => renderCharacters(data.results))
        .catch(error => showError(error));
}

function filterCharacters() {
    const name = document.getElementById('name').value;
    const status = document.getElementById('status').value;
    const species = document.getElementById('species').value;
    const type = document.getElementById('type').value;
    const gender = document.getElementById('gender').value;

    const url = `https://rickandmortyapi.com/api/character/?name=${name}&status=${status}&species=${species}&type=${type}&gender=${gender}`;

    fetch(url)
        .then(response => response.json())
        .then(data => renderCharacters(data.results))
        .catch(error => showError(error));
}

function clearFilters() {
  document.getElementById('name').value = '';
  document.getElementById('status').value = '';
  document.getElementById('species').value = '';
  document.getElementById('type').value = '';
  document.getElementById('gender').value = '';
  document.getElementById('charactersList').innerHTML = '';
}

function renderCharacters(characters) {
    const charactersList = document.getElementById('charactersList');
    charactersList.innerHTML = '';

    characters.forEach(character => {
        const characterDiv = document.createElement('div');
        characterDiv.classList.add('character');
        characterDiv.innerHTML = `
            <img src="${character.image}" alt="${character.name}" width=150px>
            <div> 
            <h3>${character.name}</h3>
            <p><b>Status: </b>${character.status}</p>
            <p><b>Species: </b>${character.species}</p>
            <p><b>Type: </b>${character.type ? character.type : '-'}</p>
            <p><b>Gender: </b>${character.gender}</p>
            </div> 
        `;
        charactersList.appendChild(characterDiv);
    });
}

function showError(error) {
    const charactersList = document.getElementById('charactersList');
    charactersList.innerHTML = `<p>Error: ${error.message}</p>`;
}