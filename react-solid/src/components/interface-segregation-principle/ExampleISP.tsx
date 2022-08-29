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

const ExampleISP = ({ items }: ExampleISPProps) => {
    return (
        <ul>{items.map(item => <Thumbnail key={item.title} video={item} />)}</ul>
    )
}

const Thumbnail = ({ video }: ThumbnailProps) => {
    return <img src={video.coverUrl} />
}

export default ExampleISP