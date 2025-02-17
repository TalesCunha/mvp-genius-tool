
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 right-0 p-4 z-50">
      <Button asChild variant="outline" className="bg-white/80 backdrop-blur-sm">
        <Link to="/profile">
          <User className="w-4 h-4 mr-2" />
          Perfil
        </Link>
      </Button>
    </nav>
  );
};

export default Navbar;
