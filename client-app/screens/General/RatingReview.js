import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
// import Supervisor from "../assets/icon.png";
import { Rating } from "react-native-ratings";
import ipconfig from "../../ipconfig";
const RatingReview = ({ complexId }) => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  const ip = ipconfig.ip;

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://${ip}:9999/getAllRatings?sportComplex=${complexId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setData(result.data))
      .catch((error) => console.log("error", error))
      .finally(() => {
        setLoading(false);
      });
  }, [ip]);

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#fbe8e0" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ratings and Reviews</Text>
      <Text style={styles.subtitle}>
        Ratings and reviews are verified and from people who are athletes who
        train at this complex.
      </Text>
      <View style={styles.reviewsContainer}>
        {data.map((review) => (
          <View style={styles.review} key={review.author}>
            <View style={{ flexDirection: "row" }}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 10,
                  borderColor: "black",
                  borderWidth: 1,
                  // backgroundColor: "white",
                }}
                source={{
                  uri: `http://${ip}:9999/${review.athleteId.baseUrl.slice(1)}`,
                }}
              />
              <Text style={styles.author}>{review.athleteId.userId.Name}</Text>
            </View>
            <View style={styles.ratingRow}>
              <View
                style={{
                  backgroundColor: "#fff",
                  padding: 5,
                  borderRadius: 10,
                  marginLeft: "-2%",
                  flexDirection: "row",
                }}
              >
                <Text style={styles.sport}>
                  Sport: {review.sport.SportName}
                </Text>
                <Rating
                  type="star"
                  ratingCount={5}
                  imageSize={20}
                  showRating={false}
                  startingValue={review.rating}
                  minValue={1}
                  disabled
                  style={styles.starContainer}
                />
              </View>
            </View>
            <Text style={styles.reviewText}>{review.remarks}</Text>
            <TouchableOpacity style={styles.helpfulButton}>
              <Text style={styles.helpfulText}>Was this review helpful?</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default RatingReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: "5%",
    marginLeft: "5%",
  },
  subtitle: {
    marginLeft: "5%",
    fontSize: 16,
    color: "#666",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewsContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    width: "96%",
    marginLeft: "2%",
  },
  review: {
    padding: "3%",
  },
  author: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginLeft: "2%",
  },
  starContainer: {
    backgroundColor: "#fbe8e0",
    marginTop: "1%",
  },
  sport: {
    alignSelf: "center",
    marginLeft: "3%",
    fontSize: 16,
  },
  reviewText: {
    fontSize: 16,
    color: "#666",
  },
  helpfulButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  helpfulText: {
    fontSize: 16,
    fontWeight: "bold",
    // color: "#666",
  },

  // helpfulCount: {
  //     fontSize: 16,
  //     fontWeight: "bold",
  //     marginLeft: 10,
  // },
  // rating: {
  //     fontSize: 32,
  //     fontWeight: "bold",
  // },
  // star: {
  //     width: 20,
  //     height: 20,
  //     marginLeft: 10,
  // },
  // reviewCount: {
  //     fontSize: 16,
  //     color: "#666",
  //     marginLeft: 10,
  // },
});
