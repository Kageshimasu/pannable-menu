//+------------------------------------------------------------------+
//| Module Name: PannableMenu                                        |
//| Module Purpose: make your animations cool                        |
//| Function: manage set the leftcomp and set the func to get back   |
//+------------------------------------------------------------------+

/********************************************************************/
/*                          PannableMenu                            */
/* props: isOpend                   -> true/false if it's opened    */
/*        onCloseThisByGesture      -> function when being closed   */
/*        leftComponent             -> component after u gestured   */
/*        lockGesture               -> true/false if u wanna lock   */
/********************************************************************/

<View>
<PannableMenu
 isOpened={true}
 onCloseThisByGesture={()=> this.func}
 leftComponent={this.component}
 lockGesture={false}
/>

<Text>Hello world</Text>

</View>
