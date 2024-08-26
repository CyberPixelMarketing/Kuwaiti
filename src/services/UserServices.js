import { baseUrl } from "../constants/data";

export const homeBanner = async () => {
    try {
        const response = await fetch(`${baseUrl}/getBanners`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        const result = await response.json();
        return result;

    } catch (e) {
        console.log('oo', e)
    }
};


export const newArrivals = async () => {
    try {
        const response = await fetch(`${baseUrl}/getProductsByType/categories/New Arrivals`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        const result = await response.json();
        return result;

    } catch (e) {
        console.log('oo', e)
    }
};


export const getSameProduct = async (name) => {
    try {
        const response = await fetch(`${baseUrl}/getProductsByType/categories/${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        const result = await response.json();
        return result;

    } catch (e) {
        console.log('oo', e)
    }
};


export const productDetails = async (id) => {
    try {
        const response = await fetch(`${baseUrl}/getProductById/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        const result = await response.json();
        return result;

    } catch (e) {
        console.log('oo', e)
    }
};


export const addShippingAddress = async (fullName,street, city, area, phoneNumber, address,zipCode, countryCode, country,userID) => {
    try {
        const response = await fetch(`${baseUrl}/address/store`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                "block_avenue": countryCode,
                "street": street,
                "house": "gjh",
                "area": area,
                "city": city,
                "country": country,
                "governorate": "mnnkn",
                "user_id":userID ,
                "full_name": fullName,
                "phone": phoneNumber,
                "address": address,
                "emirates": zipCode
            })
        });

        const result = await response.json();
        return result;

    } catch (e) {
        console.log('oo', e)
    }
};


export const userShippingAddress = async (id) => {
    try {
        const response = await fetch(`${baseUrl}/user/${id}/addresses`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        const result = await response.json();
        return result;

    } catch (e) {
        console.log('oo', e)
    }
};



export const orderConfirmed = async (productNo,address,totalPrice,data,userID,token_obj) => {
    console.log('cccccc',productNo,address,totalPrice,data,userID,token_obj)
const orderDetails = data?.map((item,index)=>({
    "id": item?.id,
    "image": item?.image,
    "name": item?.productName,
    "price": parseFloat(item?.price),
    "additional_price": 0,
    "size": item?.size,
    "color": 0,
    "quantity": item?.counter,
    "title": item?.subText,
    "v_id": 1
}))
    try {
        const response = await fetch(`${baseUrl}/order/store`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                "order_detail": {
                    "email": "demo@gmail.com",
                    "products":productNo,
                    "address": "DED",
                    "full_name": address?.full_name ,
                    "phone_number": address?.phone ,
                    "user_id": userID ,
                    "order_status": "confirmed",
                    "payment_status": "done",
                    "total_price": totalPrice ,
                    "subtotal_price": 30,
                    "discount": 0,
                    "delivery_price": 0,
                    "Avenue": "demo",
                    "theStreet": "demo",
                    "token": token_obj ,
                    "theHome": "demo",
                    "cityTown": "demo",
                    "region": "demo",
                    "countryName": "demo"
                },

                "product_details": orderDetails
            })
        });

        const result = await response.json();
        console.error(result);
        return result;

    } catch (e) {
        console.log('oo', e)
    }
};

export const getOrder = async (id) => {
    try {
        const response = await fetch(`${baseUrl}/order/${id}/userid`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        const result = await response.json();
        return result;

    } catch (e) {
        console.log('oo', e)
    }
};

export const personalData = async (id) => {
    try {
        const response = await fetch(`${baseUrl}/getAppUsersById/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        const result = await response.json();
        return result;

    } catch (e) {
        console.log('oo', e)
    }
};


export const filterData = async () => {
    try {
        const response = await fetch(`${baseUrl}/getFilters`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        const result = await response.json();
        return result;

    } catch (e) {
        console.log('oo', e)
    }
};

export const tokenPrice = async (token,price) => {
    try {
        const response = await fetch(`https://kuwaity.skcosmetics.app/public/stripe-page.php?token=${token}&price=${price}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        const result = await response.json();
        return result;

    } catch (e) {
        console.log('oo', e)
    }
};


export const searchProductByName = async (productName) => {
    try {
        const response = await fetch(`${baseUrl}/getProductName/${productName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        const result = await response.json();
        return result;

    } catch (e) {
        console.log('oo', e)
    }
};

export const categoriesList = async (id) => {
    try {
        const response = await fetch(`${baseUrl}/getCategories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        const result = await response.json();
        return result;

    } catch (e) {
        console.log('oo', e)
    }
};



export const fetchAllProducts = async () => {
    try {
        const response = await fetch(`${baseUrl}/products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        const result = await response.json();
        return result;

    } catch (e) {
        console.log('oo', e)
    }
};



