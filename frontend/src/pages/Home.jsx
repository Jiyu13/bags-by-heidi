import HomeBanner from "../components/homepage/HomeBanner";
import BrandStory from "../components/homepage/BrandStory";
import CustomerFeed from "../components/homepage/CustomerFeed";
import {HomeCategories} from "../components/homepage/HomeCategories";

export default function Home() {
    return (
        <>
            <HomeBanner />
            <HomeCategories />
            <BrandStory/>
            <CustomerFeed />
        </>
    )
}