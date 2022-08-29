const Header = ({ children }: any) => (
  <header>
    <Logo />
    <Actions>
      {children}
    </Actions>
  </header>
)
const HomePage = () => (
  <>
    <Header>
      <Link to="/dashboard">Go to dashboard</Link>
    </Header>
    <OtherHomeStuff />
  </>
)
const DashboardPage = () => (
  <>
    <Header>
      <Link to="/events/new">Create event</Link>
    </Header>
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