import { Item, Weapon } from './classes.js';

/**
 * Массив для хранения всех предметов инвентаря.
 * @type {Array<Item | Weapon>}
 */
export let inventory = [];

/**
 * Добавляет предмет в массив inventory.
 * В зависимости от значения урона создаёт либо Item, либо Weapon.
 *
 * @param {string} name - Название предмета.
 * @param {string} category - Категория предмета (weapon, armor, potion).
 * @param {string} rarity - Редкость предмета (common, rare, legendary и т.д.).
 * @param {string} id - Уникальный идентификатор предмета.
 * @param {number} damage - Урон (только для оружия, иначе 0).
 */
export function addItemToInventory(name, category, rarity, id, damage) {
    let el;

    if (damage == 0) {
        el = new Item(id, name, category, rarity);
    } else {
        el = new Weapon(id, name, category, rarity, damage);
    }

    inventory.push(el);
    console.log("Предмет добавлен в inventory:", el);
}

/**
 * Удаляет предмет из массива inventory по его ID.
 *
 * @param {string} id - ID предмета, который необходимо удалить.
 */
export function deleteItem(id) {
    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i].id === id) {
            inventory.splice(i, 1);
            break;
        }
    }
}
