document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // DOM Elements - Tool Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const toolSections = document.querySelectorAll('.tool-section');
    const themeToggle = document.getElementById('themeToggle');
    const loadExamplesBtn = document.getElementById('loadExamples');
    
    // DOM Elements - Average Calculator
    const currentSharesInput = document.getElementById('currentShares');
    const currentAvgInput = document.getElementById('currentAvg');
    const currentTotalInput = document.getElementById('currentTotal');
    const newBuyAmountInput = document.getElementById('newBuyAmount');
    const newBuyRateInput = document.getElementById('newBuyRate');
    const brokerageInput = document.getElementById('brokerage');
    const calculateBtn = document.getElementById('calculateBtn');
    const resetAverageBtn = document.getElementById('resetAverage');
    const averageResults = document.getElementById('averageResults');
    
    // DOM Elements - Quantity Calculator
    const calcAmountInput = document.getElementById('calcAmount');
    const calcRateInput = document.getElementById('calcRate');
    const calcBrokerageInput = document.getElementById('calcBrokerage');
    const calculateQtyBtn = document.getElementById('calculateQtyBtn');
    const resetQuantityBtn = document.getElementById('resetQuantity');
    const quantityResults = document.getElementById('quantityResults');
    
    // DOM Elements - Bonus/Dividend Calculator
    const dividendSharesInput = document.getElementById('dividendShares');
    const dividendPercentageInput = document.getElementById('dividendPercentage');
    const faceValueInput = document.getElementById('faceValue');
    const taxRateInput = document.getElementById('taxRate');
    const bonusSharesInput = document.getElementById('bonusShares');
    const bonusRatioAInput = document.getElementById('bonusRatioA');
    const bonusRatioBInput = document.getElementById('bonusRatioB');
    const currentAvgPriceInput = document.getElementById('currentAvgPrice');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const calculateBonusBtn = document.getElementById('calculateBonusBtn');
    const resetBonusBtn = document.getElementById('resetBonus');
    const bonusResults = document.getElementById('bonusResults');
    const dividendResultsDiv = document.getElementById('dividendResults');
    const bonusShareResultsDiv = document.getElementById('bonusShareResults');
    
    // Toast Notification
    const toast = document.getElementById('notificationToast');
    
    // Theme Management
    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeToggle(savedTheme);
    }
    
    function updateThemeToggle(theme) {
        const icon = themeToggle.querySelector('i');
        const text = themeToggle.querySelector('span');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            text.textContent = 'Light Mode';
        } else {
            icon.className = 'fas fa-moon';
            text.textContent = 'Dark Mode';
        }
    }
    
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeToggle(newTheme);
        showNotification(`Switched to ${newTheme} mode`);
    }
    
    // Tool Navigation
    function initNavigation() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const toolId = this.getAttribute('data-tool');
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding section
                toolSections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === `${toolId}-calc` || section.id === toolId) {
                        section.classList.add('active');
                    }
                });
                
                showNotification(`Switched to ${this.querySelector('span').textContent}`);
            });
        });
    }
    
    // Toast Notification System
    function showNotification(message, type = 'success') {
        const toastMessage = toast.querySelector('.toast-message');
        const toastIcon = toast.querySelector('i');
        
        toastMessage.textContent = message;
        
        if (type === 'error') {
            toast.style.background = 'var(--danger-color)';
            toastIcon.className = 'fas fa-exclamation-circle';
        } else if (type === 'warning') {
            toast.style.background = 'var(--warning-color)';
            toastIcon.className = 'fas fa-exclamation-triangle';
        } else {
            toast.style.background = 'var(--success-color)';
            toastIcon.className = 'fas fa-check-circle';
        }
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    
    // Tab Management for Bonus Calculator
    function initBonusTabs() {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Update active tab button
                tabBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding tab content
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === `${tabId}Tab') {
                        content.classList.add('active');
                    }
                });
            });
        });
    }
    
    // AUTO-CALCULATE CURRENT TOTAL
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
    
    // AVERAGE CALCULATOR
    function calculateNewAverage() {
        // Get values
        const currentShares = parseFloat(currentSharesInput.value) || 0;
        const currentAvg = parseFloat(currentAvgInput.value) || 0;
        const newBuyAmount = parseFloat(newBuyAmountInput.value) || 0;
        const newBuyRate = parseFloat(newBuyRateInput.value) || 0;
        const brokerage = parseFloat(brokerageInput.value) || 0;
        
        // Validate
        if (newBuyAmount <= 0 || newBuyRate <= 0) {
            showNotification('Please enter valid purchase amount and rate', 'error');
            return;
        }
        
        // Calculate
        const currentTotalCost = currentShares * currentAvg;
        const newShares = newBuyAmount / newBuyRate;
        const totalCostAfter = currentTotalCost + newBuyAmount + brokerage;
        const totalSharesAfter = currentShares + newShares;
        const newAverage = totalCostAfter / totalSharesAfter;
        
        // Update UI
        document.getElementById('newShares').textContent = Math.round(newShares).toLocaleString();
        document.getElementById('totalSharesAfter').textContent = Math.round(totalSharesAfter).toLocaleString();
        document.getElementById('totalCostAfter').textContent = `৳ ${totalCostAfter.toFixed(2)}`;
        document.getElementById('newAverage').textContent = `৳ ${newAverage.toFixed(2)}`;
        document.getElementById('breakdownCurrent').textContent = `৳ ${currentTotalCost.toFixed(2)}`;
        document.getElementById('breakdownPurchase').textContent = `৳ ${newBuyAmount.toFixed(2)}`;
        document.getElementById('breakdownBrokerage').textContent = `৳ ${brokerage.toFixed(2)}`;
        document.getElementById('breakdownTotal').textContent = `৳ ${totalCostAfter.toFixed(2)}`;
        document.getElementById('resultsStatus').textContent = 'Calculated';
        
        // Show results
        averageResults.style.display = 'block';
        showNotification(`New average price: ৳${newAverage.toFixed(2)}`);
    }
    
    // QUANTITY CALCULATOR
    function calculateQuantity() {
        const amount = parseFloat(calcAmountInput.value) || 0;
        const rate = parseFloat(calcRateInput.value) || 0;
        const brokerage = parseFloat(calcBrokerageInput.value) || 0;
        
        if (amount <= 0 || rate <= 0) {
            showNotification('Please enter valid amount and share price', 'error');
            return;
        }
        
        const quantity = Math.floor(amount / rate);
        const totalCost = amount + brokerage;
        const avgCostPerShare = totalCost / quantity;
        
        // Update UI
        document.getElementById('quantityResult').textContent = quantity.toLocaleString();
        document.getElementById('totalCost').textContent = `৳ ${totalCost.toFixed(2)}`;
        document.getElementById('avgCost').textContent = `৳ ${rate.toFixed(2)}`;
        document.getElementById('avgCostFinal').textContent = `৳ ${avgCostPerShare.toFixed(2)}`;
        document.getElementById('breakdownAmount').textContent = `৳ ${amount.toFixed(2)}`;
        document.getElementById('breakdownQtyBrokerage').textContent = `৳ ${brokerage.toFixed(2)}`;
        document.getElementById('breakdownQtyTotal').textContent = `৳ ${totalCost.toFixed(2)}`;
        document.getElementById('qtyResultsStatus').textContent = 'Calculated';
        
        // Show results
        quantityResults.style.display = 'block';
        showNotification(`You can buy ${quantity.toLocaleString()} shares`);
    }
    
    // BONUS/DIVIDEND CALCULATOR
    function calculateBonusDividend() {
        const activeTab = document.querySelector('.tab-btn.active').getAttribute('data-tab');
        
        if (activeTab === 'dividend') {
            calculateDividend();
        } else {
            calculateBonusShares();
        }
    }
    
    function calculateDividend() {
        const shares = parseFloat(dividendSharesInput.value) || 0;
        const dividendPercent = parseFloat(dividendPercentageInput.value) || 0;
        const faceValue = parseFloat(faceValueInput.value) || 0;
        const taxRate = parseFloat(taxRateInput.value) || 0;
        
        if (shares <= 0 || dividendPercent <= 0) {
            showNotification('Please enter valid number of shares and dividend percentage', 'error');
            return;
        }
        
        // Dividend per share
        const dividendPerShare = (dividendPercent / 100) * faceValue;
        
        // Calculations
        const grossDividend = shares * dividendPerShare;
        const taxAmount = grossDividend * (taxRate / 100);
        const netDividend = grossDividend - taxAmount;
        
        // Update UI
        document.getElementById('totalDividendShares').textContent = shares.toLocaleString();
        document.getElementById('grossDividend').textContent = `৳ ${grossDividend.toFixed(2)}`;
        document.getElementById('dividendTax').textContent = `৳ ${taxAmount.toFixed(2)}`;
        document.getElementById('netDividend').textContent = `৳ ${netDividend.toFixed(2)}`;
        document.getElementById('bonusResultsStatus').textContent = 'Dividend Calculated';
        
        // Show results
        bonusResults.style.display = 'block';
        dividendResultsDiv.style.display = 'block';
        bonusShareResultsDiv.style.display = 'none';
        
        showNotification(`Net dividend: ৳${netDividend.toFixed(2)} (after tax)`);
    }
    
    function calculateBonusShares() {
        const currentShares = parseFloat(bonusSharesInput.value) || 0;
        const ratioA = parseFloat(bonusRatioAInput.value) || 0;
        const ratioB = parseFloat(bonusRatioBInput.value) || 0;
        const currentAvg = parseFloat(currentAvgPriceInput.value) || 0;
        
        if (currentShares <= 0 || ratioB <= 0) {
            showNotification('Please enter valid number of shares and bonus ratio', 'error');
            return;
        }
        
        // Calculations
        const bonusShares = (currentShares * ratioA) / ratioB;
        const totalAfterBonus = currentShares + bonusShares;
        
        // Update UI
        document.getElementById('currentBonusShares').textContent = currentShares.toLocaleString();
        document.getElementById('newBonusShares').textContent = Math.round(bonusShares).toLocaleString();
        document.getElementById('totalAfterBonus').textContent = Math.round(totalAfterBonus).toLocaleString();
        
        // Calculate new average if current average is provided
        const newAvgContainer = document.getElementById('newAvgContainer');
        if (currentAvg > 0) {
            const newAverage = (currentShares * currentAvg) / totalAfterBonus;
            document.getElementById('newAvgAfterBonus').textContent = `৳ ${newAverage.toFixed(2)}`;
            newAvgContainer.style.display = 'flex';
        } else {
            newAvgContainer.style.display = 'none';
        }
        
        document.getElementById('bonusResultsStatus').textContent = 'Bonus Calculated';
        
        // Show results
        bonusResults.style.display = 'block';
        dividendResultsDiv.style.display = 'none';
        bonusShareResultsDiv.style.display = 'block';
        
        showNotification(`You'll get ${Math.round(bonusShares).toLocaleString()} bonus shares`);
    }
    
    // RESET FUNCTIONS
    function resetAverageCalculator() {
        currentSharesInput.value = '';
        currentAvgInput.value = '';
        currentTotalInput.value = '';
        newBuyAmountInput.value = '';
        newBuyRateInput.value = '';
        brokerageInput.value = '0';
        averageResults.style.display = 'none';
        showNotification('Average calculator reset');
    }
    
    function resetQuantityCalculator() {
        calcAmountInput.value = '';
        calcRateInput.value = '';
        calcBrokerageInput.value = '0';
        quantityResults.style.display = 'none';
        showNotification('Quantity calculator reset');
    }
    
    function resetBonusCalculator() {
        dividendSharesInput.value = '';
        dividendPercentageInput.value = '35';
        faceValueInput.value = '10';
        taxRateInput.value = '15';
        bonusSharesInput.value = '';
        bonusRatioAInput.value = '1';
        bonusRatioBInput.value = '10';
        currentAvgPriceInput.value = '';
        bonusResults.style.display = 'none';
        showNotification('Bonus calculator reset');
    }
    
    // LOAD EXAMPLES
    function loadExamples() {
        // Average Calculator Example (EBL)
        currentSharesInput.value = '6230';
        currentAvgInput.value = '25.50';
        newBuyAmountInput.value = '25194.00';
        newBuyRateInput.value = '24.70';
        brokerageInput.value = '125.97';
        
        // Quantity Calculator Example (MATINSPINN)
        calcAmountInput.value = '73220.00';
        calcRateInput.value = '52.30';
        calcBrokerageInput.value = '366.10';
        
        // Bonus/Dividend Calculator Example (MATINSPINN Dividend)
        dividendSharesInput.value = '1400';
        dividendPercentageInput.value = '35';
        faceValueInput.value = '10';
        taxRateInput.value = '15';
        
        updateCurrentTotal();
        showNotification('Example data loaded! Click calculate buttons to see results.', 'success');
    }
    
    // EVENT LISTENERS
    function initEventListeners() {
        // Theme toggle
        themeToggle.addEventListener('click', toggleTheme);
        
        // Load examples
        loadExamplesBtn.addEventListener('click', loadExamples);
        
        // Average Calculator
        currentSharesInput.addEventListener('input', updateCurrentTotal);
        currentAvgInput.addEventListener('input', updateCurrentTotal);
        calculateBtn.addEventListener('click', calculateNewAverage);
        resetAverageBtn.addEventListener('click', resetAverageCalculator);
        
        // Quantity Calculator
        calculateQtyBtn.addEventListener('click', calculateQuantity);
        resetQuantityBtn.addEventListener('click', resetQuantityCalculator);
        
        // Bonus Calculator
        calculateBonusBtn.addEventListener('click', calculateBonusDividend);
        resetBonusBtn.addEventListener('click', resetBonusCalculator);
        
        // Enter key support
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const activeSection = document.querySelector('.tool-section.active');
                
                if (activeSection.id === 'average-calc' && 
                    (e.target === newBuyAmountInput || e.target === newBuyRateInput || e.target === brokerageInput)) {
                    calculateNewAverage();
                } else if (activeSection.id === 'quantity-calc' && 
                    (e.target === calcAmountInput || e.target === calcRateInput || e.target === calcBrokerageInput)) {
                    calculateQuantity();
                } else if (activeSection.id === 'bonus-calc') {
                    calculateBonusDividend();
                }
            }
        });
        
        // Auto-calculate brokerage (0.5%)
        newBuyAmountInput.addEventListener('blur', function() {
            if (this.value && !brokerageInput.value || brokerageInput.value === '0') {
                const brokerage = parseFloat(this.value) * 0.005;
                brokerageInput.value = brokerage.toFixed(2);
            }
        });
        
        calcAmountInput.addEventListener('blur', function() {
            if (this.value && !calcBrokerageInput.value || calcBrokerageInput.value === '0') {
                const brokerage = parseFloat(this.value) * 0.005;
                calcBrokerageInput.value = brokerage.toFixed(2);
            }
        });
        
        // Export and Print
        document.getElementById('exportData').addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Export feature coming soon!', 'warning');
        });
        
        document.getElementById('printPage').addEventListener('click', function(e) {
            e.preventDefault();
            window.print();
        });
    }
    
    // INITIALIZATION
    function init() {
        initTheme();
        initNavigation();
        initBonusTabs();
        initEventListeners();
        showNotification('Welcome to Zaber\'s Stock Tools!', 'success');
        console.log('Stock Tools v3.0 initialized successfully!');
    }
    
    // Start the application
    init();
});