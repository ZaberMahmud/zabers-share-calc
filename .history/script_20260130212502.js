document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Get DOM elements
    const currentSharesInput = document.getElementById('currentShares');
    const currentAvgInput = document.getElementById('currentAvg');
    const currentTotalInput = document.getElementById('currentTotal');
    const newBuyAmountInput = document.getElementById('newBuyAmount');
    const newBuyRateInput = document.getElementById('newBuyRate');
    const brokerageInput = document.getElementById('brokerage');
    const calculateBtn = document.getElementById('calculateBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    // Results elements
    const newSharesElement = document.getElementById('newShares');
    const totalSharesAfterElement = document.getElementById('totalSharesAfter');
    const totalCostAfterElement = document.getElementById('totalCostAfter');
    const newAverageElement = document.getElementById('newAverage');
    
    // Breakdown elements
    const breakdownCurrentElement = document.getElementById('breakdownCurrent');
    const breakdownPurchaseElement = document.getElementById('breakdownPurchase');
    const breakdownBrokerageElement = document.getElementById('breakdownBrokerage');
    const breakdownTotalElement = document.getElementById('breakdownTotal');
    
    // Auto-calculate current total when shares or avg changes
    function updateCurrentTotal() {
        const currentShares = parseFloat(currentSharesInput.value) || 0;
        const currentAvg = parseFloat(currentAvgInput.value) || 0;
        
        if (currentShares > 0 && currentAvg > 0) {
            const total = currentShares * currentAvg;
            currentTotalInput.value = total.toFixed(2);
        } else {
            currentTotalInput.value = '';
        }
    }
    
    // Calculate new average price
    function calculateNewAverage() {
        // Get values from inputs
        const currentShares = parseFloat(currentSharesInput.value) || 0;
        const currentAvg = parseFloat(currentAvgInput.value) || 0;
        const newBuyAmount = parseFloat(newBuyAmountInput.value) || 0;
        const newBuyRate = parseFloat(newBuyRateInput.value) || 0;
        const brokerage = parseFloat(brokerageInput.value) || 0;
        
        // Validate inputs
        if (currentShares <= 0 || currentAvg <= 0) {
            alert("Please enter valid current share quantity and average price.");
            return;
        }
        
        if (newBuyAmount <= 0 || newBuyRate <= 0) {
            alert("Please enter valid new purchase amount and rate.");
            return;
        }
        
        // Calculate current total cost
        const currentTotalCost = currentShares * currentAvg;
        
        // Calculate new shares purchased
        const newShares = newBuyAmount / newBuyRate;
        
        // Calculate total cost after purchase (including brokerage)
        const totalCostAfter = currentTotalCost + newBuyAmount + brokerage;
        
        // Calculate total shares after purchase
        const totalSharesAfter = currentShares + newShares;
        
        // Calculate new average price
        const newAverage = totalCostAfter / totalSharesAfter;
        
        // Update results
        newSharesElement.textContent = newShares.toFixed(0);
        totalSharesAfterElement.textContent = totalSharesAfter.toFixed(0);
        totalCostAfterElement.textContent = totalCostAfter.toFixed(2) + " TK";
        newAverageElement.textContent = newAverage.toFixed(2) + " TK";
        
        // Update breakdown
        breakdownCurrentElement.textContent = currentTotalCost.toFixed(2) + " TK";
        breakdownPurchaseElement.textContent = newBuyAmount.toFixed(2) + " TK";
        breakdownBrokerageElement.textContent = brokerage.toFixed(2) + " TK";
        breakdownTotalElement.textContent = totalCostAfter.toFixed(2) + " TK";
        
        // Show results with animation
        document.getElementById('resultsSection').style.display = 'block';
    }
    
    // Reset all inputs and results
    function resetCalculator() {
        currentSharesInput.value = '';
        currentAvgInput.value = '';
        currentTotalInput.value = '';
        newBuyAmountInput.value = '';
        newBuyRateInput.value = '';
        brokerageInput.value = '0';
        
        newSharesElement.textContent = '0';
        totalSharesAfterElement.textContent = '0';
        totalCostAfterElement.textContent = '0.00 TK';
        newAverageElement.textContent = '0.00 TK';
        
        breakdownCurrentElement.textContent = '0.00 TK';
        breakdownPurchaseElement.textContent = '0.00 TK';
        breakdownBrokerageElement.textContent = '0.00 TK';
        breakdownTotalElement.textContent = '0.00 TK';
        
        // Focus on first input
        currentSharesInput.focus();
    }
    
    // Pre-fill with example data (Zaber's example)
    function loadExample() {
        currentSharesInput.value = '6230';
        currentAvgInput.value = '25.50';
        newBuyAmountInput.value = '25194.00';
        newBuyRateInput.value = '24.70';
        brokerageInput.value = '125.97';
        
        updateCurrentTotal();
    }
    
    // Event listeners
    currentSharesInput.addEventListener('input', updateCurrentTotal);
    currentAvgInput.addEventListener('input', updateCurrentTotal);
    
    calculateBtn.addEventListener('click', calculateNewAverage);
    resetBtn.addEventListener('click', resetCalculator);
    
    // Allow Enter key to trigger calculation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            calculateNewAverage();
        }
    });
    
    // Load example data on double-click of header
    document.querySelector('header h1').addEventListener('dblclick', loadExample);
    
    // Initialize with empty results
    resetCalculator();
    
    // Display a welcome message
    console.log("Zaber's Share Calculator loaded successfully!");
    console.log("Double-click the header to load example data.");
});