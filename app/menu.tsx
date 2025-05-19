import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    LayoutAnimation,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    UIManager,
    View,
} from 'react-native';
import { useCart } from '../context/CartContext';

type MenuItem = {
    id: string;
    nama: string;
    harga: number;
    icon: string;
};

export default function MenuScreen() {
    const { tambah } = useCart();

    const [dataMenu, setDataMenu] = useState<MenuItem[]>([
        { id: '1', icon: '☕', nama: 'Kopi Hitam', harga: 12000 },
        { id: '2', icon: '🍵', nama: 'Cappuccino', harga: 18000 },
        { id: '3', icon: '🫖', nama: 'Teh Manis', harga: 10000 },
        { id: '4', icon: '🍞', nama: 'Roti Bakar', harga: 15000 },
        { id: '5', icon: '🍚', nama: 'Nasi Goreng', harga: 25000 },
    ]);

    const [showForm, setShowForm] = useState(false);
    const [nama, setNama] = useState('');
    const [harga, setHarga] = useState('');
    const [icon, setIcon] = useState('');

    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const tambahKeKeranjang = (item: MenuItem) => {
        tambah(item);
        if (Platform.OS === 'android') {
            ToastAndroid.show(`${item.nama} ditambahkan ke keranjang`, ToastAndroid.SHORT);
        } else {
            Alert.alert('Berhasil', `${item.nama} ditambahkan ke keranjang`);
        }

    };

    const isSingleEmoji = (str: string) => {
        return [...str.trim()].length === 1;
    };

    const handleTambahMenu = () => {
        if (!nama.trim() || !harga.trim() || !icon.trim()) {
            Alert.alert('Error', 'Semua kolom harus diisi');
            return;
        }

        if (!isSingleEmoji(icon)) {
            Alert.alert('Error', 'Icon harus berupa satu emoji');
            return;
        }

        const parsedHarga = parseInt(harga, 10);
        if (isNaN(parsedHarga)) {
            Alert.alert('Error', 'Harga harus berupa angka');
            return;
        }

        const newItem: MenuItem = {
            id: Date.now().toString(),
            nama: nama.trim(),
            harga: parsedHarga,
            icon: icon.trim(),
        };

        LayoutAnimation.easeInEaseOut();
        setDataMenu(prev => [...prev, newItem]);

        // Reset form
        setNama('');
        setHarga('');
        setIcon('');
        ToastAndroid.show('Menu baru ditambahkan', ToastAndroid.SHORT);
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
                            <Text style={styles.nama}>{item.icon} {item.nama}</Text>
                            <Text style={styles.harga}>Rp {item.harga.toLocaleString()}</Text>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={() => tambahKeKeranjang(item)}>
                            <Text style={styles.buttonText}>+ Tambah</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <TouchableOpacity
                style={styles.toggleFormButton}
                onPress={() => {
                    LayoutAnimation.easeInEaseOut();
                    setShowForm(!showForm);
                }}
            >
                <Text style={styles.toggleFormText}>
                    {showForm ? 'Sembunyikan Form' : '➕ Tambah Menu Baru'}
                </Text>
            </TouchableOpacity>

            {showForm && (
                <View style={styles.form}>
                    <Text style={styles.formTitle}>Tambah Menu Baru</Text>
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
                    <TextInput
                        placeholder="Emoji Icon (contoh: 🍔)"
                        style={styles.input}
                        value={icon}
                        onChangeText={setIcon}
                        maxLength={2}
                    />
                    <TouchableOpacity style={styles.addButton} onPress={handleTambahMenu}>
                        <Text style={styles.addButtonText}>Tambah Menu</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    nama: { fontSize: 18, fontWeight: '600' },
    harga: { color: '#555', fontSize: 14 },
    button: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    buttonText: { color: '#fff', fontWeight: '600' },
    toggleFormButton: {
        backgroundColor: '#FF9800',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    toggleFormText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
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
