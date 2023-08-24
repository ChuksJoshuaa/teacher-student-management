"use client";
import { Header, HomeView, SideLayout } from "@/components";

const Home = () => {
  return (
    <SideLayout>
      <Header type="student" />
      <HomeView />
    </SideLayout>
  );
};
export default Home;
