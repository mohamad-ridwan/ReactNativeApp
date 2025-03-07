import { memo } from "react";
import { GestureResponderEvent, StyleSheet, Text, View } from "react-native";
import ButtonIcon from "../button/ButtonIcon";
import { THEME_COLOR } from "../../config/theme/theme-color";

type Props = {
    image?: string
    onPress?: (event: GestureResponderEvent) => void
    name?: string
    isActive?: boolean
}

const CategoryCard = memo(({
    image,
    onPress,
    name,
    isActive
}: Props) => {
    return (
        <View style={styles.category}>
            <ButtonIcon
                nameIcon=""
                btnHeight={60}
                btnWidth={60}
                btnRadius={60 / 2}
                renderImage="image"
                imgUrl={image}
                sizeIcon={40}
                imgRadius={40 / 2}
                btnBorderColor={isActive ? THEME_COLOR.PRIMARY_COLOR.green : THEME_COLOR.PRIMARY_COLOR.gray}
                btnBorderWidth={1}
                onPress={onPress}
            />
            <Text
                style={[
                    styles.name,
                    { color: isActive ? THEME_COLOR.PRIMARY_COLOR.green : THEME_COLOR.SECONDARY_COLOR.darkGray }
                ]}
                numberOfLines={1}
            >{name}</Text>
        </View>
    )
})

export default CategoryCard

const styles = StyleSheet.create({
    category: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    name: {
        maxWidth: 60,
        fontSize: 11
    }
})