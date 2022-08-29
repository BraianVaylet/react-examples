import { useEffect, useState } from "react"

type ActiveUserType = {
  isBanned: boolean;
  lastActivityAt: Date;
  id: string;
  avatarUrl: string;
  fullName: string;
  role: string;
}

// Uso Custom Hook
const useUsers = () => {
  const [users, setUsers] = useState<ActiveUserType[]>([])
  
  useEffect(() => {
    const loadUsers = async () => {  
      const response = await fetch('/some-api')
      const data = await response.json()
      setUsers(data)
    }
    loadUsers()
  }, [])
  
  return { users }
}

// Nuevos Componentes
const UserItem = ({ user }: { user: ActiveUserType }) => {
  return (
    <li>
      <img src={user.avatarUrl} />
      <p>{user.fullName}</p>
      <small>{user.role}</small>
    </li>
  )
}

const getOnlyActive = (users: ActiveUserType[]) => {
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  
  return users.filter((user: ActiveUserType) => !user.isBanned && user.lastActivityAt >= weekAgo)
}

const RefactorActiveUsersListSRP = () => {
  const { users } = useUsers() 
  
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  return (
    <ul>
      {getOnlyActive(users).map((user: ActiveUserType) =>
        <UserItem key={user.id} user={user} />
      )}
    </ul>    
  )
}

export default RefactorActiveUsersListSRP