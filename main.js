const API_URL = "http://localhost:8080/api"

const categoryContainerElm = document.querySelector('#categories');
const btnAskElm = document.getElementById('btnAsk');
const inputElm = document.getElementById('input');
const chkboxElm = document.getElementById('chkbox');

loadAllCategories();

function loadAllCategories() {
    fetch(`${API_URL}/categories`).then(res => {
        if (res.ok) {
            res.json().then(list => 
                list.forEach(category => {
                    const newLiElm = document.createElement('li');
                    categoryContainerElm.append(newLiElm);
                    newLiElm.innerHTML = `<div class="flex-grow-1 d-flex gap-1 align-items-center">
                    <input id="chkbox" class="form-check-input" type="checkbox" value="${category}">
                    <label class="flex-grow-1">${category}</label>
                </div>`;
                })
                );
        } else {
            alert("Failed to load categories");
        }
    }).catch(err => {
        console.log("Something went wrong");
    });
}


btnAskElm.addEventListener('click', () => {
    const text = inputElm.value.trim();
    if (text.trim().length === 0) {
        inputElm.focus();
        inputElm.select();
        return;
    }

    fetch(`${API_URL}/polls/create`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            title: text,
            categoryId: 5,
            options: ["Option 1", "Option 2"]})
    }).then(res => {
        if (res.ok) {
            inputElm.value = "";
            inputElm.focus();
            alert("Poll Saved!");
        } else {
            alert("Failed to add the poll");
        }
    }).catch(err => {
        alert("Something went wrong, Try again later");
    });
});
