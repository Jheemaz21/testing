import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Profile() {
    const handleLogout = () => {
        Alert.alert('Logout', 'Anda yakin ingin logout?', [
            { text: 'Batal', style: 'cancel' },
            { text: 'Ya', onPress: () => console.log('User logged out') },
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profil Pengguna</Text>

            <View style={styles.infoBox}>
                <Text style={styles.label}>Nama:</Text>
                <Text style={styles.value}>John Doe</Text>
            </View>

            <View style={styles.infoBox}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>john.doe@example.com</Text>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, backgroundColor: '#fff', justifyContent: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
    infoBox: { marginBottom: 16 },
    label: { fontSize: 16, color: '#666' },
    value: { fontSize: 18, fontWeight: '600' },
    logoutButton: {
        marginTop: 40,
        backgroundColor: '#e53935',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    logoutText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
