/**
 * @class FinanceManager
 * @description Manages the state, operations, and mathematical calculations of 
 * personal financial transactions (incomes and expenses).
 */
class FinanceManager {
    /**
     * Initializes the finance storage state.
     */
    constructor() {
        /**
         * Array holding all transaction objects.
         * @type {Array<{id: number, description: string, amount: number, type: string, category: string}>}
         */
        this.transactions = [];
    }

    /**
     * Adds a new transaction into the system state.
     * @param {string} description - Name or description of the transaction.
     * @param {number} amount - The numeric financial value.
     * @param {string} type - Nature of transaction: 'ingreso' or 'gasto'.
     * @param {string} category - Structural classification tags (e.g., 'Comida', 'Hogar').
     * @returns {Object} The created transaction object data.
     */
    addTransaction(description, amount, type, category) {
        const transaction = {
            id: Date.now(),
            description,
            amount: parseFloat(amount),
            type,
            category: type === 'gasto' ? category : 'Ingreso'
        };

        this.transactions.push(transaction);
        return transaction;
    }

    /**
     * Filters transactions array based on a specific evaluation filter value.
     * @param {string} filterCriterion - Criteria selector ('todos', 'ingresos', or specific category name).
     * @returns {Array<Object>} Filtered subset list of transactions.
     */
    getFilteredTransactions(filterCriterion) {
        return this.transactions.filter(transaction => {
            if (filterCriterion === 'todos') return true;
            if (filterCriterion === 'ingresos') return transaction.type === 'ingreso';
            return transaction.category === filterCriterion;
        });
    }

    /**
     * Evaluates metrics summaries and aggregates data totals grouped by indicators.
     * @returns {Object} Analytical objects containing aggregated absolute calculations.
     */
    calculateFinancials() {
        let totalIncomes = 0;
        let totalExpenses = 0;
        
        let expensesByCategory = {
            Comida: 0,
            Hogar: 0,
            Viaje: 0,
            Entretenimiento: 0,
            Otros: 0
        };

        this.transactions.forEach(transaction => {
            if (transaction.type === 'ingreso') {
                totalIncomes += transaction.amount;
            } else {
                totalExpenses += transaction.amount;
                if (expensesByCategory[transaction.category] !== undefined) {
                    expensesByCategory[transaction.category] += transaction.amount;
                }
            }
        });

        // TODO: Implement persistent cache storage or local storage backup pipelines here
        return {
            totalIncomes,
            totalExpenses,
            netBalance: totalIncomes - totalExpenses,
            expensesByCategory
        };
    }
}