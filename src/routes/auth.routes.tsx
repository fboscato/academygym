import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {SignIn} from '@screens/SignIn'
import {SignUp} from '@screens/SignUp'
const {Navigator,Screen} = createNativeStackNavigator()

export function AuthRouter(){
  return (
    <Navigator>
      <Screen 
        name='singIn'
        component={SignIn}
      />
      <Screen 
        name='singUp'
        component={SignUp}
      />
    </Navigator>
  )
}