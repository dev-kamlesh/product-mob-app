import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types';

type WishListContextType = {
  wishList: Product[];
  addToWishList: (product: Product) => void;
  removeFromWishList: (id: number) => void;
};

const WishListContext = createContext<WishListContextType | undefined>(undefined);

export const WishListProvider = ({ children }: { children: ReactNode }) => {
  const [wishList, setWishList] = useState<Product[]>([]);

  const addToWishList = (product: Product) => {
    setWishList(prev => [...prev, product]);
  };

  const removeFromWishList = (id: number) => {
    setWishList(prev => prev.filter(p => p.id !== id));
  };

  return (
    <WishListContext.Provider value={{ wishList, addToWishList, removeFromWishList }}>
      {children}
    </WishListContext.Provider>
  );
};

export const useWishList = () => {
  const context = useContext(WishListContext);
  if (!context) {
    throw new Error('useWishList must be used within a WishListProvider');
  }
  return context;
}
