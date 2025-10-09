// Initialize charts
const lossCtx = document.getElementById('lossChart').getContext('2d');
const accuracyCtx = document.getElementById('accuracyChart').getContext('2d');

let lossChart, accuracyChart;
let animationId = null;

// Initialize charts
function initializeCharts() {
    if (lossChart) lossChart.destroy();
    if (accuracyChart) accuracyChart.destroy();
    
    const chartConfig = {
        type: 'line',
        options: {
            responsive: true,
            animation: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: true
                },
                tooltip: {
                    enabled: true
                }
            }
        }
    };

    lossChart = new Chart(lossCtx, {
        ...chartConfig,
        data: {
            labels: [],
            datasets: [
                {
                    label: 'SGD Loss',
                    data: [],
                    borderColor: 'rgb(54, 162, 235)',
                    backgroundColor: 'rgba(54, 162, 235, 0.1)',
                    tension: 0.4,
                    borderWidth: 2
                },
                {
                    label: 'Adam Loss',
                    data: [],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.1)',
                    tension: 0.4,
                    borderWidth: 2
                }
            ]
        },
        options: {
            ...chartConfig.options,
            scales: {
                ...chartConfig.options.scales,
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Loss'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Epoch'
                    }
                }
            }
        }
    });

    accuracyChart = new Chart(accuracyCtx, {
        ...chartConfig,
        data: {
            labels: [],
            datasets: [
                {
                    label: 'SGD Accuracy',
                    data: [],
                    borderColor: 'rgb(54, 162, 235)',
                    backgroundColor: 'rgba(54, 162, 235, 0.1)',
                    tension: 0.4,
                    borderWidth: 2
                },
                {
                    label: 'Adam Accuracy',
                    data: [],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.1)',
                    tension: 0.4,
                    borderWidth: 2
                }
            ]
        },
        options: {
            ...chartConfig.options,
            scales: {
                ...chartConfig.options.scales,
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Accuracy (%)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Epoch'
                    }
                }
            }
        }
    });
}

// Simulate training
function simulateTraining() {
    const sgdLR = parseFloat(document.getElementById('learningRateSGD').value);
    const adamLR = parseFloat(document.getElementById('learningRateAdam').value);
    const momentum = parseFloat(document.getElementById('momentum').value);
    
    let epoch = 0;
    const maxEpochs = 50;
    
    // Reset charts
    initializeCharts();
    
    // Initial values
    let sgdLoss = 2.0 + Math.random() * 0.2;
    let adamLoss = 2.0 + Math.random() * 0.2;
    let sgdAccuracy = 10 + Math.random() * 5;
    let adamAccuracy = 10 + Math.random() * 5;
    
    function trainStep() {
        if (epoch >= maxEpochs) {
            cancelAnimationFrame(animationId);
            return;
        }
        
        // Simulate SGD with momentum behavior
        const sgdNoise = (Math.random() - 0.5) * 0.1;
        sgdLoss = Math.max(0.1, sgdLoss * (0.85 + sgdNoise) - sgdLR * 0.1);
        
        // Simulate Adam behavior (faster initial convergence)
        const adamNoise = (Math.random() - 0.5) * 0.05;
        if (epoch < 15) {
            adamLoss = Math.max(0.1, adamLoss * (0.7 + adamNoise) - adamLR * 100);
        } else {
            adamLoss = Math.max(0.1, adamLoss * (0.92 + adamNoise) - adamLR * 10);
        }
        
        // Simulate accuracy improvements
        sgdAccuracy = Math.min(95, sgdAccuracy + (40 / (epoch + 10)) + (Math.random() - 0.5) * 2);
        if (epoch < 10) {
            adamAccuracy = Math.min(95, adamAccuracy + (60 / (epoch + 5)) + (Math.random() - 0.5) * 3);
        } else {
            adamAccuracy = Math.min(95, adamAccuracy + (20 / (epoch + 5)) + (Math.random() - 0.5) * 1);
        }
        
        // Update charts
        lossChart.data.labels.push(epoch + 1);
        lossChart.data.datasets[0].data.push(sgdLoss);
        lossChart.data.datasets[1].data.push(adamLoss);
        
        accuracyChart.data.labels.push(epoch + 1);
        accuracyChart.data.datasets[0].data.push(sgdAccuracy);
        accuracyChart.data.datasets[1].data.push(adamAccuracy);
        
        lossChart.update('none');
        accuracyChart.update('none');
        
        epoch++;
        animationId = requestAnimationFrame(trainStep);
    }
    
    animationId = requestAnimationFrame(trainStep);
}

// Event listeners
document.getElementById('learningRateSGD').addEventListener('input', function() {
    document.getElementById('lrSGDValue').textContent = this.value;
});

document.getElementById('learningRateAdam').addEventListener('input', function() {
    document.getElementById('lrAdamValue').textContent = this.value;
});

document.getElementById('momentum').addEventListener('input', function() {
    document.getElementById('momentumValue').textContent = this.value;
});

document.getElementById('trainBtn').addEventListener('click', function() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    this.textContent = 'Training...';
    this.disabled = true;
    
    setTimeout(() => {
        simulateTraining();
        setTimeout(() => {
            this.textContent = 'Start Training';
            this.disabled = false;
        }, 3000);
    }, 100);
});

document.getElementById('resetBtn').addEventListener('click', function() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    initializeCharts();
    document.getElementById('trainBtn').textContent = 'Start Training';
    document.getElementById('trainBtn').disabled = false;
});

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    
    // Set initial values
    document.getElementById('lrSGDValue').textContent = document.getElementById('learningRateSGD').value;
    document.getElementById('lrAdamValue').textContent = document.getElementById('learningRateAdam').value;
    document.getElementById('momentumValue').textContent = document.getElementById('momentum').value;
});