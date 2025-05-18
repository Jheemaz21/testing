import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>👋 Hai, Kasir!</Text>

            <Text style={styles.label}>Total Transaksi Hari Ini</Text>
            <Text style={styles.value}>12 transaksi</Text>

            <Text style={styles.label}>Total Pendapatan</Text>
            <Text style={styles.value}>Rp 1.250.000</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/menu')}
            >
                <Text style={styles.buttonText}>Mulai Transaksi Baru</Text>
            </TouchableOpacity>

            <View style={styles.bottomRow}>
                <TouchableOpacity
                    style={styles.miniButton}
                    onPress={() => router.push('/cart')}
                >
                    <Text style={styles.miniText}>🛒 Keranjang</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.miniButton}
                    onPress={() => router.push('/profile')}
                >
                    <Text style={styles.miniText}>👤 Profil</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 24,
        justifyContent: 'center',
    },
    welcome: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 32,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        color: '#888',
        marginTop: 8,
    },
    value: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 16,
        borderRadius: 12,
        marginTop: 24,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 32,
    },
    miniButton: {
        backgroundColor: '#eee',
        padding: 14,
        borderRadius: 10,
        width: '48%',
        alignItems: 'center',
    },
    miniText: {
        fontWeight: '600',
    },
});
