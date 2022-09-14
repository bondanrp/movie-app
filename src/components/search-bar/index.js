import { TextInput, TouchableOpacity, View, Text } from "react-native";
import styles from "../../styles/styles";

export default function SearchBar({ state, clear, setState, search }) {
  return (
    <View elevation={5} style={styles.searchBar}>
      <TextInput
        value={state.input}
        onChangeText={(text) => {
          setState((prevState) => {
            return { ...prevState, input: text };
          });
        }}
        onFocus={() => {
          setState((prevState) => ({ ...prevState, typing: true }));
        }}
        onBlur={() => {
          setState((prevState) => ({ ...prevState, typing: false }));
        }}
        placeholder="Enter a movie title..."
        style={styles.searchText}
        onSubmitEditing={search}
      />
      {state.query ? (
        <TouchableOpacity onPress={clear} style={styles.cancelType}>
          <Text>X</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
