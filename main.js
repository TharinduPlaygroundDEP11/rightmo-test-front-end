const API_URL = "http://localhost:8080/api"

const categoryContainerElm = document.querySelector('#categories');

loadAllCategories();

function loadAllCategories() {
    fetch(`${API_URL}/categories`).then(res => {
        if (res.ok) {
            res.json().then(list => 
                list.forEach(category => {
                    const newLiElm = document.createElement('li');
                    categoryContainerElm.append(newLiElm);
                    newLiElm.innerHTML = `${category}`;
                })
                );
        } else {
            alert("Failed to load categories");
        }
    }).catch(err => {
        console.log("Something went wrong");
    });
}

