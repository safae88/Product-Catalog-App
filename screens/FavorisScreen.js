import { deleteSavedFavori, getSavedFavoris } from "../database/db";
import { View, FlatList, Image, Text, Button, Alert } from 'react-native';
import React, { useState} from "react";
import { useFocusEffect } from '@react-navigation/native';

export default function Favoris({}) {

const [Favoris, setFavoris] = useState([]);

const loadFavoris = async () => {
    try{
        const data = await getSavedFavoris();
        setFavoris(data); //Update de products
    }
    catch(error){
        console.log("Could not load Favoris products", error);
    }
};

const handleDeleteFavori = (productId) => {
  Alert.alert("Confirmation","Supprimer ce produit des favoris ?", //boite de dialogue
    [
      { text: "Annuler", style: "cancel" },
      { text: "Supprimer", style: "destructive",
        onPress: async () => {
          try {
            await deleteSavedFavori(productId);
            await loadFavoris(); //refresh la liste des Favoris
          } catch (error) {
            console.log("Could not delete favoris product", error);
          }
        }
      }
    ]
  );
};

useFocusEffect(
  React.useCallback(() => { //Garder la même fonction en mémoire au lieu d'en créer une nouvelle chaque fois
    loadFavoris();
  }, [])
);


return(
        <View style={{ flex: 1 }}>
          <FlatList
            data={Favoris}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={{ padding: 10 }}>
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 100, height: 100 }}
                />
                <Text>{item.title}</Text>
                <Text>{item.price} $</Text>
                <Button title="Supprimer" color="red" onPress={() => handleDeleteFavori(item.id)} />
              </View>
            )}
          />
        </View>
);

}