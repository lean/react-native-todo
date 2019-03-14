import React, { Component } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  StyleSheet
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 6,
    paddingBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  },
  textWrapper: {
    flex: 3
  },
  text: {
    fontSize: 18
  },
  buttonsWrapper: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between"
  },
  input: {
    backgroundColor: "#ececec",
    fontSize: 18,
    marginRight: 6
  }
});

class ListViewItem extends Component {
  state = {
    isEditing: false,
    content: this.props.data.value
  };

  handleEdit = () => this.setState({ isEditing: true });
  handleCancelEdit = () => this.setState({ isEditing: false });

  handleDelete = () => {
    this.props.deleteItemHandler(this.props.data.id);
  };

  render() {
    const { isEditing, content } = this.state;

    return (
      <View style={styles.wrapper}>
        <View style={styles.textWrapper}>
          {isEditing ? (
            <TextInput
              value={content}
              type="text"
              onChangeText={text => this.setState({ content: text })}
              autoFocus
              selectTextOnFocus
              onBlur={this.handleCancelEdit}
              style={styles.input}
            />
          ) : (
            <Text style={styles.text}>{content}</Text>
          )}
        </View>

        <View style={styles.buttonsWrapper}>
          <TouchableOpacity onPress={this.handleEdit}>
            <MaterialCommunityIcons
              name="square-edit-outline"
              size={32}
              color="green"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleDelete}>
            <MaterialCommunityIcons
              name="delete-outline"
              size={32}
              color="red"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

module.exports = ListViewItem;
