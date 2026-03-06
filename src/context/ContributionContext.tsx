import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface ContributionItem {
    id: number;
    weight: string;
    price: number;
    qty: number;
}

interface ContributionContextType {
    items: ContributionItem[];
    totalCount: number;
    addItem: (item: Omit<ContributionItem, 'qty'>, qty: number) => void;
    showCart: boolean;
    setShowCart: (v: boolean) => void;
}

const ContributionContext = createContext<ContributionContextType | null>(null);

export const ContributionProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<ContributionItem[]>([]);
    const [showCart, setShowCart] = useState(false);

    const addItem = (item: Omit<ContributionItem, 'qty'>, qty: number) => {
        setItems(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + qty } : i);
            }
            return [...prev, { ...item, qty }];
        });
    };

    const totalCount = items.reduce((sum, i) => sum + i.qty, 0);

    return (
        <ContributionContext.Provider value={{ items, totalCount, addItem, showCart, setShowCart }}>
            {children}
        </ContributionContext.Provider>
    );
};

export const useContribution = () => {
    const ctx = useContext(ContributionContext);
    if (!ctx) throw new Error('useContribution must be used within ContributionProvider');
    return ctx;
};
