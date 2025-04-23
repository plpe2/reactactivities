import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function UserProfile() {
    type user = {
        id: number,
        name: string,
        password: string,
        status: string
    }

    const [userValues, setUserValues] = useState<user[]>([])
    const {id} = useParams()

    useEffect(() => {
        axios.post(`/user-profile/${id}`)
        .then((res) =>{
            setUserValues(res.data)
        })
    }, [id])
  return (
    <div>
      {userValues.map((user) =>{
        return (
            <div key={user.id}>
                {user.name}
            </div>
        )
      })}
    </div>
  )
}

export default UserProfile
