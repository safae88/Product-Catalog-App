import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { initDatabase, saveProduct } from '../database/db';

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);

  //-----Récupération des produits de l'API-----
  const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log("Could not fetch products", error);
    }
  };

  //-----Sauvegarde des produits-----
  const handleSaveProduct = async (product) => {
    try {
      await saveProduct(product);
      Alert.alert('Succes', 'Produit sauvegardé avec succès dans vos favoris'); //Boite de dialogue
      navigation.navigate('Favoris');
    } catch (error) {
      console.log('Could not save product', error);
      Alert.alert('Erreur', 'Impossible de sauvegarder le produit.');
    }
  };
 ///****Cette fnc execute automatiquement******//
  useEffect(() => {
    initDatabase().catch((error) => {
      console.log('Could not initialize database', error);
    });
    fetchProducts();
  }, []); // [] : means execute just once

  //-----Affichage des produits-----
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => ( //comme une boucle
        <View style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>{item.price} $</Text>
          <TouchableOpacity style={styles.saveButton} onPress={() => handleSaveProduct(item)}>
            <Text style={styles.saveButtonText}>Sauvegarder</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  card: {
    width: '92%',
    maxWidth: 360,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e4e4e7',
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  title: {
    fontWeight: '700',
    fontSize: 15,
    textAlign: 'center',
    color: '#111827',
  },
  price: {
    marginTop: 4,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
  },
  saveButton: {
    backgroundColor: '#10b981',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 999,
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 13,
  },
});