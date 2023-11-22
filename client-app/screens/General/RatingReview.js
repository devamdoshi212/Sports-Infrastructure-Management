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
import Supervisor from "./../../assets/Supervisor.png";

const RatingReview = () => {
  const [reviews, setReviews] = useState([
    {
      author: "Digvijay Patil",
      stars: 5,
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
      <View style={styles.ratingRow}></View>
      <View style={styles.reviewsContainer}>
        {reviews.map((review) => (
          <View style={styles.review} key={review.author}>
            <Text style={styles.author}>{review.author}</Text>
            <View style={styles.ratingRow}>
              {Array(review.stars)
                .fill()
                .map((_, i) => (
                  <Image
                    // source={require("./star.png")}
                    style={styles.star}
                    key={i}
                  />
                ))}
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 32,
    fontWeight: "bold",
  },
  star: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  reviewCount: {
    fontSize: 16,
    color: "#666",
    marginLeft: 10,
  },
  reviewsContainer: {
    marginTop: 20,
  },
  review: {
    marginBottom: 20,
  },
  author: {
    fontSize: 18,
    fontWeight: "bold",
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
    color: "#666",
  },
  helpfulCount: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
