import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuthStore } from '../../store/authStore'

const indexTab = () => {

  const {logout} =useAuthStore();
  return (
    <View>
      <Text>Home Tab</Text>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default indexTab