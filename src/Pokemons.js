import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const Pokemons = (props) => {
  const [pokemons, setPokemons] = useState([]);
  const [searchfeild, setSearchfeild] = useState('');

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = () => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=964')
      .then((response) => response.json())
      .then((poke) => setPokemons(poke.results));
  };
  console.log(pokemons.length);
  return pokemons.length !== 0 ? (
    <View>
      <View style={styles.searchCont}>
        <TextInput
          style={styles.searchfeild}
          placeholder="Search Pokemons"
          onChangeText={(value) => setSearchfeild(value)}
          value={searchfeild}
        />
      </View>
      <ScrollView>
        <View style={styles.container}>
          {pokemons
            .filter((pokemon) =>
              pokemon.name.toLowerCase().includes(searchfeild.toLowerCase()),
            )
            .map((pokemon, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  key={index}
                  style={styles.card}
                  onPress={() =>
                    props.navigation.navigate('Details', {
                      pokemon: pokemon.name,
                    })
                  }>
                  <Image
                    style={{width: 150, height: 168}}
                    source={{
                      uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${pokemon.name}.png`,
                    }}
                  />
                  <Text>{pokemon.name}</Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
    </View>
  ) : (
    <View style={styles.indicator}>
      <ActivityIndicator size="large" color="#E63F34" />
    </View>
  );
};

export default Pokemons;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 50,
  },
  card: {
    alignItems: 'center',
    borderBottomColor: 'black',
    borderRadius: 15,
    borderWidth: 1,
    display: 'flex',
    marginHorizontal: 3,
    width: '45%',
    marginVertical: 10,
    paddingBottom: 10,
  },
  searchCont: {
    flex: 1,
    marginBottom: 70,
    marginTop: 1,
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    backgroundColor: '#f2f2f2',
  },
  searchfeild: {
    borderColor: '#000',
    borderRadius: 50,
    borderWidth: 1,
    flex: 1,
    height: 40,
    marginHorizontal: '3%',
    textAlign: 'center',
    backgroundColor: '#f5f1da',
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
