import { ActivityIndicator, Dimensions, Image, Platform, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ExportSvg from '../../constants/ExportSvg'
import Carousel from 'react-native-snap-carousel';
import { discount, productSize } from '../../constants/data';
import { color } from '../../constants/color';
import ProductSlider from '../../components/ProductSlider';
import { productDetails } from '../../services/UserServices';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from '../../redux/reducer/ProductAddToCart';

const ProductDetails = ({ navigation, route }) => {
    const dispatch = useDispatch()

    const [isLoader, setIsLoader] = useState(false)

    const { id } = route.params

    const [currentIndex, setCurrentIndex] = useState(0)
    const [selectedSize, setSelectedSize] = useState('M')
    const [productOrder, setProductOrder] = useState(1)
    const [productData, setProductData] = useState([])
    const [productObject, setProductObject] = useState('')
    const [selectedColorId, setSelectedColorId] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const carouselRef = useRef(null);

    useEffect(() => {
        getProductDetail()
    }, [])


    const getProductDetail = async () => {
        setIsLoader(true)
        try {
            const response = await productDetails(id)
            if (response?.status) {
                setProductData(response)
                setProductObject(response?.data[0])
                setIsLoader(false)
            }
        } catch (error) {
            setIsLoader(false)
            console.log(error)
        }
    }

    const size = productData ? productData?.size_variants : ""
    const colorVariants = productData ? productData?.color_variants : ""



    if (isLoader) {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator size={'large'} />
            </View>
        )
    }




    const addToCart = () => {
        dispatch(addProductToCart({
            id: id,
            productName: productObject?.name,
            price: productObject?.price,
            size: selectedSize,
            counter: productOrder,
            subText: productObject?.description,
            image: imgUrl == '' ? productData?.product_images[0]?.image_url : imgUrl

        }))
        if (id && selectedSize) {
            navigation.navigate('MyCart')
        }
    }




    const sharePress = async () => {
        try {
            const result = await Share.share({
                message: 'Check out this awesome content!',
            });

            if (result.action === Share.sharedAction) {
                console.log('Content shared successfully!');
            } else if (result.action === Share.dismissedAction) {
                console.log('Share dismissed');
            }
        } catch (error) {
            console.error('Error sharing content:', error.message);
        }
    };


    return (
        <View style={styles.mainContainer}>

            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 15 }}>

                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ExportSvg.ClickMenuBar />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={sharePress} style={styles.socialRightIconBox}>
                        {/* <ExportSvg.Notification />
                    <ExportSvg.ShippingCart style={{ marginHorizontal: 15 }} /> */}
                        <ExportSvg.Share />
                    </TouchableOpacity>
                </View>

                <ProductSlider
                    currentIndex={currentIndex}
                    carouselRef={carouselRef}
                    setCurrentIndex={setCurrentIndex}
                    data={productData?.product_images}
                    setImgUrl={setImgUrl}
                    item={productObject}
                />

                <View style={styles.productDetailContainer}>
                    <View style={styles.productNamePriceBox}>
                        <View>
                            <Text style={styles.productName}>{productObject?.name}</Text>
                            <Text style={styles.productSubTxt}>{productObject?.description}</Text>
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


                    {
                        size?.length > 0 && <Text style={[styles.productName]}>Size</Text>
                    }
                    <View style={styles.SizeColorContainer}>

                        <View style={styles.sizeContainer}>
                            {size?.map((item, index) => {
                                return (
                                    <TouchableOpacity onPress={() => setSelectedSize(item?.sid)} style={[styles.sizeInnerBox, selectedSize == item?.sid && { backgroundColor: color.theme, borderColor: color.theme }]} key={index}>
                                        <Text style={{ color: selectedSize == item?.sid ? "#fff" : "#000", fontWeight: "500" }}>{item?.lable}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>

                        {
                            colorVariants?.length > 0 &&

                            <View style={[styles.sizeContainer, styles.colorBox]}>
                                {colorVariants?.map((item, index) => {
                                    return (
                                        <TouchableOpacity key={index} onPress={() => setSelectedColorId(item?.id)} activeOpacity={0.6} style={[styles.innerColorStyle, { backgroundColor: item?.value, marginRight: index == colorVariants?.length - 1 ? 0 : 10 }]}>
                                            {
                                                selectedColorId == item?.id &&
                                                <ExportSvg.whiteTick />
                                            }
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        }
                    </View>



                    <Text style={[styles.productName, { marginTop: 20, marginBottom: 5 }]}>Description</Text>


                    <Text style={styles.productDesc}>
                        A roomy backpack from the specialists in everyday bags at Herschel Supply Co., featuring resilient canvas and a light-blue patina that feels just right for summer.
                    </Text>


                </View>

            </ScrollView>

            <View style={{ position: "absolute", width: "90%", alignSelf: "center", bottom: 90 }}>
                <View style={styles.bottomPriceCartBox}>
                    <Text style={styles.productPrice}>KD{productObject?.price}</Text>

                    <View style={styles.bottomCartBox}>
                        <ExportSvg.ShippingCart style={{ marginRight: 10 }} />
                        <TouchableOpacity onPress={addToCart}>
                            <Text style={styles.cartTxt}>Add to cart</Text>
                        </TouchableOpacity>
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
        paddingTop: Platform.OS == 'ios' ? 40 : 20,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    socialRightIconBox: {
        flexDirection: "row",
        backgroundColor: "#fff",
        // paddingVertical: 8,
        // paddingHorizontal: 15,
        borderRadius: 50,
        padding: 10
    },
    productDetailContainer: {
        backgroundColor: "#fff",
        marginHorizontal: -15,
        paddingHorizontal: 20,
        paddingTop: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingBottom: 200
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
        marginVertical: 5,
        fontFamily: "Montserrat-Regular"

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
        fontWeight: "500",
        marginBottom: 20
    },
    SizeColorContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    sizeContainer: {
        flexDirection: "row",
        marginTop: 10,
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
    colorBox: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: "#fff",
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
        borderRadius: 50,
        paddingVertical: 5
    },
    innerColorStyle: {
        width: 20,
        height: 20,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    productDesc: {
        fontSize: 13,
        color: "#666666",
        marginTop: 10,
        fontFamily: "Montserrat-Regular"
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
        borderRadius: 5,



    },
    productPrice: {
        color: "#fff",
        fontFamily: "Montserrat-Bold"

    },
    cartTxt: {
        color: color.theme,
        fontFamily: "Montserrat-SemiBold"

    }

})