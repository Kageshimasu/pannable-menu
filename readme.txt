//+------------------------------------------------------------------+
//| Module Name: PannableMenu                                        |
//| Module Purpose: make your animations cool                        |
//| Function: implement a horizontal swiping behavior                |
//+------------------------------------------------------------------+

/********************************************************************/
/*                          PannableMenu                            */
/* props: isOpend                   -> true/false if it's opened    */
/*        onCloseThisByGesture      -> function when being closed   */
/*        leftComponent             -> component after u gestured   */
/*        lockGesture               -> true/false if u wanna lock   */
/********************************************************************/

テストであげました

/* Usage */
export the component called PannableMenu
that you can use to add a left component.

/* For example */
<View>
 <PannableView
  isOpened={true}
  onCloseThisByGesture={()=> this.func}
  leftComponent={this.component}
  lockGesture={false}
 >
 
 /* define components whatever you like */
 <Text>Hello world</Text>
 <Button title={press me} onPress={} />
 </PannableView>
</View>
