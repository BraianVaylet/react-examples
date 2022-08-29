# Principio abierto-cerrado (OCP)

OCP establece que *"las entidades de software deben estar abiertas para la extensión, pero cerradas para la modificación"*. Dado que nuestros componentes y funciones de React son entidades de software, no necesitamos modificar la definición en absoluto y, en su lugar, podemos tomarla en su forma original.

El principio abierto-cerrado aboga por estructurar nuestros componentes de una manera que les permita ser ampliados sin cambiar su código fuente original. Para verlo en acción, consideremos el siguiente escenario: estamos trabajando en una aplicación que usa un **Header** componente compartido en diferentes páginas y, según la página en la que nos encontremos, **Header** debería mostrar una interfaz de usuario ligeramente diferente:

```jsx
const Header = () => {
  const { pathname } = useRouter()
  
  return (
    <header>
      <Logo />
      <Actions>
        {pathname === '/dashboard' && <Link to="/events/new">Create event</Link>}
        {pathname === '/' && <Link to="/dashboard">Go to dashboard</Link>}
      </Actions>
    </header>
  )
}
const HomePage = () => (
  <>
    <Header />
    <OtherHomeStuff />
  </>
)
const DashboardPage = () => (
  <>
    <Header />
    <OtherDashboardStuff />
  </>
)
```

Aquí mostramos enlaces a diferentes componentes de la página dependiendo de la página actual en la que nos encontremos. Es fácil darse cuenta de que esta implementación es mala si pensamos en lo que sucederá cuando comencemos a agregar más páginas. Cada vez que se crea una nueva página, tendremos que volver a nuestro **Header** componente y ajustar su implementación para asegurarnos de que sepa qué enlace de acción mostrar. Tal enfoque hace que nuestro **Header** componente sea frágil y estrechamente acoplado al contexto en el que se usa, y va en contra del principio abierto-cerrado.

Para solucionar este problema, podemos usar la composición de componentes. Nuestro componente **Header** no necesita preocuparse por lo que representará en su interior y, en cambio, puede delegar esta responsabilidad a los componentes que lo usarán usando **children** prop:

```jsx
const Header = ({ children }) => (
  <header>
    <Logo />
    <Actions>
      {children} // Refactor
    </Actions>
  </header>
)
const HomePage = () => (
  <>
    <Header>
      <Link to="/dashboard">Go to dashboard</Link> // Refactor
    </Header>
    <OtherHomeStuff />
  </>
)
const DashboardPage = () => (
  <>
    <Header>
      <Link to="/events/new">Create event</Link> // Refactor
    </Header>
    <OtherDashboardStuff />
  </>
)
```

Con este enfoque, eliminamos por completo la lógica variable que teníamos dentro del **Header** y ahora podemos usar la composición para poner allí literalmente cualquier cosa que queramos sin modificar el componente en sí. Una buena manera de pensarlo es que proporcionamos un marcador de posición en el componente al que podemos conectarnos. Y tampoco estamos limitados a un marcador de posición por componente: si necesitamos tener múltiples puntos de extensión (o si el accesorio children ya se usa para un propósito diferente), podemos usar cualquier cantidad de accesorios en su lugar. Si necesitamos pasar algún contexto de los **Header** componentes que lo usan, podemos usar el [patrón de accesorios](https://reactjs.org/docs/render-props.html) de representación. Como puede ver, la **composición** puede ser muy poderosa.

Siguiendo el principio abierto-cerrado, podemos reducir el acoplamiento entre los componentes y hacerlos más extensibles y reutilizables.
