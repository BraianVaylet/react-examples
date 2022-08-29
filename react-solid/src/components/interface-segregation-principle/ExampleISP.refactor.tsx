type Video = {
  title: string
  duration: number
  coverUrl: string
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

const ExampleISP = ({ items }: ItemsProps) => {
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
export default ExampleISP