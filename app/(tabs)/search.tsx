import { View, Image, FlatList, ActivityIndicator } from 'react-native'
import { Text } from 'react-native'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import { useRouter } from 'expo-router'
import { icons } from '@/constants/icons'
import SearchBar from '@/components/SearchBar'
import { useEffect, useState } from 'react'

const Search = () => {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState('')
    const {
        data: movies,
        loading,
        error,
        refetch: loadMovies,
        reset,
    } = useFetch(
        () =>
            fetchMovies({
                query: searchQuery,
            }),
        false
    )

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (searchQuery.trim()) {
                await loadMovies()
            } else {
                reset()
            }
        }, 500)
        return () => clearTimeout(timeoutId)
    }, [searchQuery])

    return (
        <View className="flex-1 bg-primary">
            <Image
                source={images.bg}
                className="absolute w-full z-0"
                resizeMode="cover"
            />
            <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                className="px-5"
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: 'center',
                    gap: 16,
                    marginVertical: 16,
                }}
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
                ListEmptyComponent={
                    !loading && !error ? (
                        <View className="mt-10 px-5">
                            <Text
                                style={{
                                    color: '#6B707D',
                                    textAlign: 'center',
                                }}
                            >
                                {searchQuery.trim()
                                    ? 'No Results found'
                                    : 'Search for movies'}
                            </Text>
                        </View>
                    ) : null
                }
                ListHeaderComponent={
                    <>
                        <View className="w-full flex-row justify-center mt-20">
                            <Image source={icons.logo} className="w-12 h-10" />
                        </View>
                        <View className="my-5 mt-5">
                            <SearchBar
                                placeHolder="Search for Movies..."
                                value={searchQuery}
                                onChangeText={(text) => {
                                    setSearchQuery(text)
                                }}
                            />
                        </View>
                        {loading && (
                            <ActivityIndicator
                                size="large"
                                color="#0000ff"
                                className="my-3"
                            />
                        )}
                        {error && (
                            <Text className="text-red-500 px-5 my-3">
                                Error : {error.message}
                            </Text>
                        )}
                        {!loading &&
                            !error &&
                            'Search Term'.trim() &&
                            movies?.length > 0 && (
                                <Text className="text-xl text-white font-bold">
                                    Search Results for {''}
                                    <Text style={{ color: '#A091E0' }}>
                                        {searchQuery}
                                    </Text>
                                </Text>
                            )}
                    </>
                }
            />
        </View>
    )
}

export default Search
