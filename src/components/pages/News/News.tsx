import React, { useEffect, useState } from 'react';
import '../../utils/roots/news_root.scss'
import '../../utils/logo/logo.scss'
import Logo from "../../utils/logo/Logo"
import { Link } from "react-router-dom";
import NewsCard from "../../utils/news-card/NewsCard";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import "./news.scss"
import { useQuery } from '@tanstack/react-query';
import { News } from '../../../domain/entities/news';
import { newsList } from '../../../shared/apis/news';
import { eventPlaceholder } from '../../../shared/placeholders/news';

export const NewsPage = () => {

    const { data: news, isError } = useQuery<News[]>({
        queryKey: ['new-list'],
        queryFn: newsList,
        placeholderData: () => [eventPlaceholder],
    }
    );
    if (isError) throw new Error();

    const responsive = {
        0: { items: 1 },
        800: { items: 2 },
        1000: { items: 3 },
        2550: { items: 4 }
    };

    const Carousel = ({ items }: { items: News[] }) => (
        <AliceCarousel
            mouseTracking
            items={items.map((item, index) => (
                <div key={index}>
                    <NewsCard
                        title={item.title}
                        description={item.description}
                        new_url={item.new_url}
                        photo={item.photo}
                    />
                </div>
            ))}
            controlsStrategy="alternate"
            responsive={responsive}
            infinite={true}
            disableDotsControls={true}


        />
    );

    return (
        <section className={"news-page page"}>
            <Logo title="новости" />
            <div className="news-carousel">
                <Carousel items={news ?? []} />
            </div>
            <button className={"container-fluid container-fluid-margless button-news mx-auto"}>
                <Link className="link" to="/news">
                    <p className={"more-text-main text-light text-uppercase  m-0 fs-5"}>подробнее</p>
                </Link>
            </button>

        </section>
    )
}
