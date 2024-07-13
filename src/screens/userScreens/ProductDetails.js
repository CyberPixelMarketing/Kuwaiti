import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import ExportSvg from '../../constants/ExportSvg'
import Carousel from 'react-native-snap-carousel';
import { discount, productSize } from '../../constants/data';
import { color } from '../../constants/color';
import ProductSlider from '../../components/ProductSlider';

const ProductDetails = ({navigation}) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selectedSize, setSelectedSize] = useState('M')
    const [productOrder, setProductOrder] = useState(1)
    const carouselRef = useRef(null);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ExportSvg.ClickMenuBar />
                </TouchableOpacity>
                <View style={styles.socialRightIconBox}>
                    <ExportSvg.Notification />
                    <ExportSvg.ShippingCart style={{ marginHorizontal: 15 }} />
                    <ExportSvg.Share />
                </View>
            </View>

            <ProductSlider
                currentIndex={currentIndex}
                carouselRef={carouselRef}
                setCurrentIndex={setCurrentIndex}
            />




            <View style={styles.productDetailContainer}>
                <View style={styles.productNamePriceBox}>
                    <View>
                        <Text style={styles.productName}>Herschel Supply Co.</Text>
                        <Text style={styles.productSubTxt}>DayPack BackPack</Text>
                        <View style={styles.starReviewBox}>
                            <ExportSvg.FiveStar />
                            <Text style={styles.peopleReview}>(270 Reviews)</Text>

                        </View>
                    </View>

                    <View>
                        <View style={styles.itemCounter}>
                            <TouchableOpacity onPress={() => setProductOrder(productOrder > 1 ? productOrder - 1 : 1)}>
                                <Text style={styles.decrementBtnTxt}>-</Text>
                            </TouchableOpacity>

                            <Text style={styles.counterNumberTxt}>{productOrder}</Text>

                            <TouchableOpacity onPress={() => setProductOrder(productOrder + 1)}>
                                <Text style={styles.incrementBtnTxt}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.availableTxt}>Available Stocks</Text>
                    </View>
                </View>


                <Text style={[styles.productName, { marginTop: 20 }]}>Size</Text>

                <View style={styles.sizeContainer}>
                    {productSize?.map((item, index) => {
                        return (
                            <TouchableOpacity onPress={() => setSelectedSize(item?.size)} style={[styles.sizeInnerBox, selectedSize == item?.size && { backgroundColor: color.theme, borderColor: color.theme }]} key={index}>
                                <Text style={{ color: selectedSize == item?.size ? "#fff" : "#000", fontWeight: "500" }}>{item?.size}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>



                <Text style={[styles.productName, { marginTop: 20 }]}>Description</Text>

 
                <Text style={styles.productDesc}>
                    A roomy backpack from the specialists in everyday bags at Herschel Supply Co., featuring resilient canvas and a light-blue patina that feels just right for summer.
                </Text>



                <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 15 }}>
                    <View style={styles.bottomPriceCartBox}>
                        <Text style={styles.productPrice}>KD 24.00</Text>

                        <View style={styles.bottomCartBox}>
                            <ExportSvg.ShippingCart style={{ marginRight: 10 }} />
                            <TouchableOpacity onPress={() => navigation.navigate('MyCart')}>
                                <Text style={styles.cartTxt}>Add to cart</Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                </View> 


            </View>
        </View>
    )
}

export default ProductDetails

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 15
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    socialRightIconBox: {
        flexDirection: "row",
        backgroundColor: "#fff",
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 50
    },
    productDetailContainer: {
        backgroundColor: "#fff",
        flex: 1,
        marginHorizontal: -15,
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginTop: 10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    productNamePriceBox: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    productName: {
        fontSize: 18,
        fontWeight: "600",
        color: color.theme,
    },
    productSubTxt: {
        fontSize: 12,
        color: color.gray,
        marginVertical: 10
    },
    starReviewBox: {
        flexDirection: "row"
    },
    peopleReview: {
        fontWeight: '300',
        color: color.theme,
        marginLeft: 10
    },
    itemCounter: {
        flexDirection: "row",
        backgroundColor: "#EEEEEE",
        alignSelf: "center",
        paddingVertical: 8,
        borderRadius: 50,
        marginBottom: 10
    },
    decrementBtnTxt: {
        paddingHorizontal: 15,
        color: color.theme,
    },
    counterNumberTxt: {
        color: color.theme,
        fontSize: 16,
        fontWeight: "300"
    },
    incrementBtnTxt: {
        paddingHorizontal: 15,
        color: color.theme,
    },
    availableTxt: {
        color: color.theme,
        fontWeight: "500"
    },
    sizeContainer: {
        flexDirection: "row",
        marginTop: 10
    },
    sizeInnerBox: {
        borderWidth: 1,
        borderRadius: 50,
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15,
        borderColor: color.lightGray
    },
    productDesc: {
        fontSize: 13,
        color: "#666666",
        marginTop: 10,
        fontFamily:"Montserrat-Regular"
    },
    bottomPriceCartBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: color.theme,
        paddingVertical: 8,
        borderRadius: 8,
        paddingHorizontal: 10,
        alignItems: "center",

    },

    bottomCartBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 5


    },
    productPrice: {
        color: "#fff",
        fontFamily:"Montserrat-Bold"

    },
    cartTxt: {
        color: color.theme,
        fontFamily:"Montserrat-SemiBold"

    }

})