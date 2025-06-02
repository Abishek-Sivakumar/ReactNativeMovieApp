import { Image, Text, TextInput, View } from 'react-native'
import { icons } from '@/constants/icons'

interface Props {
    onPress?: () => void
    placeHolder: string
    value: string
    onChangeText: (text: string) => void
}

const SearchBar = ({ onPress, placeHolder, value, onChangeText }: Props) => {
    return (
        <View className="flex-row items-center px-5 py-4 bg-dark-200 rounded-full">
            <Image
                source={icons.search}
                className="size-5"
                resizeMode="contain"
                tintColor="#ab8bff"
            ></Image>
            <TextInput
                onPress={onPress}
                placeholder={placeHolder}
                placeholderTextColor="#a8b5db"
                value={value}
                onChangeText={onChangeText}
                className="ml-5 text-white"
            ></TextInput>
        </View>
    )
}

export default SearchBar
