import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
//import products from '../../data/products.json'
import { useEffect, useState } from 'react'
import KarlaRegularText from '../../components/KarlaRegularFont'
import Search from '../../components/Search'
import { useSelector,useDispatch } from 'react-redux'
import { setProductSelected } from '../../store/slices/shopSlice'
import { useGetProductsByCategoryQuery } from '../../services/shopApi'

const ProductsScreen = ({ navigation, route }) => {
    const [productsFiltered, setProductsFiltered] = useState([])
    const [keyword, setKeyword] = useState("")

    //console.log("Keyword: ",keyword)

    //const { category } = route.params
    const category = useSelector(state=>state.shopReducer.categorySelected)

    const {data:productsFilteredByCategory, isLoading, error} = useGetProductsByCategoryQuery(category.toLowerCase())

    const dispatch = useDispatch()

    const handleSelectProduct = (product) => {
        dispatch(setProductSelected(product))
        navigation.navigate("Producto")
    }

    const renderProductsItem = ({ item }) => (
        <View>
            <Pressable onPress={() => handleSelectProduct(item)}>
                <KarlaRegularText style={{ fontSize: 16 }}>{item.title}</KarlaRegularText>
            </Pressable>
        </View>

    )

    useEffect(() => {
        //const productsFilteredByCategory = products.filter(product => product.category.toLowerCase() === category.toLowerCase())
        if (keyword) { //Re-filtramos la lista de productos según la búsqueda del usuario
            const productsFilteredByKeyword = productsFilteredByCategory.filter(product => product.title.toLowerCase().includes(keyword.toLocaleLowerCase()))
            setProductsFiltered(productsFilteredByKeyword)
        } else {
            setProductsFiltered(productsFilteredByCategory)
        }
    }, [category, keyword,productsFilteredByCategory])

    return (
        <View >
            <Search setKeyword={setKeyword} />
            <FlatList
                data={productsFiltered}
                keyExtractor={item => item.id}
                renderItem={renderProductsItem}
            />
        </View>
    )
}

export default ProductsScreen

const styles = StyleSheet.create({})