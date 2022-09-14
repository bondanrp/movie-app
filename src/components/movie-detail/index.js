import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import styles from "../../styles/styles";
export default function MovieDetail({
  data,
  handleBackButtonClick,
  closeModal,
}) {
  let toFixedIfNecessary = (value) => {
    if (!isNaN(value)) {
      return +parseFloat(value).toFixed(2);
    } else {
      return "-";
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={!!data}
      onRequestClose={handleBackButtonClick}
    >
      {!!data ? (
        <ImageBackground
          style={styles.backdrop}
          source={{
            uri: `https://image.tmdb.org/t/p/original${data.poster_path}`,
          }}
        >
          <View style={styles.closeContainer}>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            onMomentumScrollBegin={handleBackButtonClick}
            style={styles.modalScroll}
          >
            <View style={styles.modalView}>
              <View style={styles.modal}>
                <View style={styles.modalContent}>
                  <View style={styles.modalTitleRating}>
                    <Text style={styles.modalTitle}>{data.original_title}</Text>
                  </View>
                  <View style={styles.modalTitleRating}>
                    <Text style={styles.modalSubtext}>
                      📅{" "}
                      {data.release_date
                        ? data.release_date.split("-")[0]
                        : "-"}
                    </Text>
                    <Text style={styles.modalSubtext}>
                      {toFixedIfNecessary(data.vote_average)}
                      /10 ⭐
                    </Text>
                  </View>
                  <Text style={styles.modalSubtext}>
                    🌐{" "}
                    {data.production_companies && data.production_companies[0]
                      ? data.production_companies.map((val, idx) => {
                          return idx !== data.production_companies.length - 1
                            ? val.name + ", "
                            : val.name;
                        })
                      : "-"}
                  </Text>
                  <Text style={styles.modalSubtitle}>TAGLINE</Text>
                  <Text style={styles.modalText}>
                    {data.tagline ? data.tagline : "-"}
                  </Text>
                  <Text style={styles.modalSubtitle}>OVERVIEW</Text>
                  <Text style={styles.modalText}>
                    {data.overview ? data.overview : "-"}
                  </Text>
                  <Text style={styles.modalSubtitle}>GENRE</Text>
                  <Text style={styles.modalText}>
                    {data.genres && data.genres[0]
                      ? data.genres.map((val, idx) => {
                          return idx !== data.genres.length - 1
                            ? val.name + ", "
                            : val.name;
                        })
                      : "-"}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      ) : null}
    </Modal>
  );
}
