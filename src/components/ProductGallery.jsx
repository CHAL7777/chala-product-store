import React, { useState } from 'react';

const ProductGallery = ({ images = [], name = 'Product' }) => {
  const [selectedImage, setSelectedImage] = useState(images[0] || '');

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnail Bar */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto scrollbar-hide py-1">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(img)}
            className={`relative rounded-xl overflow-hidden aspect-square w-16 lg:w-20 shrink-0 border-2 transition-all duration-200 ${
              selectedImage === img
                ? 'border-brand scale-95 shadow-md shadow-brand/20'
                : 'border-zinc-800 hover:border-zinc-600 opacity-70 hover:opacity-100'
            }`}
            aria-label={`Select thumbnail ${idx + 1} for ${name}`}
          >
            <img src={img} alt={`${name} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main Image Showcase */}
      <div className="relative rounded-2xl overflow-hidden aspect-square w-full bg-zinc-900 border border-zinc-800 flex items-center justify-center p-4">
        <img
          src={selectedImage || images[0]}
          alt={name}
          className="max-h-full max-w-full object-contain transition-all duration-500 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default ProductGallery;
