import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  TextInput
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ListView from "./components/ListView";
import Services from "./services";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 24
  },
  newItemWrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
    flexDirection: "row"
  },
  input: {
    backgroundColor: "#ececec",
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 12
  }
});

export default class App extends React.Component {
  state = {
    data: [],
    isLoading: true,
    newItemValue: ""
  };

  async componentDidMount() {
    const response = await Services.getTodos();
    this.setState({ data: response, isLoading: false });
  }

  deleteItem = id => {
    const { data } = this.state;
    const array = [...data];
    const index = array.findIndex(e => e.id === id);
    array.splice(index, 1);
    this.setState({ data: array });
  };

  handleCreateNewItem = () => {
    const { newItemValue } = this.state;
    const newItem = {
      id: "",
      value: ""
    };

    if (newItemValue) {
      newItem.id = Date.now().toString();
      newItem.value = newItemValue;
    }
    this.setState(currState => ({
      newItemValue: "",
      data: [...[newItem, ...currState.data]]
    }));
  };

  renderContent = () => {
    const { data, newItemValue, isLoading } = this.state;

    return (
      <View>
        <View style={styles.newItemWrapper}>
          <TextInput
            placeholder="New TODO"
            style={styles.input}
            value={newItemValue}
            type="text"
            onChangeText={text => this.setState({ newItemValue: text })}
            autoFocus
          />
          <TouchableOpacity onPress={this.handleCreateNewItem}>
            <MaterialCommunityIcons name="check-circle-outline" size={32} />
          </TouchableOpacity>
        </View>

        <ListView data={data} deleteItem={this.deleteItem} />
      </View>
    );
  };

  render() {
    const { data, newItemValue, isLoading } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? <ActivityIndicator /> : this.renderContent()}
      </View>
    );
  }
}
