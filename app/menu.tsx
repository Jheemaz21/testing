import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useCart } from '../context/CartContext';

type MenuItem = {
    id: string;
    nama: string;
    harga: number;
    icon: string;
};

export default function MenuScreen() {
    const { tambah } = useCart();

    // State menu dan form input
    const [dataMenu, setDataMenu] = useState<MenuItem[]>([
        { id: '1', icon: '☕', nama: 'Kopi Hitam', harga: 12000 },
        { id: '2', icon: '🍵', nama: 'Cappuccino', harga: 18000 },
        { id: '3', icon: '🫖', nama: 'Teh Manis', harga: 10000 },
        { id: '4', icon: '🍞', nama: 'Roti Bakar', harga: 15000 },
        { id: '5', icon: '🍚', nama: 'Nasi Goreng', harga: 25000 },
    ]);

    const [nama, setNama] = useState('');
    const [harga, setHarga] = useState('');
    const [icon, setIcon] = useState('');

    const tambahKeKeranjang = (item: MenuItem) => {
        tambah(item);
    };

    const handleTambahMenu = () => {
        if (!nama.trim() || !harga.trim() || !icon.trim()) {
            Alert.alert('Error', 'Semua kolom harus diisi');
            return;
        }
        if (isNaN(Number(harga))) {
            Alert.alert('Error', 'Harga harus berupa angka');
            return;
        }
        const newItem: MenuItem = {
            id: (dataMenu.length + 1).toString(),
            nama: nama.trim(),
            harga: Number(harga),
            icon: icon.trim(),
        };
        setDataMenu((prev) => [...prev, newItem]);

        // reset input form
        setNama('');
        setHarga('');
        setIcon('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>🍽️ Daftar Menu</Text>

            <FlatList
                data={dataMenu}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View>
                            <Text style={styles.nama}>
                                {item.icon} {item.nama}
                            </Text>
                            <Text style={styles.harga}>Rp {item.harga.toLocaleString()}</Text>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={() => tambahKeKeranjang(item)}>
                            <Text style={styles.buttonText}>+ Tambah</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            {/* Form tambah menu */}
            <View style={styles.form}>
                <Text style={styles.formTitle}>Tambah Menu Baru</Text>

                <TextInput
                    placeholder="Icon (misal ☕)"
                    style={styles.input}
                    value={icon}
                    onChangeText={setIcon}
                />
                <TextInput
                    placeholder="Nama Menu"
                    style={styles.input}
                    value={nama}
                    onChangeText={setNama}
                />
                <TextInput
                    placeholder="Harga"
                    style={styles.input}
                    value={harga}
                    onChangeText={setHarga}
                    keyboardType="numeric"
                />

                <TouchableOpacity style={styles.addButton} onPress={handleTambahMenu}>
                    <Text style={styles.addButtonText}>Tambah Menu</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f8f8f8',
        padding: 16,
        marginBottom: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    nama: { fontSize: 16, fontWeight: '600' },
    harga: { color: '#888' },
    button: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    buttonText: { color: '#fff', fontWeight: '600' },
    form: {
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingTop: 20,
    },
    formTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 12,
        fontSize: 16,
    },
    addButton: {
        backgroundColor: '#2196F3',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
