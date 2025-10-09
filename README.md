# Interactive Optimizer Comparison: SGD vs Adam

An interactive web-based visualization tool that demonstrates the performance differences between SGD with Momentum and Adam optimization algorithms in real-time.

## Live Demo

[**View Live Demo**](https://Shrouk-Sharaf.github.io/optimizer-comparison/)

## Overview

This interactive visualization demonstrates the key differences between two popular optimization algorithms used in deep learning:

- **SGD with Momentum** - Traditional optimization with velocity accumulation
- **Adam (Adaptive Moment Estimation)** - Adaptive learning rate method with momentum

The tool allows users to experiment with different hyperparameters and observe how they affect training dynamics in real-time.

## Features

*   **Interactive Controls**: Adjust learning rates and momentum parameters in real-time
*   **Live Visualization**: Watch training progress with animated charts
*   **Real-time Comparison**: Side-by-side comparison of both optimizers
*   **Dual Metrics**: Track both loss and accuracy simultaneously
*   **Mathematical Formulas**: Clear display of the underlying algorithms
*   **Comparison Table**: Key differences between optimizers at a glance
*   **Reset Functionality**: Easily restart simulations with new parameters

## How to Use

### Basic Usage

1. **Adjust Hyperparameters**:
   - **SGD Learning Rate (α)**: Typically higher (0.01-0.5)
   - **Adam Learning Rate (α)**: Typically lower (0.0001-0.01)
   - **Momentum (β)**: Controls gradient history (0.5-0.99)

2. **Start Training**: Click "Start Training" to begin the simulation
3. **Observe Results**: Watch how loss decreases and accuracy improves over epochs
4. **Experiment**: Try different parameter combinations and observe the effects

### Typical Observations

- **Adam**: Faster initial convergence, may plateau earlier
- **SGD**: Slower but more steady progress, often better final generalization
- **High Learning Rates**: Faster learning but potential instability
- **Low Learning Rates**: Stable but slower convergence
