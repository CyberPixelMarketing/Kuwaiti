import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel';
import { color } from '../constants/color';
import ExportSvg from '../constants/ExportSvg';


const ProductSlider = ({ carouselRef, currentIndex, setCurrentIndex }) => {
    const views1 = [
        {
            imgUrl: "https://picsum.photos/200/300?random=1",
            title: "Airport Cabs",
        },
        {
            imgUrl: "https://picsum.photos/200/300?random=3",
            title: "Gift Cards",
        },
        {
            imgUrl: "https://picsum.photos/200/300?random=5",
            title: "Hourly Stays",
        },
        {
            imgUrl: "https://picsum.photos/200/300?random=7",
            title: "Travel Insurance",
        },
        {
            imgUrl: "https://picsum.photos/200/300?random=9",
            title: "Forex",
        },
        {
            imgUrl: "https://picsum.photos/200/300?random=11",
            title: "HomeStays & Villas",
        },
    ];


    const renderItem1 = ({ item, index }) => {
        return (
            <View style={styles.renderItem1_container}>
                <TouchableOpacity
                    style={styles.iconLeft}
                    onPress={() => {
                        if (carouselRef.current) {
                            const previousIndex = index > 0 ? index - 1 : views1.length - 1;
                            carouselRef.current.snapToItem(previousIndex);
                        }
                    }}
                >
                    <ExportSvg.Arrow2 />
                </TouchableOpacity>
                <Image source={require('../assets/slider/sliderBag.png')} style={styles.renderItem1_img} />
                <TouchableOpacity
                    style={styles.iconRight}
                    onPress={() => {
                        if (carouselRef.current) {
                            const nextIndex = index < views1.length - 1 ? index + 1 : 0;
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
                    data={views1}
                    renderItem={renderItem1}
                    sliderWidth={400}
                    itemWidth={350}
                    onSnapToItem={(index) => setCurrentIndex(index)}
                />
            </View>


            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: -15 }}>
                {
                    views1?.map((item, index) => {
                        return (
                            <View key={index} style={{ marginRight: 10 }}>
                                <View style={{ width: currentIndex == index ? 20 : 7, height: 7, backgroundColor: currentIndex == index ? color.gray : '#CCCCCC', borderRadius: 50 }} />
                            </View >

                        )
                    })
                }

            </View>


            <View style={{right:15,position:"absolute",bottom:10}}>
                <ExportSvg.LoveFav />
            </View>
        </View>
    )
}

export default ProductSlider

const styles = StyleSheet.create({


    renderItem1_container: {
        marginTop: -10
    },


    renderItem1_img: {
        width: 350,
        height: 300,
    },



    carouselContainer: {
        alignItems: "center",
        padding: 20,
    },

    iconLeft: {
        position: 'absolute',
        left: -15,
        top: '42%',
        transform: [{ translateY: -12 }],
        zIndex: 1,
        padding: 20,

    },
    iconRight: {
        position: 'absolute',
        right: -15,
        top: '42%',
        transform: [{ translateY: -12 }],
        zIndex: 1,
        padding: 20,
    },
})