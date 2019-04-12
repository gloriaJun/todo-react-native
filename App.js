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
import { AppLoading } from 'expo';
import uuid from 'uuid';

import ToDo from "./ToDo";

const { width } = Dimensions.get('window');

export default class App extends React.Component {
  state = {
    newToDo: '',
    toDos: {},
    loadedToDos: false,
  };

  componentDidMount() {
    this.setLoading();
  }

  onChangeText = text => {
    this.setState({
      newToDo: text,
    })
  };

  setLoading = () => {
    this.setState({
      loadedToDos: true,
    })
  };

  addToDo = () => {
    const { newToDo } = this.state;
    if (newToDo !== '') {
      this.setState(prevState => {
        const ID = uuid();
        const newToDoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newToDo,
            createdAt: Date.now(),
          }
        };
        return {
          ...prevState,
          newToDo: '',
          toDos: {
            ...prevState.toDos,
            ...newToDoObject,
          },
        };
      })
    }
  };

  deleteTodo = id => {
    this.setState(prevState => {
      const toDos = prevState.toDos;
      delete toDos[id];
      return {
        ...prevState,
        ...toDos,
      };
    })
  };

  toggleCompleteToDo = id => {
    this.setState(prevState => {
      const todo = prevState.toDos[id];
      return {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...todo,
            isCompleted: !todo.isCompleted,
          }
        },
      };
    })
  };

  updateToDo = (id, text) => {
    this.setState(prevState => {
      const todo = prevState.toDos[id];
      return {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...todo,
            text: text,
          }
        },
      };
    })
  };

  render() {
    const { newToDo, toDos, loadedToDos } = this.state;

    if (!loadedToDos) {
      return <AppLoading />
    }

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
            onSubmitEditing={this.addToDo}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            {Object.values(toDos).map(todo =>
              <ToDo
                key={todo.id}
                {...todo}
                deleteToDo={this.deleteTodo}
                toggleCompleteToDo={this.toggleCompleteToDo}
                updateToDo={this.updateToDo}
              />
            )}
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
