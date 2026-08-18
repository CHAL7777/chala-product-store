import React, { useState, useEffect } from 'react';
import { getTransparentImage } from '../../utils/imageUtils';

/**
 * TransparentImage Component
 * Automatically processes images with solid white studio backgrounds into transparent PNGs
 * so they blend seamlessly into dark app layouts without white background boxes.
 */
const TransparentImage = ({
  src,
  alt = '',
  className = '',
  loading = 'lazy',
  onLoad,
  ...props
}) => {
  const [displaySrc, setDisplaySrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoaded(false);

    if (!src) return;

    // Immediately start loading processed transparent image
    getTransparentImage(src)
      .then((processedUrl) => {
        if (isMounted) {
          setDisplaySrc(processedUrl);
          setIsLoaded(true);
        }
      })
      .catch(() => {
        if (isMounted) {
          setDisplaySrc(src);
          setIsLoaded(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [src]);

  return (
    <img
      src={displaySrc}
      alt={alt}
      loading={loading}
      onLoad={(e) => {
        setIsLoaded(true);
        if (onLoad) onLoad(e);
      }}
      className={`${className} transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-80'
      }`}
      {...props}
    />
  );
};

export default TransparentImage;
