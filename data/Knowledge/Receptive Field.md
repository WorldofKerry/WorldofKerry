Each successive convolution adds $K-1$ to the receptive field size (where $K$ is the one dimension of the filter). Therefore with $L$ layers, the receptive field size is $1+L*(K-1)$.
This introduces a problem, as we need many layers for each output to "see" the whole image. The solution is to use [[Strided Convolution]].
