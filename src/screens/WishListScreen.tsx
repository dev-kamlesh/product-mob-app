import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useWishList } from '../context/WishListContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

const WishListScreen = () => {
  const { wishList, removeFromWishList } = useWishList();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (wishList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your wish list is empty.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={wishList}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })}>
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>${item.price}</Text>
              <TouchableOpacity onPress={() => removeFromWishList(item.id)}>
                <Text style={styles.remove}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default WishListScreen;

const styles = StyleSheet.create({
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16 },
  item: { flexDirection: 'row', padding: 10, alignItems: 'center' },
  image: { width: 60, height: 60, marginRight: 10 },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 14, color: '#6200ee' },
  remove: { marginTop: 4, color: 'red' },
});
