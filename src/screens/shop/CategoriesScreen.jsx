import { StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { setCategorySelected } from '../../store/slices/shopSlice'
import { useGetCategoriesQuery } from '../../services/shopApi'
import { colors } from '../../global/colors'

const CategoriesScreen = ({ navigation }) => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery()
  const dispatch = useDispatch()

  const handleSelectCategory = (category) => {
    dispatch(setCategorySelected(category))
    navigation.navigate("Productos")
  }

  const renderCategoryItem = ({ item }) => {
    return (
      <Pressable
        onPress={() => handleSelectCategory(item.title)}
        style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }, styles.categoryItem]}
      >
        <Text style={styles.categoryTitle}>{item.title}</Text>
        <Image
          source={{ uri: item.image }}
          style={styles.categoryImage}
          resizeMode="contain"
        />
      </Pressable>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  )
}

export default CategoriesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  listContainer: {
    paddingBottom: 20
  },
  categoryItem: {
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center'
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.grisOscuro,
    marginBottom: 10
  },
  categoryImage: {
    width: '100%',
    height: 120 // duplicado respecto al original (~60)
  }
})