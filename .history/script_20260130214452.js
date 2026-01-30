document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Get DOM elements - Average Calculator
    const currentSharesInput = document.getElementById('currentShares');
    const currentAvgInput = document.getElementById('currentAvg');
    const currentTotalInput = document.getElementById('currentTotal');
    const newBuyAmountInput = document.getElementById('newBuyAmount');
    const newBuyRateInput = document.getElementById('newBuyRate');
    const brokerageInput = document.getElementById('brokerage');
    const calculateBtn = document.getElementById('calculateBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    // Get DOM elements - Quantity Calculator
    const calcAmountInput = document.getElementById('calcAmount');
    const calcRateInput = document.getElementById('calcRate');
    const calcBrokerageInput = document.getElementById('calcBrokerage');
    const calculateQtyBtn = document.getElementById('calculateQtyBtn');
    
    // Results elements - Average Calculator
    const newSharesElement = document.getElementById('newShares');
    const totalSharesAfterElement = document.getElementById('totalSharesAfter');
    const totalCostAfterElement = document.getElementById('totalCostAfter');
    const newAverageElement = document.getElementById('newAverage');
    
    // Results elements - Quantity Calculator
    const quantityResultElement = document.getElementById('quantityResult');
    const totalCostElement = document.getElementById('totalCost');
    const avgCostElement = document.getElementById('avgCost');
    const avgCostFinalElement = document.getElementById('avgCostFinal');
    
    // Breakdown elements - Average Calculator
    const breakdownCurrentElement = document.getElementById('breakdownCurrent');
    const breakdownPurchaseElement = document.getElementById('breakdownPurchase');
    const breakdownBrokerageElement = document.getElementById('breakdownBrokerage');
    const breakdownTotalElement = document.getElementById('breakdownTotal');
    
    // Breakdown elements - Quantity Calculator
    const breakdownAmountElement = document.getElementById('breakdownAmount');
    const breakdownQtyBrokerageElement = document.getElementById('breakdownQtyBrokerage');
    const breakdownQtyTotalElement = document.getElementById('breakdownQtyTotal');
    
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
    
    // Calculate quantity from amount
    function calculateQuantityFromAmount() {
        const amount = parseFloat(calcAmountInput.value) || 0;
        const rate = parseFloat(calcRateInput.value) || 0;
        const brokerage = parseFloat(calcBrokerageInput.value) || 0;
        
        if (amount <= 0 || rate <= 0) {
            alert("Please enter valid amount and share price.");
            return;
        }
        
        // Calculate quantity (floor to whole shares)
        const quantity = Math.floor(amount / rate);
        const totalCost = amount + brokerage;
        const avgCostPerShare = totalCost / quantity;
        
        // Update results
        quantityResultElement.textContent = quantity.toLocaleString();
        totalCostElement.textContent = totalCost.toFixed(2) + " TK";
        avgCostElement.textContent = rate.toFixed(2) + " TK";
        avgCostFinalElement.textContent = avgCostPerShare.toFixed(2) + " TK";
        
        // Update breakdown
        breakdownAmountElement.textContent = amount.toFixed(2) + " TK";
        breakdownQtyBrokerageElement.textContent = brokerage.toFixed(2) + " TK";
        breakdownQtyTotalElement.textContent = totalCost.toFixed(2) + " TK";
        
        // Show results
        document.getElementById('quantityResults').style.display = 'block';
    }
    
    // Calculate new average price (allows zero current holdings)
    function calculateNewAverage() {
        // Get values from inputs
        const currentShares = parseFloat(currentSharesInput.value) || 0;
        const currentAvg = parseFloat(currentAvgInput.value) || 0;
        const newBuyAmount = parseFloat(newBuyAmountInput.value) || 0;
        const newBuyRate = parseFloat(newBuyRateInput.value) || 0;
        const brokerage = parseFloat(brokerageInput.value) || 0;
        
        // Validate inputs
        if (newBuyAmount <= 0 || newBuyRate <= 0) {
            alert("Please enter valid new purchase amount and rate.");
            return;
        }
        
        if (currentShares < 0 || currentAvg < 0) {
            alert("Current values cannot be negative.");
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
        newSharesElement.textContent = Math.round(newShares).toLocaleString();
        totalSharesAfterElement.textContent = Math.round(totalSharesAfter).toLocaleString();
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
        // Average Calculator
        currentSharesInput.value = '';
        currentAvgInput.value = '';
        currentTotalInput.value = '';
        newBuyAmountInput.value = '';
        newBuyRateInput.value = '';
        brokerageInput.value = '0';
        
        // Reset average calculator results
        newSharesElement.textContent = '0';
        totalSharesAfterElement.textContent = '0';
        totalCostAfterElement.textContent = '0.00 TK';
        newAverageElement.textContent = '0.00 TK';
        
        breakdownCurrentElement.textContent = '0.00 TK';
        breakdownPurchaseElement.textContent = '0.00 TK';
        breakdownBrokerageElement.textContent = '0.00 TK';
        breakdownTotalElement.textContent = '0.00 TK';
        
        // Quantity Calculator
        calcAmountInput.value = '';
        calcRateInput.value = '';
        calcBrokerageInput.value = '0';
        
        // Reset quantity calculator results
        quantityResultElement.textContent = '0';
        totalCostElement.textContent = '0.00 TK';
        avgCostElement.textContent = '0.00 TK';
        avgCostFinalElement.textContent = '0.00 TK';
        
        breakdownAmountElement.textContent = '0.00 TK';
        breakdownQtyBrokerageElement.textContent = '0.00 TK';
        breakdownQtyTotalElement.textContent = '0.00 TK';
        
        // Hide results sections
        document.getElementById('resultsSection').style.display = 'none';
        document.getElementById('quantityResults').style.display = 'none';
        
        // Focus on first input
        currentSharesInput.focus();
    }
    
    // Pre-fill with example data
    function loadExample() {
        // Average calculator example (EBL)
        currentSharesInput.value = '6230';
        currentAvgInput.value = '25.50';
        newBuyAmountInput.value = '25194.00';
        newBuyRateInput.value = '24.70';
        brokerageInput.value = '125.97';
        
        // Quantity calculator example (MATINSPINN)
        calcAmountInput.value = '73220.00';
        calcRateInput.value = '52.30';
        calcBrokerageInput.value = '366.10';
        
        updateCurrentTotal();
        
        // Show success message
        showNotification("Example data loaded! Click calculate buttons to see results.");
    }
    
    // Show notification
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #2ecc71;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Add CSS animations for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Event listeners
    currentSharesInput.addEventListener('input', updateCurrentTotal);
    currentAvgInput.addEventListener('input', updateCurrentTotal);
    
    calculateBtn.addEventListener('click', calculateNewAverage);
    resetBtn.addEventListener('click', resetCalculator);
    calculateQtyBtn.addEventListener('click', calculateQuantityFromAmount);
    
    // Allow Enter key to trigger calculations
    document.addEventListener('keydown', function(e) {
        // Average calculator
        if ([newBuyAmountInput, newBuyRateInput, brokerageInput].includes(e.target)) {
            if (e.key === 'Enter') {
                calculateNewAverage();
            }
        }
        
        // Quantity calculator
        if ([calcAmountInput, calcRateInput, calcBrokerageInput].includes(e.target)) {
            if (e.key === 'Enter') {
                calculateQuantityFromAmount();
            }
        }
    });
    
    // Load example data on double-click of header
    document.querySelector('header h1').addEventListener('dblclick', loadExample);
    
    // GitHub link
    document.getElementById('githubLink').addEventListener('click', function(e) {
        e.preventDefault();
        showNotification("Push this code to your GitHub repository!");
    });
    
    // Initialize with empty results
    resetCalculator();
    
    // Display welcome message
    console.log("Zaber's Share Calculator v2.0 loaded successfully!");
    console.log("Features:");
    console.log("1. Average Calculator (works with zero current holdings)");
    console.log("2. Quantity Calculator");
    console.log("3. Double-click header to load examples");
});