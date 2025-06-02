import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import { useRouter } from 'expo-router'
import { icons } from '@/constants/icons'
import SearchBar from '@/components/SearchBar'

const Search = () => {
    const router = useRouter()
    const {
        data: movies,
        loading,
        error,
    } = useFetch(() =>
        fetchMovies({
            query: '',
        })
    )

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
                ListHeaderComponent={
                    <>
                        <View className="w-full flex-row justify-center mt-20">
                            <Image source={icons.logo} className="w-12 h-10" />
                        </View>
                        <View className="my-5 mt-5">
                            <SearchBar placeHolder="Search for Movies..." />
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
                                    <Text className="text-accent">
                                        SEARCH TERM
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
