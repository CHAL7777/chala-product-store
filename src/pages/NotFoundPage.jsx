import React from 'react';
import EmptyState from '../components/ui/EmptyState';
import { Compass } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="section-container py-20">
      <EmptyState
        icon={Compass}
        title="404 — Page Not Found"
        description="The page or route you're looking for doesn't exist or has moved."
        actionText="Back to Home"
        actionLink="/"
      />
    </div>
  );
};

export default NotFoundPage;
