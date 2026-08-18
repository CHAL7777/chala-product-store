import React from 'react';
import { useParams, Link } from 'react-router-dom';
import products from '../data/products';
import ProductGallery from '../components/ProductGallery';
import ProductInfo from '../components/ProductInfo';
import RelatedProducts from '../components/RelatedProducts';
import Breadcrumb from '../components/Breadcrumb';
import Description from '../components/Description';
import EmptyState from '../components/ui/EmptyState';
import { AlertCircle } from 'lucide-react';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const numericId = Number(productId);
  const product = products.find((p) => p.id === numericId);

  if (!product) {
    return (
      <div className="section-container py-16">
        <EmptyState
          icon={AlertCircle}
          title="Product Not Found"
          description={`We couldn't find a product matching ID #${productId}. It may have been removed or the URL is invalid.`}
          actionText="Back to Catalog"
          actionLink="/products"
        />
      </div>
    );
  }

  return (
    <div className="section-container py-8 space-y-12">
      {/* Breadcrumb Navigation */}
      <Breadcrumb product={product} />

      {/* Main Showcase Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <ProductGallery images={product.images} name={product.name} />
        <ProductInfo product={product} />
      </div>

      {/* Deep Technical Tab Description */}
      <Description product={product} />

      {/* Recommended Products */}
      <RelatedProducts currentProductId={product.id} category={product.category} />
    </div>
  );
};

export default ProductDetailPage;
