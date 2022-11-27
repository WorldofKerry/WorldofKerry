## Structure

Consists of layers of [[Neurons]], with input, output and hidden layers.
The layers may represent features to recognize (e.g. with handwriting numbers, the first layer may detect lines and curves, the second layer longer lines and loops).

## Learning

### Cost Functions

The average square difference on all $target - actual$ values of the outputs. A high value indicates a 'bad' result, and a low value indicates a 'good' result

### Gradient Descent

Taking the local gradient of the data to find optimal changes to the weights to minimize the cost function ([[Backpropagation]]).
