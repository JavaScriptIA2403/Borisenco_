import { Item, Weapon } from './classes.js';
import { addItemToInventory } from './inventory.js';
import { inventory } from './inventory.js';
import { deleteItem } from './inventory.js';

/**
 * Обрабатывает данные из формы и добавляет новый предмет в инвентарь.
 * @param {Event} event - Событие отправки формы.
 */
export function addItemFromForm(event) {
    event.preventDefault(); // Останавливаем стандартную отправку формы

    const name = document.getElementById("itemName").value;
    const category = document.getElementById("itemCategory").value;
    const rarity = document.getElementById("itemRarity").value;
    const id = document.getElementById("itemId").value;
    const damage = parseInt(document.getElementById('itemDamage').value);

    // Добавляем предмет с учетом категории
    if (category === "weapon") {
        addItemToInventory(name, category, rarity, id, damage);
    } else {
        addItemToInventory(name, category, rarity, id, 0);
    }

    updateTable();
    calcalateTotalAmount();
    resetForm();
}

/**
 * Очищает поля формы после добавления предмета.
 */
export function resetForm() {
    document.getElementById("itemName").value = '';
    document.getElementById("itemCategory").value = '';
    document.getElementById("itemRarity").value = '';
    document.getElementById("itemId").value = '';
}

/**
 * Добавляет предмет в HTML-таблицу.
 * @param {Item | Weapon} item - Объект предмета для отображения.
 */
export function addItemToTable(item) {
    const tableBody = document.getElementById("inventoryTable").getElementsByTagName("tbody")[0];
    const row = document.createElement("tr");

    // Формируем HTML строку для предмета
    row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.category}</td>
        <td>${item.rarity}</td>
        <td>${item.damage !== undefined ? item.damage : '—'}</td>
    `;

    // Отображение описания при наведении
    row.addEventListener("mouseenter", () => {
        const textToShowInfo = document.getElementById('itemDescription');
        textToShowInfo.textContent = item.getInfo();
    });

    row.addEventListener("mouseleave", () => {
        const textToShowInfo = document.getElementById('itemDescription');
        textToShowInfo.textContent = "Наведи курсор на предмет, чтобы увидеть описание.";
    });

    // Кнопка удаления
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Удалить";
    deleteButton.addEventListener("click", () => {
        deleteItemHandler(item.id);
    });

    const actionCell = document.createElement("td");
    actionCell.appendChild(deleteButton);
    row.appendChild(actionCell);

    // Цветовая подсветка в зависимости от редкости
    if (item.rarity === 'legendary') {
        row.style.backgroundColor = '#FFD700';
        row.style.color = '#000000';
    } else if (item.rarity === 'common') {
        row.style.backgroundColor = '#D3D3D3';
        row.style.color = '#A9A9A9';
    }

    tableBody.appendChild(row);
}

/**
 * Удаляет предмет из массива и обновляет таблицу.
 * @param {string} id - ID удаляемого предмета.
 */
export function deleteItemHandler(id) {
    deleteItem(id);
    updateTable();
    calcalateTotalAmount();
}

/**
 * Полностью пересоздает таблицу предметов на основе текущего состояния inventory.
 */
export function updateTable() {
    const tableBody = document.getElementById("inventoryTable").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = ''; // Очищаем таблицу

    inventory.forEach(item => {
        addItemToTable(item);
    });
}

/**
 * Настраивает кнопку "Создать предмет" для добавления обработчика событий.
 */
export function setupCreateButton() {
    const createButton = document.getElementById("createItemButton");
    createButton.addEventListener('click', addItemFromForm);
}

/**
 * Подсчитывает общее количество предметов в инвентаре и отображает его.
 */
export function calcalateTotalAmount() {
    const total = inventory.length;
    const elToShowResult = document.getElementById('totalItems');
    elToShowResult.textContent = `Всего предметов: ${total}`;
}
