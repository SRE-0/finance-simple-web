// Application initialization and scope execution wrapper
document.addEventListener('DOMContentLoaded', () => {
    // Controller Instance Setup
    const financeManager = new FinanceManager();
    let currentFilter = 'todos';

    // UI DOM Element Selectors
    const financeForm = document.getElementById('finance-form');
    const descriptionInput = document.getElementById('descripcion');
    const amountInput = document.getElementById('monto');
    const typeSelect = document.getElementById('tipo');
    const categorySelect = document.getElementById('categoria');
    const categoryContainer = document.getElementById('categoria-container');
    
    const totalIncomesDisplay = document.getElementById('total-ingresos');
    const totalExpensesDisplay = document.getElementById('total-gastos');
    const netBalanceDisplay = document.getElementById('total-balance');
    const transactionListContainer = document.getElementById('lista-transacciones');
    const filtersContainer = document.getElementById('filtros-container');

    /**
     * Synchronizes and renders data elements from the engine metrics to the DOM UI views.
     * @function updateUI
     */
    function updateUI() {
        // Clear transaction list tree structure rendering
        transactionListContainer.innerHTML = '';

        // Fetch dynamic metrics summaries calculation metrics
        const metrics = financeManager.calculateFinancials();
        const activeTransactions = financeManager.getFilteredTransactions(currentFilter);

        // Render iterative layout of items matches criteria view filters
        activeTransactions.forEach(item => {
            const rowElement = document.createElement('li');
            rowElement.classList.add('transaccion', item.type);
            const directionalSign = item.type === 'ingreso' ? '+' : '-';

            rowElement.innerHTML = `
                <div class="detalles">
                    <strong>${item.description}</strong>
                    <span class="categoria-tag">${item.category}</span>
                </div>
                <span style="font-weight: bold;">${directionalSign}$${item.amount.toFixed(2)}</span>
            `;
            transactionListContainer.appendChild(rowElement);
        });

        // Mutate numeric global summary inner-text configurations
        totalIncomesDisplay.innerText = `$${metrics.totalIncomes.toFixed(2)}`;
        totalExpensesDisplay.innerText = `$${metrics.totalExpenses.toFixed(2)}`;
        netBalanceDisplay.innerText = `$${metrics.netBalance.toFixed(2)}`;

        // Dynamic Balance UX Text Formatting Color Management
        if (metrics.netBalance < 0) {
            netBalanceDisplay.style.color = '#f44336';
        } else if (metrics.netBalance > 0) {
            netBalanceDisplay.style.color = '#4caf50';
        } else {
            netBalanceDisplay.style.color = '#2196f3';
        }

        // Render metrics category expenses totals metrics
        for (const targetCategory in metrics.expensesByCategory) {
            const targetElement = document.getElementById(`cat-${targetCategory}`);
            if (targetElement) {
                targetElement.innerText = `$${metrics.expensesByCategory[targetCategory].toFixed(2)}`;
            }
        }
    }

    // Toggle Visibility logic for Category dropdown depending on Transaction Type chosen
    typeSelect.addEventListener('change', () => {
        if (typeSelect.value === 'ingreso') {
            categoryContainer.style.display = 'none';
        } else {
            categoryContainer.style.display = 'flex';
        }
    });

    // Handle filter buttons state changes and event delegations pipelines
    filtersContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-filtro')) {
            document.querySelectorAll('.btn-filtro').forEach(btn => btn.classList.remove('activo'));
            event.target.classList.add('activo');
            
            currentFilter = event.target.getAttribute('data-filtro');
            updateUI();
        }
    });

    // Form submission processing pipeline interception
    financeForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Push execution context inputs attributes data into active instances manager
        financeManager.addTransaction(
            descriptionInput.value,
            amountInput.value,
            typeSelect.value,
            categorySelect.value
        );
        
        // Refresh visibility parameters on active DOM instances update triggers
        updateUI();
        financeForm.reset();
        categoryContainer.style.display = 'flex'; 
    });
    
    // TODO: Connect initialization logic checks for preloaded server state fetches here if needed
});