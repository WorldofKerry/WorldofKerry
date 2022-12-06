Is a [[Locally Connected Layer]] that shares the same parameters accross all the locations (assuming input is stationary).
For example, a 200x200 image x 40k hidden units with filter size 10x10, will have around $10\times 10=100$ parameters.

## The Function

Uses [[Convolution]]s between the inputs and filters.
Given an input data of $d\times h\times w$ (depth/channels\\times height\\times width), a filter is selected of size $d\times k\times k$ (where $k$ is odd), where it is always extended to the full depth of the input volume.

### Single Piece of Data

#### Single Filter

A single output element is $y=w^Tx+b$, which is a $d\times k\times k$-dimensional dot product + bias.
The $k\times k$ piece of data used as input for this output element is called the [[Receptive Field]] of the output.
The full output is an activation map, of size $1\times (w-k-1)\times (l-k-1)$, accounting for the edge data loss from convolutions.  
This edge data loss is often resolved by [[Padding]] zeroes around the input.

#### Multiple Filters

This process is repeated with more filters, such that with $s$ filters, we get a $s\times (w-k-1)\times (l-k-1)$-dimensional output. As such, we also get a $s$-dimension bias vector.

### Batches of Data

With a $N\times C_{in}\times H\times W$ batch of images and $C_{out}\times C_{in}\times K_w\times K_h$ filters, we output a $N\times C_{out}\times H'\times W'$ batch out outputs, with a $C_{out}$-dim bias vector.

### Adding Non-Linearity

Multiple stacked [[Convolution]]s can be replaced by a single [[Convolution]], which results in a linear classifier (which cannot model non-linear data). Therefore [[Activation Function]]s are used between the convolutions to introduce non-linearity.

### Computing Learnable Prameters and Work

With $f$ filters, stride 1 and "same" padding, the output volume size is $f\times h \times w$. The number of learnable parameters is $(d * k * k + 1)*f$ (the $1$ for bias). The number of multiply-add operations is $f*h*w*d*k*k$ (number of outputs \* each output's inner product of two tensors).

## Sumary

![[Pasted image 20221126211627.png]]
