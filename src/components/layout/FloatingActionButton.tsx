import { Scan } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

const FloatingActionButton = () => {
  const location = useLocation();
  
  // Hide FAB on scan page to avoid duplication
  if (location.pathname === '/scan') return null;

  return (
    <Link to="/scan">
      <Button
        size="lg"
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-glow hover:shadow-medium btn-primary floating-animation group"
      >
        <Scan size={24} className="group-hover:scale-110 transition-transform duration-300" />
      </Button>
    </Link>
  );
};

export default FloatingActionButton;