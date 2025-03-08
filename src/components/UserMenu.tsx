import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Settings, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuthStore();

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-primary/20 transition-colors"
      >
        <User className="w-6 h-6 text-primary-beige" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="absolute right-0 mt-2 w-48 glass-morphism rounded-xl overflow-hidden z-50"
            >
              <div className="p-3 border-b border-primary/20">
                <p className="text-primary-beige font-medium truncate">{user.email}</p>
              </div>
              <div className="p-1">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    signOut();
                  }}
                  className="w-full p-2 flex items-center gap-2 rounded-lg hover:bg-primary/20 text-primary-light hover:text-primary-beige transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}