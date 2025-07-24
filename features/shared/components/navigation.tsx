'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useAuthActions } from '@convex-dev/auth/react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X, User, LogOut, Settings, Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const user = useQuery(api.users.current);
  const { signOut } = useAuthActions();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const navVariants = {
    hidden: { y: -100 },
    visible: {
      y: 0,
      //   transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      //   transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      //   transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AY</span>
              </div>
              <span className="font-bold text-lg text-gray-900">
                ABIA Youth Academy
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/#about"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              About
            </Link>
            <Link
              href="/#programs"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Programs
            </Link>
            <Link
              href="/#contact"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/profile">
                  <Button variant="ghost" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                </Link>

                {user.isAdmin && (
                  <Link href="/admin">
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Admin
                    </Button>
                  </Link>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={user.image || '/placeholder.svg'}
                          alt={user.name}
                        />
                        <AvatarFallback>
                          {user.name
                            ?.split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    {user.isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin">
                          <Settings className="mr-2 h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button asChild variant="ghost">
                    <Link href="/auth">Sign In</Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    asChild
                    className="bg-primary-600 hover:bg-primary-700"
                  >
                    <Link href="/register">Apply Now</Link>
                  </Button>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="px-4 py-6 space-y-4">
                <motion.div variants={menuItemVariants}>
                  <Link
                    href="/"
                    className="block text-gray-700 hover:text-primary-600 transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <Home className="w-4 h-4 inline mr-2" />
                    Home
                  </Link>
                </motion.div>
                <motion.div variants={menuItemVariants}>
                  <Link
                    href="/#about"
                    className="block text-gray-700 hover:text-primary-600 transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </Link>
                </motion.div>
                <motion.div variants={menuItemVariants}>
                  <Link
                    href="/#programs"
                    className="block text-gray-700 hover:text-primary-600 transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Programs
                  </Link>
                </motion.div>
                <motion.div variants={menuItemVariants}>
                  <Link
                    href="/#contact"
                    className="block text-gray-700 hover:text-primary-600 transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>
                </motion.div>

                <div className="border-t border-gray-200 pt-4">
                  {user ? (
                    <div className="space-y-2">
                      <motion.div variants={menuItemVariants}>
                        <Link
                          href="/profile"
                          className="block text-gray-700 hover:text-primary-600 transition-colors py-2"
                          onClick={() => setIsOpen(false)}
                        >
                          <User className="w-4 h-4 inline mr-2" />
                          Profile
                        </Link>
                      </motion.div>
                      {user.isAdmin && (
                        <motion.div variants={menuItemVariants}>
                          <Link
                            href="/admin"
                            className="block text-gray-700 hover:text-primary-600 transition-colors py-2"
                            onClick={() => setIsOpen(false)}
                          >
                            <Settings className="w-4 h-4 inline mr-2" />
                            Admin
                          </Link>
                        </motion.div>
                      )}
                      <motion.div variants={menuItemVariants}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start p-2 h-auto"
                          onClick={() => {
                            handleSignOut();
                            setIsOpen(false);
                          }}
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </Button>
                      </motion.div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <motion.div variants={menuItemVariants}>
                        <Button
                          asChild
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => setIsOpen(false)}
                        >
                          <Link href="/auth">Sign In</Link>
                        </Button>
                      </motion.div>
                      <motion.div variants={menuItemVariants}>
                        <Button
                          asChild
                          className="w-full bg-primary-600 hover:bg-primary-700"
                          onClick={() => setIsOpen(false)}
                        >
                          <Link href="/register">Apply Now</Link>
                        </Button>
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
