import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "../../styles/styles";

export default function MovieCard({ item, index, getDetail }) {
  var result = item.item;
  if (result.empty) {
    return <View style={[styles.result, styles.resultInvis]} />;
  } else {
    return (
      <TouchableOpacity
        onPress={() => {
          getDetail(result);
        }}
        style={styles.result}
        key={`${index}listItem${result.id}`}
      >
        {result.poster_path ? (
          <Image
            style={styles.posters}
            source={{
              uri: `https://image.tmdb.org/t/p/original${result.poster_path}`,
            }}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.notAvailable}>
            <Text>No Poster</Text>
            <Text>Available</Text>
          </View>
        )}
        <Text style={styles.resultTitle}>{result.original_title}</Text>
        <Text style={styles.resultYear}>
          {result.release_date ? result.release_date.split("-")[0] : ""}
        </Text>
      </TouchableOpacity>
    );
  }
}
