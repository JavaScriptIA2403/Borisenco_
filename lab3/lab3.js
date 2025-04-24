class Item {
     /**
     * Создает объект Item.
     * @param {string} name - Название предмета.
     * @param {number} weight - Вес предмета.
     * @param {string} rarity - Редкость предмета.
     */
    name;
    weight;
    rarity;
    /**
     * Конструктор объект Item.
     * @param {string} name - Название предмета.
     * @param {number} weight - Вес предмета.
     * @param {string} rarity - Редкость предмета.
     */
    constructor(name, weight, rarity) 
    {
        this.name = name;
        this.weight = weight;
        this.rarity = rarity;
    }
    /**
     * Метод получает информацию о предмете.
     * @returns {string} Строка с информацией о предмете.
     */
    getInfo() 
    {
        return `Название: ${this.name}, Вес: ${this.weight}, Редкость: ${this.rarity}`;
    }
    /**
     * Метод устанавливает новый вес предмета.
     * @param {number} weight - Новый вес предмета.
     */
    setWeight(weight) 
    {
        this.weight = weight;
    }
}


const NewItem = new Item("Шоколадка", 0.5, "rare");

console.log(NewItem.getInfo());
NewItem.setWeight(1.0);
console.log(NewItem.getInfo());


/**
 * Класс, представляющий оружие, унаследованное от Item.
 */
class Weapon extends Item {
    damage;
    durability;

    /**
     * Создает объект Weapon.
     * @param {string} name - Название оружия.
     * @param {number} weight - Вес оружия.
     * @param {string} rarity - Редкость оружия.
     * @param {number} damage - Урон оружия.
     * @param {number} durability - Прочность оружия.
     */

    constructor(name, weight, rarity, damage, durability)
    {
        super(name, weight, rarity);
        this.damage = damage;
        this.durability = durability;
    }

    /**
     * Использует оружие, уменьшает прочность на 10.
     */
    use()
    {
        if (this.durability > 0)
        {
            this.durability-=10;
        }
        else{
            console.log("Кажестся его жизнь кончена");
        }
    }

    /**
     * Ремонтирует оружие, восстанавливает прочность до 100.
     */
    repair() 
    {
        if ( this.durability === 100)
        {
            console.log("Максимальная прочность");
        }
        else
        {
            this.durability = 100;
            console.log("вы починили оружие");
        }
        
    }
    /**
     * Получает полную информацию об оружии.
     * @returns {string} Строка с информацией о предмете и оружии.
     */
    getInfo() {
      return `${super.getInfo()}, Урон: ${this.damage}, Прочность: ${this.durability}`;
  }

}

const NewWeapon = new Weapon("Рыба", 1.05,"legenadary", 7, 100)
console.log(NewWeapon.getInfo());
NewWeapon.use();
console.log(NewWeapon.getInfo());



/**
 * Функция-конструктор для создания объекта Item1.
 * @param {string} name - Название предмета.
 * @param {number} weight - Вес предмета.
 * @param {string} rarity - Редкость предмета.
 */
function Item1(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
  
  
/**
 * Метод для получения информации о предмете Item1.
 * @returns {string} Строка с информацией о предмете.
 */
  Item1.prototype.getInfo = function () {
    return `Название: ${this.name}, Вес: ${this.weight}, Редкость: ${this.rarity}`;
  };
  

  /**
 * Метод для установки нового веса предмета Item1.
 * @param {number} newWeight - Новый вес предмета.
 */
  Item1.prototype.setWeight = function (newWeight) {
    this.weight = newWeight;
  };


}
const milk = new Item1("Молоко", 1.001, "common");
console.log(milk.getInfo()); 


/**
 * Функция-конструктор для создания объекта Weapon1.
 * @param {string} name - Название оружия.
 * @param {number} weight - Вес оружия.
 * @param {string} rarity - Редкость оружия.
 * @param {number} damage - Урон оружия.
 * @param {number} durability - Прочность оружия.
 */

function Weapon1(name, weight, rarity, damage, durability) {
    Item1.call(this, name, weight, rarity); 
    this.damage = damage;
    this.durability = durability;
  

  /**
 * Метод для использования оружия Weapon1, уменьшает прочность на 10.
 */
  Weapon1.prototype.use = function () {
    if (this.durability > 0) {
      this.durability -= 10;
    } else {
      console.log("Кажется, его жизнь кончена");
    }
  };
  
  /**
 * Метод для ремонта оружия Weapon1, восстанавливает прочность до 100.
 */
  Weapon1.prototype.repair = function () {
    if (this.durability === 100) {
      console.log("Максимальная прочность");
    } else {
      this.durability = 100;
      console.log("Вы починили оружие");
    }
  };
  
  /**
 * Метод для получения информации об оружии Weapon1.
 * @returns {string} Строка с информацией об оружии.
 */
  Weapon1.prototype.getInfo = function () {
    return `Название ${this.name},Вес: ${this.weight}, Редкость: ${this.rarity}, Урон: ${this.damage}, Прочность: ${this.durability} , `;
  };
}

const sword = new Weapon1("Меч", 2.5, "legendary", 15, 100);
console.log(sword.getInfo());
