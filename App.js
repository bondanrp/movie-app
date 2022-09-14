import { View } from "react-native";
import styles from "./src/styles/styles";
import Home from "./src/views/home";
import { Provider, useDispatch } from "react-redux";
import store from "./src/redux/store";
import Loading from "./src/components/loading";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Home />
        <Loading />
      </View>
      <StatusBar style="light" />
    </Provider>
  );
}
