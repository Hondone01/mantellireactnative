import { StyleSheet, Text, View, Image, FlatList,Pressable } from 'react-native'
//import categories from '../../data/categories.json'
import FlatCard from '../../components/FlatCard';
import { useSelector,useDispatch } from 'react-redux';
import { setCategorySelected } from '../../store/slices/shopSlice';
import { useGetCategoriesQuery } from '../../services/shopApi';

const CategoriesScreen = ({navigation}) => {

    //const categories = useSelector(state=>state.shopReducer.categories)
    const {data:categories, isLoading, error} = useGetCategoriesQuery()

    //console.log("Categories desde firebase",cateogires, isLoading,error )

    const dispatch = useDispatch()

    const handleSelectCategory = (category)=>{
        dispatch(setCategorySelected(category))
        navigation.navigate("Productos")
    }

    const renderCategoryItem = ({ item }) => {
        //console.log(item)
        return (
            <Pressable onPress={()=>handleSelectCategory(item.title)}>
                <FlatCard style={styles.cardCustom}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Image width={120} height={50} source={{ uri: item.image }} resizeMode='contain' />
                </FlatCard>
            </Pressable>
        )
    }
    return (
        <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
        />
    )
}

export default CategoriesScreen

const styles = StyleSheet.create({
    cardCustom: {
        //backgroundColor:"green"
    },title:{
        fontFamily:"Karla-Bold"
    }
})