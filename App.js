import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';
import ToDo from "./ToDo";

const { width } = Dimensions.get('window');

export default class App extends React.Component {
  state = {
    newTodo: '',
  };

  onChangeText = text => {
    this.setState({
      newToDo: text,
    })
  };

  render() {
    const { newToDo } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle={"light-content"} />
        <Text style={styles.title}>ToDo</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            value={newToDo}
            placeholder={"input new todo"}
            placeholderTextColor={"#999"}
            onChangeText={this.onChangeText}
            returnKeyType={"done"}
            autoCorrect={false}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            <ToDo text={'hello'}/>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '200',
    marginTop: 50,
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50, 50, 50)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0,
        },
      },
      android: {
        evaluate: 3,
      },
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25,
  },
  toDos: {
    alignItems: 'center',
  },
});
