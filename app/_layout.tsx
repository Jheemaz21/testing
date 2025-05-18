import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { CartProvider } from '../context/CartContext'; // ⬅️ import

export default function Layout() {
    return (
        <CartProvider> {/* ⬅️ bungkus tab */}
            <Tabs>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Beranda',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="home" color={color} size={size} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="menu"
                    options={{
                        title: 'Menu',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="cafe" color={color} size={size} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="cart"
                    options={{
                        title: 'Keranjang',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="cart" color={color} size={size} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="riwayat"
                    options={{
                        title: 'Riwayat',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="time" color={color} size={size} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profil',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="person" color={color} size={size} />
                        ),
                    }}
                />
            </Tabs>
        </CartProvider>
    );
}
