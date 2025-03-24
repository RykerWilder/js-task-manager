const $one = document.querySelector.bind(document);
const $all = document.querySelectorAll.bind(document);

const searchBar = $one('#search-bar');

document.addEventListener('keypress', (event) => {

    if (event.key === 'Enter') {
        task = searchBar.value;
        console.log(task);
    }
});

