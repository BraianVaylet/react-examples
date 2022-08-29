# Principio de segregación de interfaz (ISP)

Según **ISP**, *"los clientes no deben depender de interfaces que no usan"*. Por el bien de las aplicaciones React, lo traduciremos en "los componentes no deberían depender de accesorios que no usan".

Estamos ampliando la definición del ISP aquí, pero no es una gran exageración: tanto los accesorios como las interfaces se pueden definir como contratos entre el objeto (componente) y el mundo exterior (el contexto en el que se usa), por lo que podemos dibujar paralelismos entre los dos. Al final, no se trata de ser estricto e inflexible con las definiciones, sino de aplicar principios genéricos para resolver un problema.

Para ilustrar mejor el problema al que se dirige el ISP, usaremos TypeScript para el siguiente ejemplo. Consideremos la aplicación que muestra una lista de videos:

```tsx
type Video = {
    title: string
    duration: number
    coverUrl: string
}
type ExampleISPProps = {
    items: Array<Video>
}
type ThumbnailProps = {
    video: Video
}

const VideoList = ({ items }: ExampleISPProps) => {
    return (
        <ul>{items.map(item => <Thumbnail key={item.title} video={item} />)}</ul>
    )
}

const Thumbnail = ({ video }: ThumbnailProps) => {
    return <img src={video.coverUrl} />
}
```

El componente **Thumbnail** es bastante pequeño y simple, pero tiene un problema: espera que se pase un objeto de video completo como accesorios, mientras usa de manera efectiva solo una de sus propiedades.

Para ver por qué eso es problemático, imagine que además de los videos, también decidimos mostrar miniaturas para transmisiones en vivo, con ambos tipos de recursos de medios mezclados en la misma lista.

Presentaremos un nuevo tipo que define un objeto de transmisión en vivo:

```tsx
type LiveStream = {
  name: string
  previewUrl: string
}
```

**VideoList** Y este es nuestro componente actualizado:

```tsx
type Video = {
    title: string
    duration: number
    coverUrl: string
}
type ExampleISPProps = {
    items: Array<Video>
}
type ThumbnailProps = {
    video: Video
}
type LiveStream = {
  name: string
  previewUrl: string
}
type ItemsProps = {
  items: Array<Video | LiveStream>
}
const VideoList = ({ items }) => {
  return (
    <ul>
      {items.map((item: ItemsProps) => {
        if ('coverUrl' in item) {
          // it's a video
          return <Thumbnail video={item} />
        } else {
          // it's a live stream, but what can we do with it?
        }
      })}
    </ul>
  )
}
const Thumbnail = ({ video }: ThumbnailProps) => {
    return <img src={video.coverUrl} />
}
```

Como puedes ver, aquí tenemos un problema. Podemos distinguir fácilmente entre objetos de video y transmisión en vivo, pero no podemos pasar este último al componente **Thumbnail** porque **Video** y **LiveStream** son incompatibles. Primero, tienen diferentes tipos, por lo que *TypeScript* se quejaría de inmediato. En segundo lugar, contienen la URL de la miniatura en diferentes propiedades: el objeto de video lo llama coverUrl, el objeto de transmisión en vivo lo llama previewUrl. Ese es el quid del problema de que los componentes dependan de más accesorios de los que realmente necesitan: se vuelven ***menos reutilizables***. Así que vamos a arreglarlo.

Refactorizamos nuestro componente **Thumbnail** para asegurarnos de que se base solo en los accesorios que requiere y con ese cambio, ahora podemos usarlo para renderizar miniaturas de videos y transmisiones en vivo:

```tsx
type Video = {
    title: string
    duration: number
    coverUrl: string
}
type ExampleISPProps = {
    items: Array<Video>
}
type ThumbnailProps = {
    coverUrl: string // Refactor
}
type LiveStream = {
  name: string
  previewUrl: string
}
type ItemsProps = {
  items: Array<Video | LiveStream>
}

const VideoList = ({ items }) => {
   return (
    <ul>
      {items.map(item => {
        if ('coverUrl' in item) {
          // it's a video
          return <Thumbnail coverUrl={item.coverUrl} />
        } else {
          // it's a live stream
          return <Thumbnail coverUrl={item.previewUrl} />
        }
      })}
    </ul>
  )
}
// Refactor
const Thumbnail = ({ coverUrl }: ThumbnailProps) => {
    return <img src={coverUrl} /> 
}
```

***El principio de segregación de interfaces aboga por minimizar las dependencias entre los componentes del sistema, haciéndolos menos acoplados y por lo tanto más reutilizables.***
