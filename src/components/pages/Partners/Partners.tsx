import "./partners.scss"
import React, { useEffect, useState } from "react";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Logo from "../../utils/logo/Logo"
import { Link } from "react-router-dom";
import { AppConfig } from "../../../core";
import { Partners } from "../../../domain/entities/partners";
import { useQuery } from "@tanstack/react-query";
import { partnersList } from "../../../shared/apis/partners";


export const PartnersPage = () => {

    const { data: partners, isError } = useQuery<Partners[]>({
        queryKey: ['partner-list'],
        queryFn: () => partnersList(),
        placeholderData: () => [
            {
                'id': 1,
                'title': 'Котик',
                'link': '',
                'photo': '',
            }
        ],
    }
    );
    if (isError) throw new Error();

    const responsive = {
        0: { items: 1 },
        750: { items: 2 },
        1050: { items: 3 },
        1550: { items: 4 }
    };

    const Carousel = ({ items }: { items: Partners[] }) => (
        <AliceCarousel
            mouseTracking
            items={items.map((item, index) => (
                <div key={index}>
                    <Link to={item.link}>
                        <div className={"partner-card"}>
                            <img src={item.photo} />
                        </div>
                    </Link>
                </div>
            ))}
            responsive={responsive}
            controlsStrategy="alternate"
            disableButtonsControls={true}
            infinite={true}
        />
    );


    return (
        <section className={"page page-section"}>
            <Logo title="наши партнёры" />
            <Carousel items={partners ?? []} />
        </section>
    )
}