import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import Supervisor from "../assets/icon.png";
import { Rating } from "react-native-ratings";
const RatingReview = () => {
  const [reviews, setReviews] = useState([
    {
      author: "Digvijay Patil",
      stars: 5,
      review:
        "Hello!! Overall, Instagram has been a very good social media platform for me. It's recommendations are relative and viewing experience is great. I'd just...",
      helpful: 123,
    },
    {
      author: "Digvijay Patil",
      stars: 3,
      review:
        "Hello!! Overall, Instagram has been a very good social media platform for me. It's recommendations are relative and viewing experience is great. I'd just...",
      helpful: 123,
    },
  ]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ratings and Reviews</Text>
      <Text style={styles.subtitle}>
        Ratings and reviews are verified and from people who are athletes who
        train at this complex.
      </Text>
      <View style={styles.reviewsContainer}>
        {reviews.map((review) => (
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
                source={Supervisor}
              />
              <Text style={styles.author}>{review.author}</Text>
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
                <Text style={styles.sport}>Sport: Cricket</Text>
                <Rating
                  type="star"
                  ratingCount={5}
                  imageSize={20}
                  showRating={false}
                  startingValue={review.stars}
                  minValue={1}
                  disabled
                  style={styles.starContainer}
                />
              </View>
            </View>
            <Text style={styles.reviewText}>{review.review}</Text>
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
