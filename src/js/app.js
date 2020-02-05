
const rootEl = document.getElementById('root');

rootEl.innerHTML = `
<form>
    <label for="food">Введите сумму</label>
    <input id="food" placeholder="sum" data-id="food"/>
    <label for="category">Выберите категорию</label>
    <input id="category" placeholder="category" data-id="category"/>
    <button data-action="add">Add</button>
</form>
<ul data-id="list">
</ul>
<span data-id="total">sum: 0</span>
`;

const inputFoodValue = rootEl.querySelector('[data-id="food"]');
const inputCategoryValue = rootEl.querySelector('[data-id="category"]');
const list = rootEl.querySelector('[data-id="list"]');
const addBtnEl = rootEl.querySelector('[data-action="add"]');
const totalSum = rootEl.querySelector('[data-id="total"]');

let sum=0;

addBtnEl.onclick = evt => {
    evt.preventDefault();
    const value = parseInt(inputFoodValue.value, 10);
    sum+= value;
    totalSum.innerHTML = `sum: ${sum}`;

    const listEl = document.createElement('li');
    listEl.innerHTML = `
    Покупка на сумму ${inputFoodValue.value}сомони в категории ${inputCategoryValue.value}
    <button data-action="remove">x</button>
    <button data-action="up">U</button>
    <button data-action="down">D</button>
    `;
    list.appendChild(listEl);

    const remove = listEl.querySelector('[data-action="remove"]');
    remove.onclick = () => {
        listEl.remove();
        sum -= value;
        totalSum.innerHTML = `sum: ${sum}`;
    };

    const up = listEl.querySelector('[data-action="up"]');
    up.onclick = () => {
        if (listEl === list.firstElementChild) {
            list.insertBefore(listEl, null)
        } else {
            list.insertBefore(listEl, listEl.previousElementSibling);
        }
    };

    const down = listEl.querySelector('[data-action=down]');
    down.onclick = () => {
        if (listEl === list.lastElementChild) {
            list.insertBefore(listEl, list.firstElementChild);
        } else {
            list.insertBefore(listEl.nextElementSibling, listEl);  
        }
    };
    
    inputFoodValue.value = '';
    inputCategoryValue.value= '';
}