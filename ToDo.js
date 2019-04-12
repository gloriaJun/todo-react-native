import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const { width } = Dimensions.get('window');

export default class ToDo extends React.Component {
  state = {
    isEditing: false,
    isCompleted: false,
    toDoValue: '',
  };

  toggleComplete = () => {
    this.setState(prevState => {
      return {
        isCompleted: !prevState.isCompleted,
      }
    });
  };

  onPressStartEditing = () => {
    const { text } = this.props;

    this.setState({
      isEditing: true,
      toDoValue: text,
    });
  };

  onPressFinishEditing = () => {
    this.setState({
      isEditing: false
    });
  };

  onChangeText = text => {
    this.setState({
      toDoValue: text,
    })
  };

  render() {
    const { isCompleted, isEditing, toDoValue } = this.state;
    const { text } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this.toggleComplete}>
            <View style={[
              styles.circle,
              isCompleted ? styles.completedCircle : styles.unCompletedCircle
            ]} />
          </TouchableOpacity>
          {isEditing? (
            <TextInput
              style={styles.input}
              value={toDoValue}
              mulitiline={true}
              onChangeText={this.onChangeText}
              returnKeyType={"done"}
              autoCorrect={false}
              onBlur={this.onPressFinishEditing}
            />
          ) : (
            <Text style={[
              styles.input,
              styles.text,
              isCompleted ? styles.completedText : styles.unCompletedText
            ]}>{text}</Text>
          )}
        </View>

        {isEditing ? (
          <View style={styles.actions}>
            <TouchableOpacity onPress={this.onPressFinishEditing}>
              <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>✅</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.actions}>
            <TouchableOpacity onPress={this.onPressStartEditing}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>✏️</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>❌</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width / 2,
  },
  actions: {
    flexDirection: 'row',
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  actionText: {

  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 20,
    borderWidth: 3,
    marginRight: 20,
  },
  completedCircle: {
    borderColor: '#bbb',
  },
  unCompletedCircle: {
    borderColor: '#F23657',
  },
  input: {
    fontSize: 20,
    marginVertical: 20,
    width: width / 2,
    fontWeight: '600',
  },
  text: {
  },
  completedText: {
    color: '#bbb',
    textDecorationLine: 'line-through',
  },
  unCompletedText: {
    color: '#353535',
  },
});