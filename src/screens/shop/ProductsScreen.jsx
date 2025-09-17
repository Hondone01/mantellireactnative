import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import { useEffect, useState } from 'react'
import KarlaRegularText from '../../components/KarlaRegularFont'
import Search from '../../components/Search'
import { useSelector, useDispatch } from 'react-redux'
import { setProductSelected } from '../../store/slices/shopSlice'
import { useGetProductsByCategoryQuery } from '../../services/shopApi'
import { colors } from '../../global/colors'

const ProductsScreen = ({ navigation }) => {
  const [productsFiltered, setProductsFiltered] = useState([])
  const [keyword, setKeyword] = useState("")

  const category = useSelector(state => state.shopReducer.categorySelected)

  const { data: productsFilteredByCategory, isLoading, error } = useGetProductsByCategoryQuery(category.toLowerCase())

  const dispatch = useDispatch()

  const handleSelectProduct = (product) => {
    dispatch(setProductSelected(product))
    navigation.navigate("Producto")
  }

  const renderProductsItem = ({ item }) => (
    <Pressable 
      onPress={() => handleSelectProduct(item)} 
      style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }, styles.productItem]}
    >
      <KarlaRegularText style={styles.productTitle}>{item.title}</KarlaRegularText>
      <Text style={styles.productPrice}>${item.price}</Text>
    </Pressable>
  )

  useEffect(() => {
    if (keyword) {
      const productsFilteredByKeyword = productsFilteredByCategory?.filter(product =>
        product.title.toLowerCase().includes(keyword.toLowerCase())
      )
      setProductsFiltered(productsFilteredByKeyword)
    } else {
      setProductsFiltered(productsFilteredByCategory)
    }
  }, [category, keyword, productsFilteredByCategory])

  return (
    <View style={styles.container}>
      <Search setKeyword={setKeyword} />
      <FlatList
        data={productsFiltered}
        keyExtractor={item => item.id}
        renderItem={renderProductsItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  )
}

export default ProductsScreen

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
  productItem: {
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.grisOscuro
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 6,
    color: colors.purple
  }
})