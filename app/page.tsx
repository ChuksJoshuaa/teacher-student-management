"use client";
import { Header, HomeView, SideLayout } from "@/components";

const Home = () => {
  return (
    <SideLayout>
      <Header type="teacher" />
      <HomeView />
    </SideLayout>
  );
};
export default Home;
