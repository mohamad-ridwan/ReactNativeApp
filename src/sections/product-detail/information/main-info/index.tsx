import { memo } from "react";
import { StyleSheet, View } from "react-native";
import PriceSection from "./price-section";
import ProductName from "./product-name";
import Rating from "./rating";
import Description from "./description";

type Props = {
    title: string
    brand?: string
    price?: number
    discountPercentage?: number
    discountPrice?: string
    rating?: number
    totalReviews?: number
    description: string
}

const MainInfo = memo(({
    title,
    brand,
    price,
    discountPercentage,
    discountPrice,
    rating,
    totalReviews,
    description
}: Props) => {
    return (
        <View style={styles.container}>
            <PriceSection
                price={price}
                discountPrice={discountPrice}
                brand={brand}
            />

            <ProductName title={title} />

            <Rating rating={rating} totalReviews={totalReviews} />

            <Description description={description} />
        </View>
    )
})

export default MainInfo

const styles = StyleSheet.create({
    container: {
        gap: 10
    },
})