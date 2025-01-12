# Expo Camera: uri property undefined or blank

This repository demonstrates a common issue when using the Expo Camera API: the `uri` property of the image object may be undefined or blank if accessed before the image processing is complete. The provided code shows the problem and the solution using `onImageCaptured`.

## Problem

The code attempts to immediately access the image uri after taking a photo. This race condition causes the `uri` to be undefined until the image is fully processed.

## Solution

The `onImageCaptured` callback ensures that the `uri` property contains the correct value once the image has finished processing.