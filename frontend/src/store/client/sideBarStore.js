import { create } from 'zustand';

export const useSidebarStore = create((set) => ({
    sidebarVisible: false,
    toggleSidebar: () => set((state) => ({ sidebarVisible: !state.isSidebarExpanded })),
    showSidebar: () => set({ sidebarVisible: true }),
    closeSidebar: () => set({ sidebarVisible: false }),
}));

