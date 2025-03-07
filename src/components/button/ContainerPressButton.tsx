import { memo, ReactNode } from "react";
import { PressableT } from "../../types/components/buttons";
import { GestureResponderEvent, StyleSheet, TouchableOpacity } from "react-native";
import { PlatformPressable } from '@react-navigation/elements';

type Props = {
    pressableType: PressableT
    children: ReactNode
    backgroundColor?: string
    onPress?: (event: GestureResponderEvent)=>void
}

const ContainerPressButton = memo(({
    pressableType,
    children,
    backgroundColor,
    onPress
}: Props) => {
    if (pressableType === 'touchable') {
        return (
            <TouchableOpacity style={[
                styles.touch,
                { backgroundColor }
            ]} 
            activeOpacity={0.8}
            onPress={onPress}
            >{children}</TouchableOpacity>
        )
    } else if (pressableType === 'platform-pressable') {
        return (
            <PlatformPressable style={[
                styles.touch,
                { backgroundColor }
            ]} onPress={onPress}>
                {children}
            </PlatformPressable>
        )
    }
    return <>{children}</>
})

export default ContainerPressButton

const styles = StyleSheet.create({
    touch: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})