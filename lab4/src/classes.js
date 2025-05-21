/**
 * Класс, представляющий общий предмет в инвентаре.
 */
export class Item {
    /**
     * Создаёт экземпляр предмета.
     * @param {string} id - Уникальный идентификатор предмета.
     * @param {string} name - Название предмета.
     * @param {string} category - Категория предмета (например, "weapon", "armor", "potion").
     * @param {string} rarity - Редкость предмета (например, "common", "rare", "legendary").
     * @param {string} [description=""] - Описание предмета (необязательно).
     */
    constructor(id, name, category, rarity, description = "") {
        this.id = id;
        this.name = name;
        this.category = category;
        this.rarity = rarity;
        this.description = description;
    }

    /**
     * Возвращает текстовую информацию о предмете.
     * @returns {string} Информация о предмете.
     */
    getInfo() {
        return `ID: ${this.id}, Название: ${this.name}, Категория: ${this.category}, Редкость: ${this.rarity}, Описание: ${this.description}`;
    }
}

/**
 * Класс, представляющий оружие. Наследует от класса Item.
 * Добавляет параметр урона и метод атаки.
 */
export class Weapon extends Item {
    /**
     * Создаёт экземпляр оружия.
     * @param {string} id - Уникальный идентификатор оружия.
     * @param {string} name - Название оружия.
     * @param {string} rarity - Редкость оружия.
     * @param {string} description - Описание оружия.
     * @param {number} damage - Значение урона, наносимого оружием.
     */
    constructor(id, name, rarity, description, damage) {
        super(id, name, "weapon", rarity, description);
        this.damage = damage;
    }

    /**
     * Выводит в консоль сообщение об атаке с указанием нанесённого урона.
     */
    attack() {
        console.log(`Оружие ${this.name} нанесло ${this.damage} урона!`);
    }

    /**
     * Возвращает текстовую информацию об оружии, включая урон.
     * @returns {string} Информация об оружии.
     */
    getInfo() {
        return `${super.getInfo()}, Урон: ${this.damage}`;
    }
}
