import { StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      position: 'relative'
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: '2%',
        backgroundColor: '#fff',
    },
    img: {
        height: 35,
        width: 37,
        marginLeft: 20,
    },
    icons: {
        marginRight: '2%',
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
        width: '20%',
        padding: 0,
    },
    cart: {
        position: 'relative',
    },
    value: {
        position: 'absolute',
        backgroundColor: '#39B54A',
        borderRadius: 15,
        height: 15,
        width: 15,
        alignItems: 'center',
        justifyContent: 'center',
        right: 0,
    },
    valueText: {
        fontSize: 10,
        color: '#fff',
    },
    carouselContainer:{
        width: '90%',
        height: '30%',
        marginHorizontal: '5%',
        marginTop: '7%',
        borderRadius: 25,
        position: 'relative',
        
    },
    carouselScroller: {
        borderRadius: 25,
        
    },
    bannerImg: {
        borderRadius: 25,
    },
    counter: {
        position: 'absolute',
        color: '#fff',
        bottom: 10,
        right: 15,
    },
    banner: {
        position: 'relative',
        height: '100%',
    },
    bannerText: {
        position: 'absolute',
        left: '5%',
        top: '7%'
    },
    heading: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '700',
    },
    para: {
        fontSize: 18,
        color: '#fff',
        marginTop: '6%',
        width: '50%',
    },
    catText: {
        marginVertical: '7%',
        fontSize: 20,
        fontWeight: '700',
    },
    catBtn: {
        marginRight: 3,
        paddingHorizontal: 15,
        paddingVertical: 2,
        borderRadius: 15,
    },
    catBtnSelected: {
        backgroundColor: '#000',
    },
    catBtnUnselected: {
        backgroundColor: '#fff',
    },
    catPara:{
        color: '#000',
        fontSize: 18,
        fontWeight: '500'
    },
    catParaSelected:{
        color: '#fff'
    },
    catParaUnselected:{
        color: '#000'
    },
    foodContainer: {
        marginTop: '2%',
        
    },
    gridView: {
        flex: 1,
      },
      itemContainer: {
        borderRadius: 16,
        padding: '3%',
        marginTop: '1%',
        backgroundColor: '#fff',
        elevation: 6,
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        alignItems: 'center',
        position:'relative',
      },
      itemName: {
        fontSize: 18,
        color: '#000',
        fontWeight: '600',
      },
      itemCode: {
        fontSize: 12,
        fontWeight: '400',
        color: '#000',
      },itemPrice: {
        fontSize: 16,
        fontWeight: '400'
      },
      foodDetails: {
        width: '100%',
        justifyContent:'flex-start',
        paddingLeft: '5%',
        marginTop: '5%'
      },
      heart: {
        position: 'absolute',
        right: 10,
        top: 10,
      },
      cover: {
        position: 'absolute',
        backgroundColor: '#fff',
        height: '110%',
        left: '-5.5%',
        borderBottomColor: 'gray',

      }, 
      shadow: {
        elevation: 6,
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        zIndex: -1,
      }, 
      noShadow: {
      },
      textField: {
        width: '90%',
        height: 50,
        borderColor: '#000',
        borderRadius: 25,
        borderWidth: 2,
        borderStyle: "solid",
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: 'center',
        marginBottom: 15,
      },
      textInput: {
        width: '80%',
        marginLeft: 6,
      },
      imgContainer: {
        width: '100%', 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    customeBtn: {
        backgroundColor: '#000',
        width: '90%',
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    customeBtnText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: "bold"
    },
    secBtn: {
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '2%',
    },
    secBtnBtnText: {
        color: '#000',
        fontSize: 18,
        fontWeight: "bold",
    },
    infoImgCont: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    infoContainer: {
        width: '90%', 
        marginHorizontal: '5%',
    },
    infoHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    quantity: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantityBtns: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityBtn: {
        width: 60,
        height: 35,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginHorizontal: 10,
    },
    quantityBtnTxt: {
        color: '#fff',
        fontSize: 20,
    },
    checkout: {
        position: 'absolute',
        bottom: 0,
    },
    card: {
        width: '90%',
        backgroundColor: '#fff',
        marginHorizontal: '5%',
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingTop: '10%',
        marginVertical: '2%',
        position: 'relative',
        elevation: 6,
    }, 
    icon: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    cardImg: {
        width: '40%',
    },
    btnPos: {
        position: 'absolute',
        width:'100%',
        bottom: 10,
        left: '3%',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    border: {
        borderBottomWidth: 2,
        borderBottomColor: 'gray',
        
    },
    popUp: {
        position: 'absolute',
        top: '5%',
        left: 0,
        backgroundColor: 'rgba(52, 52, 52, 0.3)',
        zIndex: 1,
        width: '100%',
        marginTop: 40,
    
    },
    popUpMenu: {
        height: 35,
        width: 100,
        backgroundColor: '#fff',
        opacity: 1,
        position: 'absolute',
        right: 5,
        top: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    }
  });