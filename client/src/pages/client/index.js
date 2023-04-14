import { Main, Hero, BeatsShopSection, ProfileCard, Head } from "@/components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function BuyerProfile() {
  const currentUser = useSelector((state) => state.client.client);
  console.log("currentUser", currentUser);

  return (
    <>
      <Head title="Buyer Profile" />
      <Main mode="transparent">
        <Hero
          style={{ height: "45vh" }}
          image="/images/category3.jpg"
          className="items-center justify-center align-middle"
        >
          <div
            id="contenido"
            className="padding-x-estilo2 flex h-full w-full flex-col justify-end pb-8"
          >
            <div>
              <ProfileCard
                profilePhoto={currentUser.profilePicture}
                profileName={currentUser.name}
                profileMessage={currentUser.bio}
              />
            </div>
          </div>
        </Hero>
        <BeatsShopSection mode="profile" />
      </Main>
    </>
  );
}