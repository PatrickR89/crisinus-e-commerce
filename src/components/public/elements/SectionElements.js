import styled from "styled-components";

export const SectionLinkContainer = styled.div`
  .section-link {
    text-align: start;
    color: var(--clr-primary-2);
    position: relative;
  }

  .section-link::after {
    content: "";
    position: absolute;
    height: 2px;
    width: 120%;
    left: 0;
    bottom: -0.1rem;
    background: var(--clr-primary-2);
    transform-origin: left;
    transition: transform 250ms ease;
  }
  .section-link::before {
    content: "";
    position: absolute;
    height: 2px;
    width: 120%;
    left: 0;
    bottom: 1rem;
    background: var(--clr-primary-2);
    transform-origin: right;
    transition: transform 250ms ease;
  }

  &:hover .section-link::after,
  &:focus-within .section-link::after {
    transform: scaleX(1);
  }
  &:hover .section-link::before,
  &:focus-within .section-link::before {
    transform: scaleX(1);
  }
`;

export const SectionTitle = styled.h3`
  color: var(--clr-title-3);
  text-align: start;
`;
