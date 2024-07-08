import { fetchMyProfile } from "@apis/userApi"
import Profile from "@components/Profile"
import Providers from "@providers"
import { redirect } from "next/navigation"

const MainPage = async () => {
  const userData = await fetchMyProfile()

  if (userData?.error) {
    // Redirect to login page
    redirect("/login")
  }

  return (
    <Providers>
      <Profile profile={userData} />
    </Providers>
  )
}

export default MainPage
