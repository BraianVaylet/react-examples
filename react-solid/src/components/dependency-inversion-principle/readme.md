# Principio de inversión de dependencia (DIP)

El principio de inversión de dependencia establece que “uno debe depender de abstracciones, no de concreciones”. En otras palabras, un componente no debería depender directamente de otro componente, sino que ambos deberían depender de alguna abstracción común. Aquí, "componente" se refiere a cualquier parte de nuestra aplicación, ya sea un componente de React, una función de utilidad, un módulo o una biblioteca de terceros. Este principio puede ser difícil de comprender en abstracto, así que pasemos directamente a un ejemplo.

A continuación, tenemos un componente **LoginForm** que envía las credenciales de usuario a alguna API cuando se envía el formulario:

```tsx
import api from '~/common/api'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (evt) => {
    evt.preventDefault()
    await api.login(email, password)
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Log in</button>
    </form>
  )
}
```

En este fragmento de código, nuestro componente **LoginForm** hace referencia directamente al módulo **api**, por lo que existe un estrecho acoplamiento entre ellos. Esto es malo porque dicha dependencia hace que sea más difícil realizar cambios en nuestro código, ya que un cambio en un componente afectará a otros componentes. El principio de inversión de dependencia aboga por romper dicho acoplamiento, así que veamos cómo podemos lograrlo.

Primero, vamos a eliminar la referencia directa al módulo **api** desde el interior del LoginForm, y en su lugar, permitiremos que la funcionalidad requerida se inyecte a través de accesorios:

```tsx
type Props = {
  onSubmit: (email: string, password: string) => Promise<void>
}
const LoginForm = ({ onSubmit }: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (evt) => {
    evt.preventDefault()
    await onSubmit(email, password)
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Log in</button>
    </form>
  )
}
```

Con este cambio, nuestro componente **LoginForm** ya no depende del módulo **api**. La lógica para enviar credenciales a la API se abstrae a través de la devolución de llamada **onSubmit** y ahora es responsabilidad del componente principal proporcionar la implementación concreta de esta lógica.

Para hacer eso, crearemos una versión conectada de la LoginForm que delegará la lógica de envío de formularios al módulo api:

```tsx
import api from '~/common/api'

const ConnectedLoginForm = () => {
  const handleSubmit = async (email, password) => {
    await api.login(email, password)
  }
  return (
    <LoginForm onSubmit={handleSubmit} />
  )
}
```

El componente **ConnectedLoginForm** sirve como un pegamento entre el **api** y **LoginForm**, mientras que ellos mismos permanecen totalmente independientes entre sí. Podemos iterarlos y probarlos de forma aislada sin preocuparnos por romper las piezas móviles dependientes, ya que no hay ninguna. Y mientras ambos se adhieran a la abstracción común acordada, la aplicación en su conjunto seguirá funcionando como se esperaba.

En el pasado, este enfoque de crear componentes de presentación "tontos" y luego inyectarles lógica también fue utilizado por muchas bibliotecas de terceros. El ejemplo más conocido de esto es Redux, que vincularía los accesorios de devolución de llamada en los componentes a las funciones dispatch que usan connect, un componente de orden superior (HOC). Con la introducción de los ganchos, este enfoque se volvió algo menos relevante, pero la inyección de lógica a través de HOC todavía tiene utilidad en las aplicaciones React.

Para concluir, el principio de inversión de dependencia tiene como objetivo minimizar el acoplamiento entre diferentes componentes de la aplicación. Como probablemente haya notado, la minimización es un tema recurrente en todos los principios de SOLID, desde minimizar el alcance de las responsabilidades de los componentes individuales hasta minimizar la conciencia de los componentes cruzados y las dependencias entre ellos.
