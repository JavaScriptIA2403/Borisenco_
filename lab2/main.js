import transactions from "./transactions.js"

function MainMenu()
{
    if(transactions.length==0)
    {
        console.log("Нет транзакций");
        return;
    }

    /** 
    *Функция для определения уникальных типов транзакций
    *
    *@param {Array} transactions- массив обьектов транзакций 
    *@return {Set} outTrans- множество, содержащее уникальные типы транзакций 
    */
    function getUniqueTransactionTypes(transactions)
    {
        let outTrans=new Set();
        for (let i = 0; i < transactions.length; i++){

                outTrans.add(transactions[i].transaction_type);
        }
        console.log(outTrans);
        return outTrans;
    }
    /**
     * вычисляет сумму всех транзакций 
     * @param {Array} transactions - массив обьектов транзакций 
     * @returns {Number} summ - переменная, хранящая сумму всех транзакций 
     */
    function calculateTotalAmount(transactions)
    {
        let summ = 0; 
        for (let i=0 ; i< transactions.length; i++ )
        {
            summ = summ+transactions[i].transaction_amount;
        }
        console.log(summ);
        return summ;
    }
    /**
     * вычисляет сумму транзакций за указаный год, месяц или день 
     * @param {Array} transactions - массив обьектов транзакций 
     * * @param {string} year - необязательный /  год за который считаем транзакции  
     * * @param {string} month - необязательный /  месяц за который считаем транзакции 
     * * @param {string} day - необязательный /  день за который считаем транзакции 
     * @returns {Number} summ - переменная, хранящая сумму всех транзакций 
     */
    function calculateTotalAmountByDate(transactions, year="", month="", day="")
    {
        let summ= 0;
            if (year =="")
                {
                    if (month=="")
                    {
                        if (day=="")
                        {
                            calculateTotalAmount(transactions);    
                        }
                        else
                        {
                            for(let i=0; i<transactions.length; i++)
                            {
                                let dayDate = new Date((transactions[i].transaction_date)).getDate();
                                console.log(dayDate);
                                if(dayDate == day)
                                {
                                    summ = summ+ transactions[i].transaction_amount;
                                    console.log(`Сумма за день ${day} ${summ}`);
                                    return summ;
                                }
                                /*else
                                {
                                    console.log("К сожалению ничго нет");
                                }*/

                            }
                        }
                    }
                    else
                    {
                        for(let i=0; i<transactions.length; i++)
                        {
                            let dateMonth = new Date((transactions[i].transaction_date)).getMonth();
                            console.log(dateMonth);
                            if(dateMonth == month)
                            {
                                summ = summ+ transactions[i].transaction_amount;
                                console.log(`Сумма за месяц ${month}  ${summ}`);
                                return summ;
                            }
                           /* else
                            {
                                console.log("К сожалению ничго нет");
                            }*/

                        }

                    }
        
                }
            else
            {
                for(let i=0; i<transactions.length; i++)
                    {
                        let yearDate = new Date ((transactions[i].transaction_date)).getFullYear();
                        console.log(yearDate);
                        if(yearDate == year)
                        {
                            summ = summ+ transactions[i].transaction_amount;
                            console.log(`Сумма за год ${year}  ${summ}`);
                            return summ;
                        }
                        /*else
                        {
                            console.log("К сожалению ничго нет");
                        }*/
                    }    
            }
    }


    /**
     * Ищет и возвращает транзакции указаного типа 
     * @param {Array} transactions -  массив обьектов транзакций 
     * @param {string} type - тип транзанции ( "credit" / "debit")
     * @returns {Array} typeArray - массив транзакций с укащаным типом
     */
    function getTransactionByType(transactions, type)
    {
        let typeArray = transactions.filter(transaction => transaction.transaction_type == type);  
        console.log(typeArray);
        return typeArray;
    }
    
    /**
     * Ищет и возвращает транзакции за указаный период
     * @param {Array} transactions -  массив обьектов транзакций 
     * @param {number} startDate - стартовая дата транзакций 
     * @param {number} endDate - конечная дата транзакций
     * @returns {Array} typeArray - массив транзакций прошедших в диапазоне дат
     */

    function getTransactionsInDateRange(transactions, startDate, endDate)
    {
        let transactionsByDate = [];
        
        for (let i= 0; i< transactions.length; i++)
        {
        let transactiondate = new Date(transactions[i].transaction_date);
           if (transactiondate> startDate && transactiondate < endDate)
           {
            transactionsByDate.push(transactions[i]);
           }
        }
        console.log(transactionsByDate);
        return transactionsByDate;
    }
    /**
     * Ищет и возвращает транзакции с указаным merchantName
     * @param {Array} transactions -  массив обьектов транзакций 
     * @param {string} merchantName - имя продавца
     * @returns {Array} typeArray - массив транзакций у которх имя продавца, овпадает с введенным 
     */
    
    function getTransactionsByMerchant(transactions, merchantName)
    {
        let arrayOfTrans = [];
        for (let i =0 ; i< transactions.length; i++)
        {
            if (transactions[i].length==0)
            {
                console.log("Нет подходящих транзакций ");
            }
            else
            {
                if (transactions[i].merchant_name == merchantName)
                {
                    arrayOfTrans.push(transactions[i]);
                }
            }
        }
        console.log(arrayOfTrans);
        return arrayOfTrans;
    }
    /**
     * Ищет и возвращает среднее значение транзакций 
     * @param {Array} transactions -  массив обьектов транзакций 
     * @returns {Number} summ/ transactions.length - среднее значение транзакций 
     */
    function calculateAverageTransactionAmount(transactions)
    {
        let summ= 0;
        for( let i=0 ; i< transactions.length; i++)
        {
            summ = summ + transactions[i].transaction_amount;
        }
        console.log(summ/ transactions.length);
        return summ / transactions.length;
    }
     /**
     * Ищет и возвращает массив транзацкий, у которых сумма, находится в диапазоне 
     * @param {Array} transactions -  массив обьектов транзакций 
     * @param {Number} minAmount -  минимальная сумма транзакций 
     * @param {Number} maxAmount -  максимальная сумма транзакций 
     * @returns {Number} summ/ transactions.length - среднее значение транзакций 
     */
    function getTransactionsByAmountRange(transactions, minAmount, maxAmount)
    {
        let arrayTrans = [];
        for (let i=0 ; i<transactions.length; i++)
        {
            if (transactions[i].transaction_amount >= minAmount && transactions[i].transaction_amount <= maxAmount)
            {
                arrayTrans.push(transactions[i]);
            }

        }
        console.log (arrayTrans);
        return arrayTrans;

    }
    /**
     * Возвращает общую сумму транзакций с типом "debit"
     * @param {Array} transactions -  массив обьектов транзакций 
     * @returns {Number} summ - сумма всех дебитовых транзакций 
     */
    function calculateTotalDebitAmount(transactions)
    {
        let summ = 0;
        for (let i =0; i<transactions.length; i++)
        {
            if (transactions[i].transaction_type === "debit")
            {
                summ = summ + transactions[i].transaction_amount;
            }
        }
        console.log(summ);
        return summ; 
    }
    /**
     * ищет месяц, в котором было больше всего транзакций 
     * @param {Array} transactions -  массив обьектов транзакций 
     * @returns {Array} monthArray - массив, в который записаны все месяцы, с найбольшим числом транзакций 
     */
    function findMostTransactionsMonth(transactions)
    {
        let monthArray = [];
        for(let i=0; i<transactions.length; i++)
        {
            let date = new Date(transactions[i].transaction_date).getMonth();
            if (!monthArray[date]) {
                monthArray[date] = 0;
            }
            monthArray[date]++;
        }
        let maxTransactions = Math.max(...monthArray);
        let MonthWithMaxTransaction = [];
        for (let i=0; i<transactions.length; i++)
        {
            if(monthArray[i]=== maxTransactions)
            {
                MonthWithMaxTransaction.push(i);
            }
        } 
        console.log(maxTransactions);
        console.log(MonthWithMaxTransaction);
        return MonthWithMaxTransaction;
    }
    /**
     * ищет месяц, в котором было больше всего Дебитовых транзакций 
     * @param {Array} transactions -  массив обьектов транзакций 
     * @returns {Array} monthArray - массив, в который записаны все месяцы, с найбольшим числом  Дебитовых транзакций 
     */
    function findMostDebitTransactionMonth(transactions)
    {
        let monthArray = [];
        for(let i=0; i<transactions.length; i++)
        {
            if(transactions[i].transaction_type ==="debit")
            {
                let date = new Date(transactions[i].transaction_date).getMonth();
                if (!monthArray[date]) {
                    monthArray[date] = 0;
                }
                monthArray[date]++;
            } 
        }
        let maxTransactions = Math.max(...monthArray);
        let MonthWithMaxTransaction = [];
        for (let i=0; i<transactions.length; i++)
        {
            if(monthArray[i]=== maxTransactions)
            {
                MonthWithMaxTransaction.push(i);
            }
        } 
        console.log(maxTransactions);
        console.log(MonthWithMaxTransaction);
        return MonthWithMaxTransaction;
    }
     /**
     * Вычисляет и возвращает каких транзакций было больше всего ( Дебитовых / Кредитовых ),в случае если их было одинаково, вернет "equal"
     * @param {Array} transactions -  массив обьектов транзакций 
     * @returns {string} - возвращает одно из следующих значений : ("debit"/  "credit" / "equal" )
     */
    function mostTransactionTypes(transactions)
    {
        let arrayWithNumOfTrans = [0,0];
        for(let i =0; i< transactions.length; i++)
        {
            if(transactions[i].transaction_type==="debit")
            {
                arrayWithNumOfTrans[0] ++;
            }
            else if (transactions[i].transaction_type==="credit")
            {
                arrayWithNumOfTrans[1] ++;
            }
        }
        console.log(` debit ${arrayWithNumOfTrans[0]}`);
        console.log(` credit ${arrayWithNumOfTrans[1]}`);
        if (arrayWithNumOfTrans[0] > arrayWithNumOfTrans[1])
        {
            console.log("debit");
            return "debit";
        }
        else if(arrayWithNumOfTrans[0] === arrayWithNumOfTrans[1])
        {
            console.log("equal");
            return "equal";
        }
        else 
        {
            console.log("credit");
            return "credit";
        }
    }
      /**
     * Ищет транзакции совершенные до определенной даты
     * @param {Array} transactions -  массив обьектов транзакций 
     * * @param {String} date - дата до которой ведется поиск
     * @returns {Array} - возвращает массив с транзакциями, прошедшими до введеной даты 
     */
    function getTransactionsBeforeDate(transactions, date)
    {
        let arrayTrans= [];
        for(let i=0; i<transactions.length; i++)
        {
            if(transactions[i].transaction_date< date)
            {
                arrayTrans.push(transactions[i]);
            }
        }
        console.log(arrayTrans);
        return arrayTrans;
    }
    /**
     * Ищет транзакции по уникальному id 
     * @param {Array} transactions -  массив обьектов транзакций 
     * @param {String} id - уникальный id элемента 
     * @returns {Object} - возвращает объект, имеющий указаный id 
     */
    function findTransactionById(transactions, id)
    {
        for(let i=0 ; i<transactions.length; i++)
        {
            if(transactions[i].transaction_id=== id)
            {
                console.log(transactions[i]);
                return transactions[i];
            }
        }
    }  
    /**
     * Ищет поля с описанием транзакций, добавляя их в отдельный массив 
     * @param {Array} transactions -  массив обьектов транзакций 
     * @returns {Array} - возвращает массив с описанием каждой транзакции 
     */
    function mapTransactionDescriptions(transactions)
    {
        let arrayOfTransDescript = [];
        for ( let i=0; i<transactions.length; i++)
        {
            arrayOfTransDescript.push(transactions[i].transaction_description);
        }
        console.log(arrayOfTransDescript);
        return arrayOfTransDescript;
    }

    let numOfTask= prompt("Введите номер задания, для выполнения"); 
    console.log(typeof(numOfTask));
    console.log(` Вы выбрали задание: ${numOfTask}`);
    

    function mainMenuAsc()
    {
        let numOfTask= prompt("Хотите ли вы запустить главное меню ? 0- нет / 1- да "); 
        if(numOfTask==0)
        {
            console.log("Спасибо за испольщование нашей программы");
        }
        else if( numOfTask ==1)
        {
            MainMenu();
        }
        else
        {
            console.log("Вы ввели совсем что то не так, попробуйте снова");
            mainMenuAsc();
        }
    }
    switch (Number(numOfTask))
    {

        case 1:
            getUniqueTransactionTypes(transactions);
            mainMenuAsc();
            break;
        case 2:
            calculateTotalAmount(transactions);
            mainMenuAsc();
            break;
        case 3:
            calculateTotalAmountByDate(transactions,"2019", "","")
            calculateTotalAmountByDate(transactions, "", "2", "")
            calculateTotalAmountByDate(transactions, "", "", "7")
            mainMenuAsc();
            break;
        case 4:
            getTransactionByType(transactions, "debit");
            getTransactionByType(transactions, "credit");
            mainMenuAsc();
            break;
        case 5:
            getTransactionsInDateRange(transactions, new Date(2019, 1 ,1 ), new Date(2020, 9, 11));
            mainMenuAsc();
            break;
        case 6:
            getTransactionsByMerchant(transactions,"RetailStore456");
            mainMenuAsc();
            break;
        case 7:
            calculateAverageTransactionAmount(transactions);
            mainMenuAsc();
            break;
        case 8:    
            getTransactionsByAmountRange(transactions, prompt("Введите минимальную сумму"), prompt("Введите максимальную сумму"));
            mainMenuAsc();
            break; 
        case 9:
            calculateTotalDebitAmount(transactions);
            mainMenuAsc();
            break; 
        case 10:
            findMostTransactionsMonth(transactions);
            mainMenuAsc();
            break;
        case 11:
            findMostDebitTransactionMonth(transactions);
            mainMenuAsc();
            break;
        case 12:
            mostTransactionTypes(transactions);
            mainMenuAsc();
            break;
        case 13:
            getTransactionsBeforeDate(transactions, "2019-02-14");
            mainMenuAsc();
            break;
        case 14:
            findTransactionById(transactions, "43");
            mainMenuAsc();
            break;
        case 15:
            mapTransactionDescriptions(transactions);
            mainMenuAsc();
            break;
        }
}
MainMenu();

