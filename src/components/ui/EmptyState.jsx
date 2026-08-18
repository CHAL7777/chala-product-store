import React from 'react';
import { PackageSearch } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyState = ({
  title = "No products found",
  description = "Try adjusting your search or filters to find what you're looking for.",
  icon: Icon = PackageSearch,
  actionText = "Browse All Products",
  actionLink = "/products",
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl">
      <div className="p-4 rounded-full bg-zinc-800/60 text-zinc-400 mb-4 border border-zinc-700/50">
        <Icon size={40} strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-bold text-zinc-100 mb-2">{title}</h3>
      <p className="text-zinc-400 max-w-md text-sm mb-6 leading-relaxed">{description}</p>
      {onAction ? (
        <button onClick={onAction} className="btn-primary">
          {actionText}
        </button>
      ) : actionLink ? (
        <Link to={actionLink} className="btn-primary">
          {actionText}
        </Link>
      ) : null}
    </div>
  );
};

export default EmptyState;
