import { GestureResponderEvent, PixelRatio, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
    title?: string
    onChangeText?: ((text: string) => void)
    value?: string
    placeholder?: string
    icon?: string
    colorIcon?: string
    handleClickIcon?: (event: GestureResponderEvent) => void
    secureTextEntry?: boolean
    desc?: string
    descColor?: string
}

export default function Input({
    title,
    onChangeText,
    value,
    placeholder,
    icon,
    colorIcon,
    handleClickIcon,
    secureTextEntry,
    desc,
    descColor
}: Props) {
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.title}>
                    {title}
                </Text>
                <View style={styles.inputWrapper}>
                    <TextInput
                        placeholder={placeholder}
                        onChangeText={onChangeText}
                        value={value}
                        style={styles.input}
                        secureTextEntry={secureTextEntry}
                    />
                    {icon &&
                        <TouchableOpacity style={styles.icon} onPress={handleClickIcon} activeOpacity={0.8}>
                            <Icon
                                name={icon}
                                color={colorIcon}
                                size={18}
                            />
                        </TouchableOpacity>
                    }
                </View>
            </View>
            {desc &&
                <Text style={[
                    styles.desc,
                    { color: descColor }
                ]}>
                    {desc}
                </Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    desc: {
        fontSize: 12,
    },
    container: {
        gap: 7
    },
    title: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold'
    },
    inputWrapper: {
        paddingHorizontal: 10,
        borderRadius: 50,
        borderColor: '#bbb',
        width: '100%',
        borderWidth: 1,
        height: PixelRatio.roundToNearestPixel(45),
        position: 'relative',
    },
    input: {
        padding: 5,
        height: '100%'
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: 12
    }
})