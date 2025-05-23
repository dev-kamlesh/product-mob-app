import React, { useState } from 'react';
import { View, Text, Image, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { useWishList } from '../context/WishListContext';

const ProductDetail = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'ProductDetail'>>();
    const { product } = route.params;
    const { addToWishList, removeFromWishList, wishList } = useWishList();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const isInWishList = wishList.some(item => item.id === product.id);

    const handleWishListToggle = () => {
        if (isInWishList) {
            removeFromWishList(product.id);
        } else {
            addToWishList(product);
        }
    };

    const handleInquiry = () => {
        if (!name || !email) {
            Alert.alert('Validation Failed', 'Please fill out all fields.');
            return;
        }
        Alert.alert('Inquiry Sent', `Thank you ${name}, we will reach out to you.`);
        setName('');
        setEmail('');
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>${product.price}</Text>
            <Text style={styles.description}>{product.description}</Text>
            {/* <Button title="Add to Wish List" onPress={() => addToWishList(product)} /> */}
            <Button
                title={isInWishList ? 'Remove from Wish List' : 'Add to Wish List'}
                onPress={handleWishListToggle}
            />
            <View style={styles.form}>
                <Text style={styles.formTitle}>Inquiry Form</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <Button title="Submit Inquiry" onPress={handleInquiry} />
            </View>
        </View>
    );
};

export default ProductDetail;

const styles = StyleSheet.create({
    container: { padding: 16 },
    image: { width: '100%', height: 200, resizeMode: 'contain' },
    title: { fontSize: 20, fontWeight: 'bold', marginVertical: 8 },
    price: { fontSize: 18, color: '#6200ee' },
    description: { fontSize: 14, marginVertical: 8 },
    form: { marginTop: 20 },
    formTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    input: { borderWidth: 1, borderRadius: 5, marginBottom: 10, padding: 8 },
});
