import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Profile() {
    const handleLogout = () => {
        Alert.alert('Logout', 'Anda yakin ingin logout?', [
            { text: 'Batal', style: 'cancel' },
            {
                text: 'Ya',
                onPress: () => {
                    console.log('User logged out');
                    // Tambahkan logika logout sesungguhnya di sini (misal clear token atau navigasi)
                },
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>👤 Profil Pengguna</Text>

            <View style={styles.infoContainer}>
                <View style={styles.infoBox}>
                    <Text style={styles.label}>Nama:</Text>
                    <Text style={styles.value}>John Doe</Text>
                </View>

                <View style={styles.infoBox}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.value}>john.doe@example.com</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>🚪 Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 32,
        textAlign: 'center',
        color: '#333',
    },
    infoContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    infoBox: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        color: '#666',
        marginBottom: 4,
    },
    value: {
        fontSize: 18,
        fontWeight: '600',
        color: '#222',
    },
    logoutButton: {
        marginTop: 40,
        backgroundColor: '#e53935',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    logoutText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
