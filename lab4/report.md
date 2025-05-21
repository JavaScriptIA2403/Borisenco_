# Лабораторная работа №3. Управление инвентарем в JavaScript

Борисенко Дарья IA2403

## Шаг 1. Настройка проекта

* Создана корневая папка проекта.
* В ней создана директория `/src` с модулями:

  * `index.js`
  * `inventory.js`
  * `ui.js`
  
  * `classes.js`
* В корне также созданы:

  * `index.html` — подключён `index.js` через `type="module"`
  * `style.css` — подключён к HTML

## Шаг 2. Создание классов Item и Weapon

* В файле `classes.js` реализованы два класса:

### Класс `Item`:

```javascript
class Item {
  constructor(id, name, category, rarity, description = "") {
    this.id = id;
    this.name = name;
    this.category = category;
    this.rarity = rarity;
    this.description = description;
  }

  getInfo() {
    return `ID: ${this.id}, Название: ${this.name}, Категория: ${this.category}, Редкость: ${this.rarity}, Описание: ${this.description}`;
  }
}
```

### Класс `Weapon` (наследуется от Item):

```javascript
class Weapon extends Item {
  constructor(id, name, rarity, description, damage) {
    super(id, name, "weapon", rarity, description);
    this.damage = damage;
  }

  attack() {
    console.log(`Оружие ${this.name} нанесло ${this.damage} урона!`);
  }

  getInfo() {
    return `${super.getInfo()}, Урон: ${this.damage}`;
  }
}
```

## Шаг 3. Создание HTML-интерфейса

* Создана таблица с колонками:

  * Название предмета
  * Категория
  * Редкость
  * Урон
  * Действие (удаление)

* Создан блок для отображения описания при наведении.

* Создана форма для добавления предмета (с select для категории и редкости, input для урона и ID).

## Шаг 4. Добавление предметов

* Реализована функция `addItemToInventory()` в `inventory.js`, которая:

  * Создаёт объект `Item` или `Weapon` (в зависимости от наличия урона).
  * Добавляет объект в массив `inventory`.

* В `ui.js`:

  * Строка в таблице создаётся через `addItemToTable()`.
  * Цвет строки меняется: `legendary` — золотой, `common` — серый.
  * Урон отображается: числом для оружия, `—` для других предметов.

## Шаг 5. Управление предметами

* Кнопка "Удалить" добавляется в каждую строку таблицы.
* При клике вызывается `deleteItemHandler()`, которая:

  * Удаляет предмет из массива `inventory`.
  * Перестраивает таблицу.
  * Обновляет счётчик предметов.

## Шаг 6. Подсчет количества предметов

* Функция `calcalateTotalAmount()` (с ошибкой в названии) обновляет элемент `#totalItems`.

## Шаг 7. Отображение информации о предмете

* При наведении на строку таблицы:

  * В `p#itemDescription` отображается результат `getInfo()` для предмета.
* При выходе мыши — текст возвращается к стандартному.

## Шаг 8. Добавление предметов через форму

* Форма реализована с полями:

  * ID
  * Название
  * Категория (select)
  * Редкость (select)
  * Урон (input type="number")

* Реализована базовая валидация через `required` в HTML.


---


---

## Скриншоты с результатами работы программы

> Вставьте сюда изображения с демонстрацией работы:

 ![Добавление предмета](images/screenshot_1.png)
 ![Удаление предмета](images/screenshot_2.png)

