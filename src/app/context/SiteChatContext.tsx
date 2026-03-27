import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type SiteChatContextValue = {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
};

const SiteChatContext = createContext<SiteChatContextValue | null>(null);

export function SiteChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openChat = useCallback(() => setIsOpen(true), []);
  const closeChat = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, openChat, closeChat }),
    [isOpen, openChat, closeChat],
  );

  return <SiteChatContext.Provider value={value}>{children}</SiteChatContext.Provider>;
}

export function useSiteChat() {
  const ctx = useContext(SiteChatContext);
  if (!ctx) {
    throw new Error('useSiteChat must be used within SiteChatProvider');
  }
  return ctx;
}
