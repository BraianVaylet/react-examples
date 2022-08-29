# Principio de responsabilidad única (SRP)

La definición original establece que *"cada clase debe tener una sola responsabilidad"*, es decir, hacer exactamente una cosa. Este principio es el más fácil de interpretar, ya que simplemente podemos extrapolar la definición a “cada función/módulo/componente debe hacer exactamente una cosa”.

De los cinco principios, SRP es el más fácil de seguir, pero también es el más impactante, ya que mejora drásticamente la calidad de nuestro código. Para garantizar que nuestros componentes hagan una cosa, podemos:

- dividir componentes grandes que hacen demasiado en componentes más pequeños
- extraer código no relacionado con la funcionalidad del componente principal en funciones de utilidad separadas
- encapsular la funcionalidad conectada en ganchos personalizados

```jsx
const ActiveUsersList = () => {
  const [users, setUsers] = useState([])
  
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
      {users.filter(user => !user.isBanned && user.lastActivityAt >= weekAgo).map(user => 
        <li key={user.id}>
          <img src={user.avatarUrl} />
          <p>{user.fullName}</p>
          <small>{user.role}</small>
        </li>
      )}
    </ul>    
  )
}
```

Aunque este componente es relativamente corto ahora, ya está haciendo bastantes cosas: obtiene datos, los filtra, representa el componente en sí mismo, así como elementos de lista individuales. Veamos cómo podemos descomponerlo.

En primer lugar, siempre que tengamos enlaces conectados **useState**, **useEffects** una buena oportunidad para extraerlos en un enlace personalizado:

```jsx
// Uso Custom Hook
const useUsers = () => {
  const [users, setUsers] = useState([])
  
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

const ActiveUsersList = () => {
  const { users } = useUsers() // Refactor
  
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  return (
    <ul>
      {users.filter(user => !user.isBanned && user.lastActivityAt >= weekAgo).map(user => 
        <li key={user.id}>
          <img src={user.avatarUrl} />
          <p>{user.fullName}</p>
          <small>{user.role}</small>
        </li>
      )}
    </ul>    
  )
}
```

Ahora nuestro **useUsers** enlace se refiere a una sola cosa: obtener usuarios de la API. También hizo que nuestro componente principal fuera más legible, no solo porque se hizo más corto, sino también porque reemplazamos los ganchos estructurales que necesitabas para descifrar el propósito con un gancho de dominio cuyo propósito es inmediatamente obvio por su nombre.

A continuación, veamos el JSX que representa nuestro componente. Siempre que tengamos un mapeo de bucle sobre una matriz de objetos, debemos prestar atención a la complejidad de JSX que produce para elementos de matriz individuales. Si es una sola línea que no tiene ningún controlador de eventos adjunto, está bien mantenerlo en línea, pero para un marcado más complejo, podría ser una buena idea extraerlo en un componente separado:

```jsx
// ...code...

// Nuevo Componente
const UserItem = ({ user }) => {
  return (
    <li>
      <img src={user.avatarUrl} />
      <p>{user.fullName}</p>
      <small>{user.role}</small>
    </li>
  )
}

const ActiveUsersList = () => {
  const { users } = useUsers()
  
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  return (
    <ul>
      {users.filter(user => !user.isBanned && user.lastActivityAt >= weekAgo).map(user => 
        <UserItem key={user.id} user={user} /> // Refactor
      )}
    </ul>    
  )
}
```

Al igual que con un cambio anterior, hicimos que nuestro componente principal fuera más pequeño y más legible al extraer la lógica para representar los elementos del usuario en un componente separado.

Finalmente, tenemos la lógica para filtrar usuarios inactivos de la lista de todos los usuarios que obtenemos de una API. Esta lógica está relativamente aislada y podría reutilizarse en otras partes de la aplicación, por lo que podemos extraerla fácilmente en una función de utilidad:

```jsx
// ...code...

// Nuevo Componente
const getOnlyActive = (users) => {
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  
  return users.filter(user => !user.isBanned && user.lastActivityAt >= weekAgo)
}

const ActiveUsersList = () => {
  const { users } = useUsers()
  return (
    <ul>
      {getOnlyActive(users).map(user => 
        <UserItem key={user.id} user={user} /> // Refactor
      )}
    </ul>    
  )
}
```

En este punto, nuestro componente principal es lo suficientemente corto y sencillo como para dejar de desglosarlo y darlo por terminado. Sin embargo, si miramos un poco más de cerca, notaremos que todavía está haciendo más de lo que debería. Actualmente, nuestro componente está obteniendo datos y luego aplicándoles filtros, pero idealmente, solo queremos obtener los datos y representarlos, sin ninguna manipulación adicional. Entonces, como última mejora, podemos encapsular esta lógica en un nuevo gancho personalizado:

```jsx
//...code...

// Custom Hook
const useActiveUsers = () => {
  const { users } = useUsers()
  const activeUsers = useMemo(() => {
    return getOnlyActive(users)
  }, [users])
  return { activeUsers }
}

const ActiveUsersList = () => {
  const { activeUsers } = useActiveUsers() // Refactor
  return (
    <ul>
      {activeUsers.map(user => 
        <UserItem key={user.id} user={user} />
      )}
    </ul>    
  )
}
```

Aquí creamos **useActiveUsers** un gancho para encargarnos de la lógica de búsqueda y filtrado (también memorizamos datos filtrados para obtener buenas medidas), mientras que nuestro componente principal se deja hacer lo mínimo: representar los datos que obtiene del gancho.

Ahora, dependiendo de nuestra interpretación de *"una cosa"*, podemos argumentar que el componente primero obtiene los datos y luego los procesa, lo cual no es *"una cosa"*. Podríamos dividirlo aún más, llamando a un gancho en un componente y luego pasando el resultado a otro como accesorios, pero encontré muy pocos casos en los que esto sea realmente beneficioso en aplicaciones del mundo real, así que seamos indulgentes con la definición y aceptemos *"renderizar los datos que obtiene el componente"* como *"una cosa"*.

Para resumir, siguiendo el principio de responsabilidad única, efectivamente tomamos una gran pieza de código monolítica y la hacemos más modular. La modularidad es excelente porque hace que nuestro código sea más fácil de razonar, los módulos más pequeños son más fáciles de probar y modificar, es menos probable que introduzcamos la duplicación de código no intencional y, como resultado, nuestro código se vuelve más fácil de mantener.

Debe decirse que lo que hemos visto aquí es un ejemplo artificial, y en sus propios componentes puede encontrar que las dependencias entre las diferentes partes móviles están mucho más entrelazadas. En muchos casos, esto podría ser una indicación de elecciones de diseño deficientes: uso de malas abstracciones, creación de componentes universales que lo hacen todo, alcance incorrecto de los datos, etc., y por lo tanto se puede desenredar con una refactorización más amplia.