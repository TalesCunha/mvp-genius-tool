
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, User, LogOut, Settings, HelpCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';

const MobileNavbar = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  if (!isMobile) {
    return (
      <div className="fixed top-0 right-0 p-4 z-50 flex gap-2">
        <Button asChild variant="outline" className="bg-white shadow-sm backdrop-blur-sm">
          <Link to="/qanda">
            <HelpCircle className="w-4 h-4 mr-2" />
            Q&A
          </Link>
        </Button>
        <Button asChild variant="outline" className="bg-white shadow-sm backdrop-blur-sm">
          <Link to="/user-profile">
            <User className="w-4 h-4 mr-2" />
            Perfil
          </Link>
        </Button>
        <Button asChild variant="outline" className="bg-white shadow-sm backdrop-blur-sm">
          <Link to="/profile">
            <Settings className="w-4 h-4 mr-2" />
            Meus MVPs
          </Link>
        </Button>
        <Button variant="outline" className="bg-white shadow-sm backdrop-blur-sm" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 p-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="bg-white shadow-sm backdrop-blur-sm rounded-full">
            <Menu className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56 bg-white shadow-md border border-gray-100">
          <DropdownMenuLabel>Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/user-profile" className="flex items-center w-full cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/profile" className="flex items-center w-full cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Meus MVPs</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/qanda" className="flex items-center w-full cursor-pointer">
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Perguntas e Respostas</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MobileNavbar;
