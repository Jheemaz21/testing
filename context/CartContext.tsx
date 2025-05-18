import React, { createContext, ReactNode, useContext, useState } from 'react';

export type MenuItem = {
    id: string;
    nama: string;
    harga: number;
    icon?: string;
};

export type Transaksi = {
    id: string;
    items: MenuItem[];
    total: number;
    tanggal: Date;
};

type CartContextType = {
    keranjang: MenuItem[];
    tambah: (item: MenuItem) => void;
    hapus: (id: string) => void;
    kosongkanKeranjang: () => void;
    setKeranjang: React.Dispatch<React.SetStateAction<MenuItem[]>>;
    total: number;
    prosesTransaksi: () => boolean; // true jika sukses
    riwayatTransaksi: Transaksi[];
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [keranjang, setKeranjang] = useState<MenuItem[]>([]);
    const [riwayatTransaksi, setRiwayatTransaksi] = useState<Transaksi[]>([]);

    const tambah = (item: MenuItem) => setKeranjang((prev) => [...prev, item]);

    const hapus = (id: string) =>
        setKeranjang((prev) => prev.filter((_, i) => i !== Number(id)));

    const kosongkanKeranjang = () => setKeranjang([]);

    const total = keranjang.reduce((sum, item) => sum + item.harga, 0);
    const prosesTransaksi = () => {
        if (keranjang.length === 0) return false;

        const newTransaksi: Transaksi = {
            id: (riwayatTransaksi.length + 1).toString(),
            items: [...keranjang],
            total,
            tanggal: new Date(),
        };

        setRiwayatTransaksi((prev) => [...prev, newTransaksi]);
        setKeranjang([]); // kosongkan keranjang

        return true;
    };

    return (
        <CartContext.Provider value={{ keranjang, tambah, hapus, kosongkanKeranjang, setKeranjang, total, prosesTransaksi, riwayatTransaksi }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart harus digunakan dalam <CartProvider>');
    return context;
};
