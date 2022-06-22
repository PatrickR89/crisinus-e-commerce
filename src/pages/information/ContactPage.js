import React, { useEffect } from "react";
import styled from "styled-components";
import { ContactForm } from "../../components/public/info";
import { PageHero } from "../../components/public/elements";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { useLanguageContext } from "../../contexts/language_context";
import { useItemsContext } from "../../contexts/items_context";

const ContactPage = () => {
    const { translation } = useLanguageContext();
    const { anchorLinks, fetchLinks } = useItemsContext();

    useEffect(() => {
        fetchLinks();
        // eslint-disable-next-line
    }, []);

    const filterLinks = (id) => {
        console.log(anchorLinks);
        const link = anchorLinks.filter((anchorLink) => anchorLink.id === id);
        return link[0].link;
    };

    const handleAlert = () => {
        alert(filterLinks("email"));
    };

    return (
        <main>
            <PageHero title={translation.contact} />
            <Wrapper>
                <div className="contact">
                    <ContactForm />
                </div>
                {anchorLinks.length > 0 && (
                    <div className="info">
                        <a href={filterLinks("facebook")} className="logo">
                            <FaFacebook />
                        </a>
                        <a href={filterLinks("instagram")} className="logo">
                            <FaInstagram />
                        </a>
                        <a href={filterLinks("youtube")} className="logo">
                            <FaYoutube />
                        </a>
                        <button onClick={handleAlert} className="logo">
                            <FiMail />
                        </button>
                    </div>
                )}
            </Wrapper>
        </main>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    .info {
        width: 30%;
        display: flex;
        flex-direction: column;
        align-items: start;
        background: var(--clr-primary-8);
        button {
            border: none;
        }
    }
    .contact {
        width: 100%;
    }
    .logo {
        margin: auto;
        font-size: 30px;
        svg {
            color: var(--clr-button-2);
            transition: 0.3s ease-in;
        }
        svg:hover {
            color: var(--clr-primary-2);
        }
    }

    @media (max-width: 750px) {
        flex-direction: column;
        .info {
            flex-direction: row;
            width: 100%;
            padding: 2rem 1rem;
        }
    }
`;

export default ContactPage;
