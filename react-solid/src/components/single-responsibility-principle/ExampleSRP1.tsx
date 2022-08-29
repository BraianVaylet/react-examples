import { useEffect, useState } from "react"

type ActiveUserType = {
  isBanned: boolean;
  lastActivityAt: Date;
  id: string;
  avatarUrl: string;
  fullName: string;
  role: string;
}

const ActiveUsersListSRP = () => {
  const [users, setUsers] = useState<ActiveUserType[]>([])
  
  useEffect(() => {
    const loadUsers = async () => {  
      const response = await fetch('/some-api')
      const data = await response.json()
      setUsers(data)
    }
    loadUsers()
  }, [])
  
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  return (
    <ul>
      {users.filter((user: ActiveUserType) => !user.isBanned && user.lastActivityAt >= weekAgo).map((user: ActiveUserType) => 
        <li key={user.id}>
          <img src={user.avatarUrl} />
          <p>{user.fullName}</p>
          <small>{user.role}</small>
        </li>
      )}
    </ul>    
  )
}

export default ActiveUsersListSRP