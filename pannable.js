/* React */
import React, { Component } from 'react';
import {StyleSheet, View, Text, LayoutAnimation, Animated, PanResponder} from 'react-native';

//+------------------------------------------------------------------+
//| Module Name: PannableMenu                                        |
//| Module Purpose: make your animations cool                        |
//| Function: manage set the leftcomp and set the func to get back   |
//+------------------------------------------------------------------+

/********************************************************************/
/*                          global values                           */
/********************************************************************/
var Dimensions = require('Dimensions');
const {width, height} = Dimensions.get('window');

/********************************************************************/
/*                          PannableView                            */
/* props: isOpend                   -> true/false if it's opened    */
/*        onCloseThisByGesture      -> function when being closed   */
/*        leftComponent             -> component after u gestured   */
/*        lockGesture               -> true/false if u wanna lock   */
/********************************************************************/
export default class PannableView extends Component {
    constructor(props) {
        super(props)

        this.positionX = 0
        this.defaultMenuWidth = width * 2
        this.state = {
            menuLayout: {width: 0, height: height},
        }
    }

    componentWillMount() {
        this.PanResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                if(!this.props.lockGesture) {
                    if(this.positionX > gestureState.dx) {
                        this.setState({
                            menuLayout: {width: this.state.menuLayout.width - 2, height: height}
                        })
                    }
                    else if(this.positionX < gestureState.dx) {
                        this.setState({
                            menuLayout: {width: this.state.menuLayout.width + 2, height: height}
                        })
                    }
    
                    this.positionX = gestureState.dx
                }
            },
            onPanResponderRelease: (evt, gestureState) => {
                if(!this.props.lockGesture) {
                    if(-70 >= gestureState.dx) {
                        this.closeLibrary()
                    }
                    else {
                         this.openLibrary()
                    }
                }
            }
        })
    }
    
    /* 新しく値を受けたとき、メニューを開く */
    componentWillReceiveProps(props) {
        if(props.isOpened) {
            this.openLibrary()
        }
    }

    /***********メニューを開く*************/
    openLibrary() {
        this.setLayoutAnimation(false)
    
        this.setState({
            menuLayout: {width: this.defaultMenuWidth, height: height},
        })
    }
    
    /**********メニューを閉じる************/
    closeLibrary() {
        this.setLayoutAnimation(true)

        this.setState({
            menuLayout: {width: 0, height: height},
        })
        // 閉じるアニメーションをコールバック
        this.props.onCloseThisByGesture()
    }
    
    /**********アニメーション************/
    setLayoutAnimation(goingToClose) {
        LayoutAnimation.configureNext({
            duration: 700,
            create: {
                type: LayoutAnimation.Types.spring,
                property: LayoutAnimation.Properties.opacity,
                springDamping: 1.0
            },
            update: {
                type: LayoutAnimation.Types.spring,
                springDamping: 0.9
            }
        });
    }

    /**********レンダリングする************/
    renderMenu() {
        let menuWidth = this.state.menuLayout.width
        let menuHeight = this.state.menuLayout.height
        let menuStyle = StyleSheet.create({
            Opened: {
                flexDirection: 'row',
                width: menuWidth,
                height: menuHeight,
            },
            Closed: {
                width: 0,
                height: menuHeight,
            }
        })
        if(this.props.isOpened) {
            return (
                <Animated.View style={menuStyle.Opened}
                    {...this.PanResponder.panHandlers}>
                    <View style={{width: width, height: height}} />
                    {this.props.leftComponent}
                </Animated.View>
            )
        }
        else {
            return (
                <View style={menuStyle.Closed}>
                </View>
            )
        }
    }

    render() {
        return (
        <View style={{flexDirection: 'row'}}>
            {this.renderMenu()}
            {this.props.children}
        </View>
        )
    }
}

/********************************************************************/
/*                       example fucntion                           */
/* variables: isOpened -> whether the lib is opned or closed        */
/*            width    -> the width of the device when being opened */
/*            height   -> the height of the device                  */
/********************************************************************/
function renderLibraryMenu(isOpened, width, height, PanResponder) {
    let menuWidth = width
    let menuHeight = height
    let menuStyle = StyleSheet.create({
        Opened: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: menuWidth,
            height: menuHeight,
        },
        Closed: {
            width: 0,
            height: menuHeight,
        }
    })
    if(isOpened) {
        return (
            <Animated.View
                {...PanResponder.panHandlers}>
                <View style={menuStyle.Opened}>
                    <Text>{"     "}</Text>
                </View>
            </Animated.View>
        )
    }
    else {
        return (
            <View style={menuStyle.Closed}>
            </View>
        )
    }
}