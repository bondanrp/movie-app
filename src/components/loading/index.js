import { ActivityIndicator, Modal, View } from "react-native";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";

export default function Loading() {
  let isLoading = useSelector((state) => state.loading.isLoading);
  return (
    <Modal animationType="fade" transparent visible={isLoading}>
      <View style={styles.loadingModal}>
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      </View>
    </Modal>
  );
}
