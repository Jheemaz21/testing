import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../context/CartContext';

export default function CartScreen() {
    const { keranjang, hapus, total, kosongkanKeranjang, setKeranjang, prosesTransaksi } = useCart();

    const handleProsesTransaksi = () => {
        const berhasil = prosesTransaksi();
        if (berhasil) {
            Alert.alert('Sukses', 'Transaksi berhasil diproses');
        } else {
            Alert.alert('Info', 'Keranjang masih kosong');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🛒 Keranjang Belanja</Text>

            {keranjang.length === 0 ? (
                <Text style={styles.empty}>Keranjang kosong</Text>
            ) : (
                <>
                    <FlatList
                        data={keranjang}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <View style={styles.card}>
                                <Text style={styles.item}>
                                    {item.icon} {item.nama} - Rp {item.harga.toLocaleString()}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => hapus(index.toString())}
                                    style={styles.hapusBtn}
                                >
                                    <Text style={styles.hapusText}>Hapus</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />

                    <Text style={styles.total}>Total: Rp {total.toLocaleString()}</Text>

                    <TouchableOpacity style={styles.button} onPress={handleProsesTransaksi}>
                        <Text style={styles.buttonText}>Proses Transaksi</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    empty: { textAlign: 'center', color: '#888' },
    card: {
        backgroundColor: '#f1f1f1',
        padding: 12,
        marginBottom: 10,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    item: { fontWeight: '600' },
    hapusBtn: {
        backgroundColor: '#ff6666',
        paddingHorizontal: 10,
        borderRadius: 6,
    },
    hapusText: { color: 'white' },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#4CAF50',
        marginTop: 16,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
