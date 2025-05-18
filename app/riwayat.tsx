import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Transaksi, useCart } from '../context/CartContext';

export default function RiwayatTransaksi() {
    const { riwayatTransaksi } = useCart();

    if (riwayatTransaksi.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.emptyText}>Belum ada transaksi</Text>
            </View>
        );
    }

    const renderItem = ({ item }: { item: Transaksi }) => (
        <View style={styles.card}>
            <Text style={styles.tanggal}>
                {item.tanggal.toLocaleString()}
            </Text>
            <FlatList
                data={item.items}
                keyExtractor={(menuItem) => menuItem.id}
                renderItem={({ item }) => (
                    <Text style={styles.item}>
                        {item.icon} {item.nama} - Rp {item.harga.toLocaleString()}
                    </Text>
                )}
            />
            <Text style={styles.total}>Total: Rp {item.total.toLocaleString()}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>📜 Riwayat Transaksi</Text>
            <FlatList
                data={riwayatTransaksi}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    emptyText: { textAlign: 'center', marginTop: 40, color: '#888', fontSize: 16 },
    card: {
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
    },
    tanggal: { fontWeight: '600', marginBottom: 8 },
    item: { fontSize: 16, paddingVertical: 2 },
    total: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 16,
        color: '#2e7d32',
        textAlign: 'right',
    },
});
