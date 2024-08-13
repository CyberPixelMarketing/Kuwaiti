import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Carousel from 'react-native-snap-carousel';
import { color } from '../constants/color';
import ExportSvg from '../constants/ExportSvg';
import { useDispatch, useSelector } from 'react-redux';
import { productFavorite, removeFavorite } from '../redux/reducer/AddFavorite';


const ProductSlider = ({ carouselRef, currentIndex, setCurrentIndex, data, setImgUrl,item }) => {
    const dispatch = useDispatch()
   
    const favoriteList = useSelector((state) => state?.favorite?.AddInFavorite)
    const isFavorite = favoriteList.some(favorite => favorite.pid === item.pid);
  
    const handleSnapToItem = (index) => {
        setCurrentIndex(index)
        setImgUrl(data[index]?.image_url);
    }

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
  

    const renderItem1 = ({ item, index }) => {
        return (
            <View style={styles.renderItem1_container}>
                <TouchableOpacity
                    style={[styles.iconCommon,styles.iconLeft]}
                    onPress={() => {
                        if (carouselRef.current) {
                            const previousIndex = index > 0 ? index - 1 : data.length - 1;
                            carouselRef.current.snapToItem(previousIndex);
                        }
                    }}
                >
                    <ExportSvg.Arrow2 />
                </TouchableOpacity>
            <View style={styles.renderItem1_img}>
                <Image resizeMode='cover' source={{ uri: item?.image_url }} style={styles.renderItem1_img} />
            </View>
                <TouchableOpacity
                    style={[styles.iconCommon,styles.iconRight]}
                    onPress={() => {
                        if (carouselRef.current) {
                            const nextIndex = index < data.length - 1 ? index + 1 : 0;
                            carouselRef.current.snapToItem(nextIndex);
                        }
                    }}
                >
                    <ExportSvg.Arrow1 />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View>
            <View style={styles.carouselContainer}>
                <Carousel
                    ref={carouselRef}
                    layout={"default"}
                    data={data}
                    renderItem={renderItem1}
                    sliderWidth={Dimensions.get('screen').width}
                    itemWidth={Dimensions.get('screen').width}
                    onSnapToItem={handleSnapToItem}
                />
            </View>


            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: -50 }}>
                {
                    data?.map((item, index) => {
                        return (
                            <View key={index} style={{ marginRight: 10 }}>
                                <View style={{ width: currentIndex == index ? 20 : 7, height: 7, backgroundColor: currentIndex == index ? '#ffff' : '#CCCCCC', borderRadius: 50 }} />
                            </View >

                        )
                    })
                }

            </View>


            {/* <View style={{ right: 15, position: "absolute", bottom: 10 }}>
                <ExportSvg.LoveFav />
            </View> */}
            <TouchableOpacity onPress={() => favoriteProduct(item)} style={{ right: 15, position: "absolute", bottom: 10 }}>
                {
                    isFavorite ?
                        <ExportSvg.LoveColorFav />
                        :
                        <ExportSvg.LoveFav />
                }
            </TouchableOpacity>

        
        </View>
    )
}

export default ProductSlider

const styles = StyleSheet.create({


    renderItem1_container: {
        marginTop: -10
    },


    renderItem1_img: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').width,
    },

    carouselContainer: {
        alignItems: "center",
        // padding: 20,
        marginVertical:10
    },

    iconLeft: {
        left: -15,

    },
    iconRight: {
        right: -15,
    },
    iconCommon:{
        position: 'absolute',
        top: '42%',
        transform: [{ translateY: -12 }],
        padding: 20,
        paddingHorizontal:30,
        zIndex: 1,

    }
})