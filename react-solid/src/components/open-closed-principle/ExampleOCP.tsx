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

// Mocks
const useRouter = () => ({pathname: null})
const Logo = () => <div />
const Actions = (children: any) => <div>{children}</div>
const Link = (children: any) => <div>{children}</div>
const OtherDashboardStuff = () => <div />
const OtherHomeStuff = () => <div />