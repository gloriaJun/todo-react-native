import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

const { width } = Dimensions.get('window');

export default class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      toDoValue: props.text,
    };
  }

  static propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    deleteToDo: PropTypes.func.isRequired,
    updateToDo: PropTypes.func.isRequired,
  };

  onPressStartEditing = () => {
    this.setState({ isEditing: true });
  };

  onPressFinishEditing = () => {
    const { id, updateToDo } = this.props;
    const { toDoValue } = this.state;

    updateToDo(id, toDoValue)
    this.setState({ isEditing: false });
  };

  onChangeText = text => {
    this.setState({ toDoValue: text })
  };

  render() {
    const { isEditing, toDoValue } = this.state;
    const {
      id,
      text,
      isCompleted,
      deleteToDo,
      toggleCompleteToDo,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={() =>toggleCompleteToDo(id)}>
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
            <TouchableOpacity onPress={() => deleteToDo(id)}>
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