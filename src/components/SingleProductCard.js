import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ExportSvg from '../constants/ExportSvg'
import { color } from '../constants/color'
import { useDispatch, useSelector } from 'react-redux'
import { productFavorite, removeFavorite } from '../redux/reducer/AddFavorite'

const SingleProductCard = ({ item, index, onPress }) => {
  const dispatch = useDispatch()
  const favoriteList = useSelector((state) => state?.favorite?.AddInFavorite)
  const isFavorite = favoriteList.some(favorite => favorite.pid === item.pid);

  const favoriteProduct = (item) => {
    if (isFavorite) {
      dispatch(removeFavorite({
        id: item?.pid
      }))
    } else {

      dispatch(productFavorite({
        price: item?.price,
        pid: item?.pid,
        productName: item?.name,
        description: item?.description,
        image: item?.image

      }))
    }
  }



  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={{ alignItems: "center", marginBottom: 15 }}>
      <ImageBackground source={{ uri: item.image }} style={{ width: 170, height: 170, marginRight: 5, }} borderRadius={20}>
        <TouchableOpacity onPress={() => favoriteProduct(item)} style={{ marginLeft: "auto", margin: 10 }}>
        {
          isFavorite?
          <ExportSvg.Favorite />
:
<ExportSvg.whiteFav />

        }
        </TouchableOpacity>
      </ImageBackground>
      <Text style={styles.arrivalTitle}>{item?.name}</Text>
      <Text style={styles.arrivalSubTitle}>{item?.description}</Text>
      <Text style={styles.arrivalPrice}>KD{item?.price}</Text>
    </TouchableOpacity>
  )
}

export default SingleProductCard

const styles = StyleSheet.create({
  arrivalTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: color.theme,
    marginTop: 5,
    fontFamily: "Montserrat-SemiBold"

  },
  arrivalSubTitle: {
    color: color.gray,
    // fontWeight: "300",
    marginVertical: 2,
    fontFamily: "Montserrat-Regular",
    fontSize: 12


  },
  arrivalPrice: {
    color: color.theme,
    // fontWeight: "500",
    fontFamily: "Montserrat-SemiBold"

  },
})