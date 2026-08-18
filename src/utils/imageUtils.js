// Global memory cache for processed transparent images to prevent redundant processing
const imageCache = new Map();
const pendingPromises = new Map();

/**
 * Removes white studio background from an image URL using Flood Fill (BFS) on Canvas.
 * Only outer edge-connected white background pixels are made transparent.
 * White details inside the shoe/product remain completely untouched and crisp.
 * 
 * @param {string} src - Original image URL
 * @param {number} threshold - RGB threshold for background white (default 236)
 * @returns {Promise<string>} - Resolves to transparent PNG Data URL or original URL
 */
export function getTransparentImage(src, threshold = 236) {
  if (!src) return Promise.resolve('');
  
  // Return cached result if available
  if (imageCache.has(src)) {
    return Promise.resolve(imageCache.get(src));
  }

  // Deduplicate ongoing requests for the same image URL
  if (pendingPromises.has(src)) {
    return pendingPromises.get(src);
  }

  const promise = new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        // Scale down large images slightly for super-fast canvas processing and smooth performance
        const maxDim = 800;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(img, 0, 0, width, height);

        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        const totalPixels = width * height;
        const visited = new Uint8Array(totalPixels);
        const queue = new Int32Array(totalPixels);
        let qHead = 0;
        let qTail = 0;

        // Check if pixel at index is near white background
        const isWhite = (dIdx) => {
          return data[dIdx] >= threshold && data[dIdx + 1] >= threshold && data[dIdx + 2] >= threshold;
        };

        // Helper to enqueue valid border pixels
        const addPixel = (x, y) => {
          const pIdx = y * width + x;
          if (!visited[pIdx]) {
            const dIdx = pIdx * 4;
            if (isWhite(dIdx)) {
              visited[pIdx] = 1;
              queue[qTail++] = pIdx;
            }
          }
        };

        // Seed with outer 4 borders of image
        for (let x = 0; x < width; x++) {
          addPixel(x, 0);
          addPixel(x, height - 1);
        }
        for (let y = 0; y < height; y++) {
          addPixel(0, y);
          addPixel(width - 1, y);
        }

        // BFS Flood fill to mark background pixels
        while (qHead < qTail) {
          const pIdx = queue[qHead++];
          const x = pIdx % width;
          const y = (pIdx / width) | 0;
          const dIdx = pIdx * 4;

          // Set background pixel alpha to transparent
          data[dIdx + 3] = 0;

          // Expand to 4-connected neighbors
          if (x + 1 < width) addPixel(x + 1, y);
          if (x - 1 >= 0) addPixel(x - 1, y);
          if (y + 1 < height) addPixel(x, y + 1);
          if (y - 1 >= 0) addPixel(x, y - 1);
        }

        // Feather boundary pixels to eliminate jagged edges or white halos
        for (let pIdx = 0; pIdx < totalPixels; pIdx++) {
          if (visited[pIdx]) continue;
          const x = pIdx % width;
          const y = (pIdx / width) | 0;

          // Check if adjacent to background pixel
          let isBoundary = false;
          if (x > 0 && visited[pIdx - 1]) isBoundary = true;
          else if (x < width - 1 && visited[pIdx + 1]) isBoundary = true;
          else if (y > 0 && visited[pIdx - width]) isBoundary = true;
          else if (y < height - 1 && visited[pIdx + width]) isBoundary = true;

          if (isBoundary) {
            const dIdx = pIdx * 4;
            if (isWhite(dIdx)) {
              const r = data[dIdx];
              const g = data[dIdx + 1];
              const b = data[dIdx + 2];
              const minColor = Math.min(r, g, b);
              data[dIdx + 3] = Math.max(0, Math.round((255 - minColor) * 4));
            }
          }
        }

        ctx.putImageData(imageData, 0, 0);
        const resultUrl = canvas.toDataURL('image/png');
        imageCache.set(src, resultUrl);
        pendingPromises.delete(src);
        resolve(resultUrl);
      } catch (err) {
        console.warn('Canvas background removal fallback:', err);
        pendingPromises.delete(src);
        resolve(src);
      }
    };

    img.onerror = () => {
      pendingPromises.delete(src);
      resolve(src);
    };

    img.src = src;
  });

  pendingPromises.set(src, promise);
  return promise;
}
