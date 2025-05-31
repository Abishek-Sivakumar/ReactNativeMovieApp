import { Text, View } from 'react-native'
import { Link } from 'expo-router'
import { images } from '@constants/images'

export default function Index() {
    return (
        <View className="flex-1 justify-center items-center">
            <Text className="justify-center text-5xl text-dark-200 font-bold">
                Welcomes
            </Text>
        </View>
    )
}
