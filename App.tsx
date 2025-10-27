import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function TestScreen() {
  const { user, loading, signIn } = useAuth();

  const handleTestLogin = async () => {
    const result = await signIn('test@example.com', 'password123');
    console.log('Login result:', result);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>KazaSwap Mobile</Text>
      <Text>User: {user?.email || 'Not logged in'}</Text>
      <Button title="Test Login" onPress={handleTestLogin} />
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <TestScreen />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
