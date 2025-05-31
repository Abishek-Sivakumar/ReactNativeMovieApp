import { View, Text } from 'react-native'
import { Tabs } from 'expo-router'
const _Layout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    title: 'Saved',
                    headerShown: false,
                }}
            />
        </Tabs>
    )
}

export default _Layout
