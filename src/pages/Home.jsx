import HomeBanner from "../components/homepage/HomeBanner";
import Featured from "../components/homepage/Featured";
import BrandStory from "../components/homepage/BrandStory";
import CustomerFeed from "../components/homepage/CustomerFeed";
import {HomeCategories} from "../components/homepage/HomeCategories";

export default function Home() {
    return (
        <>
            <HomeBanner />
            <Featured />
            <BrandStory/>
            <CustomerFeed />
        </>
    )
}