
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <nav className="fixed top-0 right-0 p-4 z-50">
      <div className="flex space-x-4">
        <Button asChild variant="outline" className="bg-white/80 backdrop-blur-sm">
          <Link to="/create-mvp">Criar MVP</Link>
        </Button>
        <Button asChild variant="outline" className="bg-white/80 backdrop-blur-sm">
          <Link to="/feed">Dashboard</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
