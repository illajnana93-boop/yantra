import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthModalOpen: boolean;
    openAuthModal: () => void;
    closeAuthModal: () => void;
    signUp: (email: string, password: string, metadata: { name: string, phone: string }) => Promise<{ error: any }>;
    signIn: (email: string, password: string) => Promise<{ error: any }>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                setUser({
                    id: session.user.id,
                    name: session.user.user_metadata?.name || 'Devotee',
                    email: session.user.email || '',
                    phone: session.user.user_metadata?.phone || '',
                });
            }
            setLoading(false);
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                setUser({
                    id: session.user.id,
                    name: session.user.user_metadata?.name || 'Devotee',
                    email: session.user.email || '',
                    phone: session.user.user_metadata?.phone || '',
                });
            } else {
                setUser(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const signUp = async (email: string, password: string, metadata: { name: string, phone: string }) => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: metadata
            }
        });
        return { error };
    };

    const signIn = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { error };
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        setIsAuthModalOpen(false);
    };

    const openAuthModal = () => setIsAuthModalOpen(true);
    const closeAuthModal = () => setIsAuthModalOpen(false);

    return (
        <AuthContext.Provider value={{
            user,
            isAuthModalOpen,
            openAuthModal,
            closeAuthModal,
            signUp,
            signIn,
            signOut
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
